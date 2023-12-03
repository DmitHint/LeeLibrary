async function getCartWithDetails() {
    try {
        const cartIds = JSON.parse(localStorage.getItem('cart')) || [];

        const response = await fetch('../data/catalog.json');
        const catalog = await response.json();

        const cartWithDetails = cartIds.map(item => {
            const book = catalog.find(book => book.id === Number(item.id));
            return book;
        });

        return cartWithDetails;
    } catch (error) {
        console.error('Error loading catalog:', error);
    }
}

function totalPrice(cart) {
    summ = 0;
    cart.forEach((item, index) => {
        summ += Number(item.price);
    })
    return summ;
}

function addElementsHTML(arr) {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    arr.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
                        <img class="cover" src="${item.cover}" alt="${item.title}"></img>
                        <div class="cart-item-info">
                            <p class="cart-item-title">${item.title}</p>
                            <div class="rating-field">
                                <img class="star-ico" src="../source/star.png">
                                <p class="rating">${item.rating.value}</p>
                                <p class="votes">(${item.rating.votes})</p>
                            </div>
                            <p class="cart-item-author">${item.author}</p>
                            <p class="cart-item-price">${item.price} ₽</p>
                        </div>
                        <div class="remove-item" onclick="removeItem(${item.id})">✕</div>
                `;
        cartContainer.appendChild(itemElement);
    });

}

function renderCart() {
    let arr = tempCart.length == 0 ? cart : tempCart;
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    if (arr.length == 0) {
        const itemElement = document.createElement("h3");
        itemElement.innerHTML = `Корзина пуста. Добавьте книги из каталога`;
        cartContainer.appendChild(itemElement);
        document.getElementById('payment-button').style.display = "none";
        return;
    }

    document.getElementById('summ-placeholder').innerText = totalPrice(arr) + " ₽";

    addElementsHTML(arr);
}

function removeItem(id) {
    cart = cart.filter(book => book.id !== id);
    tempCart = tempCart.filter(book => book.id !== id);

    if (tempCart.length != 0 && isSorted) {
        tempCart = tempCart.sort((a, b) => b.rating.value - a.rating.value);
    }
    else if (tempCart.length == 0) {
        isSorted = false;
        setSortColor();
    }

    let new_local = cart.map(item => ({ "id": item.id }));
    localStorage.setItem('cart', JSON.stringify(new_local));
    renderCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    renderCart();
}

function setSortColor() {
    let sortBtn = document.querySelector(".sort");
    if (isSorted) {
        sortBtn.classList.add("active");
        sortBtn.style.color = "#af3030";
    } else {
        tempCart = [];
        sortBtn.classList.remove("active");
        sortBtn.style.color = "#000";
    }
}

function sortByRating() {
    if (tempCart.length == 0 && cart.length == 0) {
        setSortColor();
        return;
    }

    tempCart = (tempCart.length == 0 ? cart : tempCart).slice();
    tempCart = tempCart.sort((a, b) => b.rating.value - a.rating.value);
    isSorted = !isSorted;

    setSortColor();

    renderCart();
}


let tempCart = [];
let cart = [];
let isSorted = false;
initialize();

async function initialize() {
    cart = await getCartWithDetails();
    renderCart();
}