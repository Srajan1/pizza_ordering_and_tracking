const Order = require('../../../models/order')
function orderController() {
    return {
        store(req, res){
            const {phone, address} = req.body;
            if(!phone || !address){
                req.flash('error', 'All fields are required');
                res.redirect('cart');
            
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            });
            order.save()
            .then((result) => {req.flash('success', 'Order placed successfully'); return res.redirect('/'); })
            .catch((err) => {req.flash('error', 'Something went wrong'); return res.redirect('/cart'); })
        }
    }
}

module.exports = orderController;