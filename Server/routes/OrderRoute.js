/**
 * Created by Titus on 12/27/2017.
 */
'use strict';
module.exports = function(app) {
    var ordersController = require('../controllers/OrdersController'),
        usersController = require('../controllers/UserController');

    app.route('/orders')
        .get(usersController.normal_role_required, ordersController.list_all_Orders)
        .post(usersController.admin_role_required, ordersController.create_a_Order);

    app.route('/order/:orderId')
        .get(usersController.normal_role_required, ordersController.read_a_Order)
        .put(usersController.admin_role_required, ordersController.update_a_Order)
        .delete(usersController.admin_role_required, ordersController.delete_a_Order);

    app.route('/orders/merge')
        .post(usersController.normal_role_required, ordersController.merge);

    app.route('/auth/register')
        .post(usersController.register);

    app.route('/auth/sign_in')
        .post(usersController.sign_in)
};
