const order = require('../../../models/order');
function statusController(){
    return {
        update(req, res){
            order.updateOne({_id: req.body.orderId}, {status: req.body.status}, (err, response) => {
                
                res.redirect('/admin/orders')
            })
        }
    };
}

module.exports = statusController;