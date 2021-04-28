/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': 'RestaurantController.Home',
  'POST /': 'RestaurantController.Home',

  'GET /create': 'RestaurantController.Create',
  'POST /create': 'RestaurantController.Create',

  'GET /delete/:restid': 'RestaurantController.Delete',
  'POST /delete/:restid': 'RestaurantController.Delete',

  'GET /Admin': 'RestaurantController.Admin',
  'POST /Admin': 'RestaurantController.Admin',

  'GET /detail/:restid': 'RestaurantController.Detail',
  'POST /detail/:restid': 'RestaurantController.Detail',

  'GET /search': 'RestaurantController.aginate',
  'POST /search': 'RestaurantController.aginate',

  'GET /login': 'UserController.login',  
  'POST /login': 'UserController.login',

  'POST /logout': 'UserController.logout',
  'GET /logout': 'UserController.logout',  // for testing only

  'GET /len': 'RestaurantController.len',
  'POST /len': 'RestaurantController.len',

  'GET /redeem': 'RestaurantController.redeem',
  'POST /redeem': 'RestaurantController.redeem',

  'POST /user/clients/add/:fk': 'UserController.add',

  'PUT /user/update/:fk': 'UserController.update',

  'GET /check/:fk' : 'UserController.check',

  'GET /list/:restid' : 'UserController.populate',
  'POST /list/:restid' : 'UserController.populate',

  'GET /mall/:Mallname' : 'RestaurantController.findRest',
  'POST /mall/:Mallname' : 'RestaurantController.findRest',

  'GET /Coins/:Range' : 'RestaurantController.findRestByCoins',
  'POST /Coins/:Range' : 'RestaurantController.findRestByCoins',






  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
