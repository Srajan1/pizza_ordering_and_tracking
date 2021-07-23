const axios = require('axios')
let addToCart = document.querySelectorAll('.add-to-cart');
let cardCounter = document.querySelector('#card-counter')
function updateCart(pizza){
    axios.post('/update-cart', pizza).then((res) => {
        console.log(res.data);
        cardCounter.innerText = res.data.totalQty;
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    })
})