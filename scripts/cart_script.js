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
                        <div class="remove-item" onclick="removeItem(${item.index})">✕</div>
                `;
        cartContainer.appendChild(itemElement);
    });

}


function renderCart() {
    let arr = tempCart.length == 0 ? cart : tempCart;

    console.log(cart);
    console.log("ARR = " + arr);
    console.log("FILTERED = " + isFiltered);
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

function fillTemp() {
    tempCart = []
    cart.forEach((item, index) => {
        console.log("RATING = "+item.rating);
        if (item.rating.value >= 4.2) {
            tempCart.push(item);
        }
    });
}

function filterByRating() {
    tempCart = [];
    if (!isFiltered) {
        fillTemp();
        isFiltered = true;
    } else {
        isFiltered = false;
    }
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);

    cart.forEach((item, i) => {
        item.index = i;
    });

    if (tempCart.length != 0)
        fillTemp();

    let new_local = cart.map(item => ({ "id": item.id }));
    localStorage.setItem('cart', JSON.stringify(new_local));
    renderCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    renderCart();
}

function sortByPrice() {
    cart.sort((a, b) => b.rating.localeCompare(a.rating));
    cart.forEach((item, i) => {
        item.id = i;
    });

    if (tempCart.length != 0)
        fillTemp();

    renderCart();
}


let tempCart = [];
let isFiltered = false;
let cart = [];
initialize();

async function initialize() {
    cart = await getCartWithDetails();
    cart.forEach((item, index) => {
        item.index = index;
    });
    renderCart();
}