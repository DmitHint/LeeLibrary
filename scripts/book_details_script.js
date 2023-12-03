async function getBookFromCatalog(bookId) {
    try {
        const response = await fetch('../data/catalog.json');
        const catalog = await response.json();

        const book = catalog.find(book => {
            return book.id === Number(bookId);
        });
        return book;
    } catch (error) {
        console.error('Error loading catalog:', error);
    }
}

function likeClicked(bookId) {
    event.preventDefault();
    let liked = JSON.parse(localStorage.getItem('liked')) || [];

    let likeButton = document.querySelector(".like-button");
    let likeIcon = likeButton.querySelector("ion-icon");

    let isLiked = liked.find(item => item.id === bookId);
    if (!isLiked) {
        const newBook = {
            id: Number(bookId),
        };
        liked.push(newBook);
        likeIcon.setAttribute('name', 'heart');
        likeButton.classList.remove("out-list");
        likeButton.classList.add("in-list");
    } else {
        liked = liked.filter(item => item.id !== bookId);
        likeIcon.setAttribute('name', 'heart-outline');
        likeButton.classList.remove("in-list");
        likeButton.classList.add("out-list");
    }

    localStorage.setItem('liked', JSON.stringify(liked));
}

function addToCart(bookId) {
    event.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.find(item => item.id === bookId)) {
        const newBook = {
            id: Number(bookId),
        };
        cart.push(newBook);
    }

    let cartButton = document.querySelector(".cart-button");
    cartButton.classList.remove("out-list");
    cartButton.classList.add("in-list");
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadBook(book) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const liked = JSON.parse(localStorage.getItem('liked')) || [];

    const isInCart = cart.some(item => item.id === book.id);
    const isInLiked = liked.some(item => item.id === book.id);

    let block = document.querySelector(".container .product");
    block.innerHTML = `
        <img src = "${book.cover}" alt = "Обложка книги" />
        <div class="product-info">
            <h1>${book.title}</h1>
            <h2>${book.author}</h2>
            <div class="panel">
                <button class="button like-button${isInLiked ? " in-list" : ""}" onclick="likeClicked(${book.id})">
                    <ion-icon name="${isInLiked ? "heart" : "heart-outline"}"></ion-icon>
                </button>
                <button class="button cart-button${isInCart ? " in-list" : ""}" onclick="addToCart(${book.id})">
                    <ion-icon name="bag-handle-outline"></ion-icon>
                </button>
                <div class="rating-field">
                    <ion-icon name="star"></ion-icon>
                    <span id="rating">${book.rating.value}</span>
                    <span id="votes">(${book.rating.votes})</span>
                </div>
            </div>
            <div class="buttons">
                <button id="download">Скачать</button>
                <button id="order">Заказать бумажный вариант</button>
                <button id="with-sub">Взять по подписке</button>
            </div>
        </div>
    `;
    block = document.querySelector(".description");
    block.innerHTML = `
        <h2>Описание книги</h2>
        <p>${book.description.replace(/\n/g, "<br/>")}</p>
    `;
}

async function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    let book = await getBookFromCatalog(bookId);
    loadBook(book);
}

initialize()

