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

// Changing order status
let statuses = document.querySelectorAll('.status_line')
let order = document.querySelector('#hiddenInput') ? document.querySelector('#hiddenInput').value : null;
order = JSON.parse(order)
// console.log(order);

function updateStatus(order){
    // console.log(statuses);
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status;
        if(dataProp === order.status){
            stepCompleted = false;
            status.classList.add('ongoing');
        }
        else if(stepCompleted){
            
            status.classList.add('text-gray-500');
            status.classList.add('line-through');
        }
        
        // console.log(status.dataset.status);

    })
}

updateStatus(order)