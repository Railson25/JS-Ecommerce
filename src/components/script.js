let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')


// Abrir o carrinho
cartIcon.onclick = () => {
    cart.classList.add('active')
}


// fechar o carinho
closeCart.onclick = () => {
    cart.classList.remove('active')
}


// Loading do carinho
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}


function ready(){
    // Removendo Item do carinho
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
}


// Removendo Item do carrinho
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
}

