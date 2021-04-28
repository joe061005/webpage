/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    Home: async function (req, res) {
        if (req.wantsJSON) {

            var rt = await Restaurant.find();

            return res.json(rt)

        } else {
            var kow = await Restaurant.find({
                where: { region: 'Kowloon' },
                sort: 'createdAt DESC'
            })

            var HKI = await Restaurant.find({
                where: { region: 'HK Island' },
                sort: 'createdAt DESC'
            })

            var NT = await Restaurant.find({
                where: { region: 'New Territories' },
                sort: 'createdAt DESC'
            })

            return res.view('restaurant/Homepage', { hk: HKI, kl: kow, nt: NT });
        }
    },

    Create: async function (req, res) {
        if (req.method == "GET") return res.view('restaurant/create');

        var rest = await Restaurant.create(req.body).fetch();

        return res.redirect("/");
    },

    Delete: async function (req, res) {
        var rt = await Restaurant.findOne(req.params.restid);

        if (req.method == "GET") return res.view('restaurant/delete', { rest: rt });

        //return res.json(req.body["action"]);

        if (req.body["action"] == "Delete") {
            var deletedRest = await Restaurant.destroyOne(req.params.restid);

            if (!deletedRest) return res.notFound();

            return res.redirect("/");

        } else if (req.body["action"] == "Update") {
            var updatedRest = await Restaurant.updateOne(req.params.restid).set(req.body);

            if (!updatedRest) return res.notFound();

            return res.redirect("/");
        }
    },

    Admin: async function (req, res) {
        var rt = await Restaurant.find();

        return res.view('restaurant/Admin', { restaurant: rt });
    },

    Detail: async function (req, res) {
        var record = await Restaurant.findOne(req.params.restid)

        if (!record) return res.notFound();

        if (req.wantsJSON) {
          
            return res.json(record);

        } else {
            
            return res.view('restaurant/detail', { rt: record });
        }

    },

    aginate: async function (req, res) {
        if (req.wantsJSON) {

            var limit = Math.max(req.query.limit, 2) || 2;
            var offset = Math.max(req.query.offset, 0) || 0;

            var whereClause = {};

            if (req.query.region) whereClause.region = req.query.region;

            var parsedMax = parseInt(req.query.Maxcoins);
            var parsedMin = parseInt(req.query.Mincoins);

            if (!isNaN(parsedMax) && !isNaN(parsedMin)) {
                whereClause.coins = { '>=': parsedMin, '<=': parsedMax };
            } else if (!isNaN(parsedMax)) {
                whereClause.coins = { '<=': parsedMax };
            } else if (!isNaN(parsedMin)) {
                whereClause.coins = { '>=': parsedMin };
            }

            if (req.query.validon) {
                var date = req.query.validon;
                whereClause.validtill = { '>=': date };
            }

            rt = await Restaurant.find({
                where: whereClause,
                limit: limit,
                skip: offset
            })

            return res.json(rt);

        } else {

            var count = await Restaurant.count();

            return res.view('restaurant/aginate', { numOfRecords: count });
        }

    },

    len: async function (req, res) {
        if (req.wantsJSON) {
            var whereClause = {};

            if (req.query.region) whereClause.region = req.query.region;

            var parsedMax = parseInt(req.query.Maxcoins);
            var parsedMin = parseInt(req.query.Mincoins);

            if (!isNaN(parsedMax) && !isNaN(parsedMin)) {
                whereClause.coins = { '>=': parsedMin, '<=': parsedMax };
            } else if (!isNaN(parsedMax)) {
                whereClause.coins = { '<=': parsedMax };
            } else if (!isNaN(parsedMin)) {
                whereClause.coins = { '>=': parsedMin };
            }

            if (req.query.validon) {
                var date = req.query.validon;
                whereClause.validtill = { '>=': date };
            }

            rt = await Restaurant.find({
                where: whereClause
            })

            return res.json(rt);
        }
    },

    redeem: async function (req, res) {

        if (req.wantsJSON) {

            var user = await User.findOne(req.session.iden).populate("clients");

            if (!user) return res.notFound();

            return res.json(user);

        } else {

            var ur = await User.findOne(req.session.iden);

            return res.view('restaurant/redeem', { user: ur });
        }
    },

    findRest: async function(req, res){
        if(req.wantsJSON){

            var Rest = await Restaurant.find({
                where: { mall: req.params.Mallname }
            })

            return res.json(Rest);
        }
    },

    findRestByCoins: async function(req, res){
        if(req.wantsJSON){
            var str = req.params.Range;
            var whereClause = {};

            if(str.includes("<=")){
               whereClause.coins = { '<=': '300' };
            }else if(str.includes("<")){
               whereClause.coins = { '>': '300', '<': '600' };
            }else if(str.includes(">=")){
               whereClause.coins = { '>=': '600' };
            }

            var rest = await Restaurant.find({
                where: whereClause
            })

            return res.json(rest);
        }
    }



    /*Search: async function (req, res) {
        var limit = Math.max(req.query.limit, 2) || 2;
        var offset = Math.max(req.query.offset, 0) || 0;

        if (req.method == "GET") {
            var haveEle = req.query.region || req.query.Maxcoins || req.query.Mincoins || req.query.validon;
            if (typeof (haveEle) == 'undefined') {
                var allrest = await Restaurant.find({
                    limit: limit,
                    skip: offset
                });

                var count = await Restaurant.count();

                return res.view('restaurant/search', { rest: allrest, numOfRecords: count, region: "", Max: "", Min: "", Date: "" })
            }

            var whereClause = {};

            if (req.query.region) whereClause.region = req.query.region;

            var parsedMax = parseInt(req.query.Maxcoins);
            var parsedMin = parseInt(req.query.Mincoins);

            if (!isNaN(parsedMax) && !isNaN(parsedMin)) {
                whereClause.coins = { '>=': parsedMin, '<=': parsedMax };
            } else if (!isNaN(parsedMax)) {
                whereClause.coins = { '<=': parsedMax };
            } else if (!isNaN(parsedMin)) {
                whereClause.coins = { '>=': parsedMin };
            }

            if (req.query.validon) {
                var date = req.query.validon;
                whereClause.validtill = { '>=': date };
            }

            var rt = await Restaurant.find({
                where: whereClause
            })

            var len = rt.length;

            rt = await Restaurant.find({
                where: whereClause,
                limit: limit,
                skip: offset
            })

            return res.view('restaurant/search', { rest: rt, numOfRecords: len, region: req.query.region, Max: req.query.Maxcoins, Min: req.query.Mincoins, Date: req.query.validon })


        } else {
            var whereClause = {};

            if (req.body["region"]) whereClause.region = req.body["region"];

            var parsedMax = parseInt(req.body["Maxcoins"]);
            var parsedMin = parseInt(req.body["Mincoins"]);

            if (!isNaN(parsedMax) && !isNaN(parsedMin)) {
                whereClause.coins = { '>=': parsedMin, '<=': parsedMax };
            } else if (!isNaN(parsedMax)) {
                whereClause.coins = { '<=': parsedMax };
            } else if (!isNaN(parsedMin)) {
                whereClause.coins = { '>=': parsedMin };
            }

            if (req.body["validon"]) {
                var date = req.body["validon"];
                whereClause.validtill = { '>=': date };
            }

            var thoseRest = await Restaurant.find({
                where: whereClause
            });

            var count = thoseRest.length;

            thoseRest = await Restaurant.find({
                where: whereClause,
                limit: limit,
                skip: offset
            })

            return res.view('restaurant/search', { rest: thoseRest, numOfRecords: count, region: req.body["region"], Max: req.body["Maxcoins"], Min: req.body["Mincoins"], Date: req.body["validon"] })
        }
    }*/


};

