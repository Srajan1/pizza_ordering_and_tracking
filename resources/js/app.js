const axios = require('axios');
const noty = require('noty'); 
const initAdmin = require('./admin')
let addToCart = document.querySelectorAll('.add-to-cart');
let cardCounter = document.querySelector('#card-counter')
function updateCart(pizza){
    axios.post('/update-cart', pizza).then((res) => {
        // console.log(res.data);
        cardCounter.innerText = res.data.totalQty;
        new noty({
            type: 'success',
            timeout: 1000,
            text: "Added to cart"
          }).show();
          
    }).catch((err) => {
        new noty({
            type: 'error',
            timeout: 1000,
            text: "Something went wrong"
          }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    })
})

initAdmin();