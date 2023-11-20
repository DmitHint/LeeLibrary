let tempCart = [];
let cart = [
    {
        "id": 0,
        "src": "../source/book_pics/go.png",
        "title": "Go. Идиомы и паттерны проектирования",
        "author": "Джон Боднер",
        "rating": "4.2",
        "rates_count": "2",
        "price": "699",
    },
    {
        "id": 1,
        "src": "../source/book_pics/grokking_algorithms.png",
        "title": "Грокаем алгоритмы",
        "author": "Адитья Бхаргава",
        "rating": "4.6",
        "rates_count": "11",
        "price": "599",
    },
    {
        "id": 2,
        "src": "../source/book_pics/clean_code.png",
        "title": "Чистый код",
        "author": "Роберт Мартин",
        "rating": "4.0",
        "rates_count": "1",
        "price": "599",
    },
    {
        "id": 3,
        "src": "../source/book_pics/sql.png",
        "title": "SQL. Быстрое погружение",
        "author": "Уолтер Шилдс",
        "rating": "4.3",
        "rates_count": "4",
        "price": "599",
    },
    {
        "id": 4,
        "src": "../source/book_pics/operating_system.png",
        "title": "Современные операционные системы. 4-е издание",
        "author": "Эндрю Таненбаум, Херберт Бос",
        "rating": "3.9",
        "rates_count": "4",
        "price": "699",
    }
];

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
                        <img class="cover" src="${item.src}" alt="${item.title}">
                        <div class="cart-item-info">
                            <p class="cart-item-title">${item.title}</p>
                            <div class="rating-field">
                                <img class="star-ico" src="../source/star.png">
                                <p class="rating">${item.rating}</p>
                                <p class="rates-count">(${item.rates_count})</p>
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
        document.getElementById('payment-button').style.opacity = "0";
        return;
    }

    document.getElementById('summ-placeholder').innerText = totalPrice(arr) + " ₽";

    addElementsHTML(arr);

}

let isFiltered = 0
function fillTemp() {
    tempCart = []
    cart.forEach((item, index) => {
        if (item.rating >= 4.2) {
            tempCart.push(item);
        }
    });
}

function filterByRating() {
    tempCart = [];
    if (isFiltered == 0) {
        fillTemp();
        isFiltered = 1;
    } else {
        isFiltered = 0;
    }
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);

    cart.forEach((item, i) => {
        item.id = i;
    });

    if (tempCart.length != 0)
        fillTemp();

    renderCart();
}

function clearCart() {
    cart = [];
    renderCart();
}

function sortByPrice() {
    cart.sort((a, b) => b.rating.localeCompare(a.rating));
    cart.forEach((item, i) => {
        item.id = i;
    });

    if (tempCart.length != 0)
        fillTemp();

    renderCart(cart);
}

renderCart(cart);