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

function loadBook(book) {
    const product = document.querySelector(".container .product");
    console.log(book);
    product.innerHTML = `
        <img src = "${book.cover}" alt = "Обложка книги" />
        <div class="product-info">
            <h1>${book.title}</h1>
            <h2>${book.author}</h2>
            <div class="panel">
                <button class="button like-button">
                    <ion-icon name="heart"></ion-icon>
                </button>
                <button class="button cart-button">
                    <ion-icon name="bag-handle-outline"></ion-icon>
                </button>
                <div class="rating-field">
                    <ion-icon name="star"></ion-icon>
                    <span id="rating">${book.rating.value}</span>
                    <span id="votes">(${book.rating.votes})</span>
                </div>
            </div>
        </div>

        <div class="buttons">
            <button id="buy">Купить</button>
            <button id="download">Скачать</button>
            <button id="order">Заказать бумажный вариант</button>
            <button id="with-sub">Взять по подписке</button>
        </div>
    `
}

async function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    let book = await getBookFromCatalog(bookId);
    console.log(book);
    loadBook(book);
}

initialize()

