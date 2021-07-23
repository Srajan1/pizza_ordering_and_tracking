function cartController (){
    return {
        index(req, res){
            res.render("customer/cart");
        },
        update(req, res){
            // Format for storage
            // let cart = {
            //     items: {
            //         pizzaId: {item: pizzaObject, qty: 0}
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            // for first time, I'll create the cart here 
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
                let cart = req.session.cart;
                // console.log(req.body);
                // if this pizza is not already in cart
                if(!cart.items[req.body._id]){
                    cart.items[req.body._id] = {
                        item: req.body,
                        qty: 1
                    }
                    cart.totalQty += 1;
                    cart.totalPrice = parseInt(cart.totalPrice)+parseInt(req.body.price);
                }else{
                    cart.items[req.body._id].qty += 1; 
                    cart.totalQty += 1;
                    cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price);
                }
                return res.json({totalQty: req.session.cart.totalQty, totalPrice: req.session.cart.totalPrice});
        }
    }
}

module.exports = cartController;