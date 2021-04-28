/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */


module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);


  if (await Restaurant.count() > 0) {
    return generateUsers();
  }

  await Restaurant.createEach([
    { title: "Simply receive a complimentary drink", name: "Greyhound Cafe", region: "HK Island", mall: "IFC Mall", image: "https://i.pinimg.com/originals/97/f4/65/97f46506136adc8e08dd26fae40b4a41.jpg", quota: 200, coins: 500, validtill: "2021-03-31", detail: "Offer is valid after 6pm for dine-in only" },
    { title: "50% discount on Supreme Seafood Feast(for 2 persons)", name: "Mango Tree", region: "Kowloon", mall: "Elements", image: "https://3o7tpx32lt6v2lcovs4a53lb-wpengine.netdna-ssl.com/wp-content/uploads/2013/01/Mango-Tree-HK.jpg", quota: 200, coins: 750, validtill: "2021-03-31", detail: "Offer is valid after 6pm for dine-in only" },
    { title: "15% Off on Whole Bill", name: "ANA Gura", region: "Kowloon", mall: "Festival Walk", image: "https://lubuds.com/wp-content/uploads/2016/01/DSC_0237-650x400.jpg", quota: 200, coins: 500, validtill: "2021-03-31", detail: "Offer is valid after 6pm for dine-in only" },
    { title: "50% Off Yoogane's Chicken Galbi", name: "Yoogane", region: "New Territories", mall: "New Town Plaza", image: "https://media-cdn.tripadvisor.com/media/photo-s/10/05/a1/d2/caption.jpg", quota: 200, coins: 500, validtill: "2021-03-31", detail: "Offer is valid after 6pm for dine-in only" },
    { title: "50% off on Whole Bill", name: "Gyu-Kaku", region: "Kowloon", mall: "Festival Walk", image: "https://www.miraplace.com.hk/wp-content/uploads/2020/07/PACL3380x1s.jpg", quota: 5, coins: 2000, validtill: "2021-01-31", detail: "The discount may be subject to change.  It can be only used on Monday." },
    { title: "50% discount on lunch set", name: "Fairwood", region: "Kowloon", mall: "APM", image: "https://www.linkhk.com/linkweb/api/file/_C/ShopPhoto/lhxxc2/lhxxc2_201(Fairwood).JPG?v=6a5ef0173ad3482e246082e0c968849c", quota: 100, coins: 800, validtill: "2020-11-07", detail: "Please present this coupon before paying" },
    { title: "30% off on Whole Bill", name: "TamJai SamGor", region: "New Territories", mall: "Tsuen Wan Plaza", image: "https://i0.wp.com/accidentaltravelwriter.com/wp-content/uploads/2018/08/hk-restaurant-tamjai-yunnan-noodles-1.jpg?resize=525%2C350&ssl=1", quota: 15, coins: 700, validtill: "2020-10-31", detail: "Please present this coupon before paying" },
    { title: "A complimentary set lunch", name: "Forbidden Duck", region: "HK Island", mall: "Times Square", image: "https://static.wixstatic.com/media/a32f10_91d7d9ec5b40473ba91730c8bf090a70~mv2_d_5472_3648_s_4_2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01/a32f10_91d7d9ec5b40473ba91730c8bf090a70~mv2_d_5472_3648_s_4_2.webp", quota: 15, coins: 1500, validtill: "2020-12-31", detail: "Offer is valid for dine-in only" },
    { title: "A complimentary set lunch", name: "KOKOMI", region: "HK Island", mall: "Pacific Place", image: "https://4.bp.blogspot.com/-mzcQpEwA8Ac/W2llaqB6wDI/AAAAAAAAGn0/Sic2uXnHT8w6RlFsY51xTJthVLOcIE8ugCLcBGAs/s1600/DSC01327.JPG", quota: 15, coins: 1000, validtill: "2020-12-31", detail: "Offer is valid for dine-in only" },
    { title: "15% Off on Whole Bill", name: "dimsumbar", region: "Kowloon", mall: "Harbour City", image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/48/7b/dc/caption.jpg", quota: 50, coins: 800, validtill: "2020-12-31", detail: "Offer is valid for dine-in only" },
    { title: "A complimentary set lunch", name: "RUBY TUESDAY", region: "Kowloon", mall: "MegaBox", image: "http://www.megabox.com.hk/uploaded_files/shop/152.jpg", quota: 500, coins: 600, validtill: "2020-12-31", detail: "Please present this coupon before paying" },

    // etc.
  ]);

  return generateUsers();

  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }

    var hash = await sails.bcrypt.hash('123456', salt);

    await User.createEach([
      { username: "admin", password: hash, role: 'admin' },
      { username: "member", password: hash, role: 'member' },
      { username: "member2", password: hash, role: 'member' },
      { username: "member3", password: hash, role: 'member' },

      // etc.
    ]);

    const TamJaiSamGor = await Restaurant.findOne({ name: "TamJai SamGor" });
    const ANAGura = await Restaurant.findOne({ name: "ANA Gura" });
    const GreyhoundCafe = await Restaurant.findOne({ name: "Greyhound Cafe" });
    const MangoTree = await Restaurant.findOne({ name: "Mango Tree" });
    const Yoogane = await Restaurant.findOne({  name: "Yoogane" });
    const Fairwood = await Restaurant.findOne({ name: "Fairwood" });

    const member = await User.findOne({ username: "member" });
    const member2 = await User.findOne({ username: "member2" });
    const member3 = await User.findOne({ username: "member3"})

    await User.addToCollection(member.id, 'clients').members(TamJaiSamGor.id);
    await User.addToCollection(member.id, 'clients').members(ANAGura.id);
    await User.addToCollection(member.id, 'clients').members(GreyhoundCafe.id);
    await User.addToCollection(member.id, 'clients').members(MangoTree.id);
    await User.addToCollection(member.id, 'clients').members(Fairwood .id);

    await User.addToCollection(member2.id, 'clients').members(TamJaiSamGor.id);
    await User.addToCollection(member2.id, 'clients').members(MangoTree.id);
    await User.addToCollection(member2.id, 'clients').members(ANAGura .id);
    await User.addToCollection(member2.id, 'clients').members(Yoogane .id);

    await User.addToCollection(member3.id, 'clients').members(TamJaiSamGor.id);
    await User.addToCollection(member3.id, 'clients').members(Yoogane.id);
    await User.addToCollection(member3.id, 'clients').members(Fairwood .id);


  }


};
