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

    // Adicionando ao carinho
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
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

// Adicionando ao carinho
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('product-price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src

    addProductToCart(title, price, productImg)
    updateTotal()
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title')

    for (var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('Voce adicinou este item ao carinho')
            return
        }
    }

    // Adicionando HTML atraves do JS
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <h3 class="cart-product-title">${title}</h3>
            <p class="cart-price">${price}</p>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `
    
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
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