const order = require('../../../models/order');
function orderController(){
    return {
        index(req, res){
            // do not fetch the complted orders
            order.find({status: {$ne: 'completed'}}, null, {sort: {'createdAt': -1}}).populate('customerId').exec((err, orders) => {
                if(req.xhr){
                    
                    return res.json(orders);
                }
                res.render('admin/orders')
            }) 
        }
    }
}

module.exports = orderController;