/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.wantsJSON) {

            //console.log("login");

            if (!req.body.username || !req.body.password) return res.badRequest();

            var user = await User.findOne({ username: req.body.username });

            if (!user) return res.status(401).json("User not found");

            var match = await sails.bcrypt.compare(req.body.password, user.password);

            if (!match) return res.status(401).json("Wrong Password");

            //Reuse existing session 
            if (!req.session.username) {
                req.session.username = user.username;
                req.session.iden = user.id;
                req.session.role = user.role;
                req.session.coins = user.coins;
                //console.log(req.session.iden);
                return res.json(user);
            }

            // Start a new session for the new login user
            req.session.regenerate(function (err) {

                if (err) return res.serverError(err);

                req.session.username = user.username;
                req.session.iden = user.id;
                req.session.role = user.role;
                req.session.coins = user.coins;
               // console.log(req.session.iden);
                return res.json(user);
            });
        } else {

            return res.view('user/login');
        }

    },

    logout: async function (req, res) {

       // console.log("logout")

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            if(req.wantsJSON){
                return res.ok();
            }

            return res.redirect("/login");
        });
    },

    populate: async function (req, res) {

        if (req.wantsJSON) {

            var rest = await Restaurant.findOne(req.params.restid).populate("consultants");

            if (!rest) return res.notFound();

            return res.json(rest);

        } else {

            //var rest = await Restaurant.findOne(req.params.id).populate("consultants");

            // return res.json(rest);

            var rest = await Restaurant.findOne(req.params.restid);

            return res.view('restaurant/list', { rt: rest });
        }
    },

    add: async function (req, res) {

        if (req.wantsJSON) {

            if (!await User.findOne(req.session.iden)) return res.status(404).json("User not found.");

            var thatRest = await Restaurant.findOne(req.params.fk).populate("consultants", { id: req.session.iden });

            if (!thatRest) return res.status(404).json("Restaurant not found.");

            if (thatRest.consultants.length > 0)
                return res.status(409).json("Already added.");   // conflict

            await User.addToCollection(req.session.iden, "clients").members(req.params.fk);

            return res.ok();
        }

    },

    update: async function (req, res) {
        if (req.wantsJSON) {

            var user = await User.findOne(req.session.iden);

            var rest = await Restaurant.findOne(req.params.fk);

            await User.updateOne(req.session.iden).set({
                coins: (user.coins - rest.coins)
            })

            req.session.coins = user.coins - rest.coins;

            await Restaurant.updateOne(req.params.fk).set({
                quota: (rest.quota - 1)
            })

            return res.ok();
        }

    },


    check: async function (req, res) {

        if (req.wantsJSON) {
            var thatRest = await Restaurant.findOne(req.params.fk).populate("consultants", { id: req.session.iden });

            if (thatRest.consultants.length > 0) {
                return res.status(409).json("Already added.");
            } else {
                return res.ok();
            }
        }
    }


};

