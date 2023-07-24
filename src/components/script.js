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
    // Removendo Items do carinho
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // Atualizando a quantidade de items
    var quantityInputs = document.getElementsByClassName('cart-quantity')

    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
}


// Removendo Item do carrinho
function removeCartItem(event){
    var buttonClicked = event.target
    // O parentElement irá apagar o pai do elemento clicado e todos os filhos
    buttonClicked.parentElement.remove()
    updateTotal()
}

// Quantidade mudou
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}

//Atualizando Total 
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0

    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value 

        total = total + price * quantity
        // Se o valor conter centavos
        total = Math.round(total *100) / 100
        
        document.getElementsByClassName('total-price')[0].innerText= '$' + total
    }
}