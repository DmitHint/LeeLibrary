function addToCart(event) {
    event.preventDefault();
    const bookId = event.target.dataset.bookId;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.find(item => item.id === bookId)) {
        const newBook = {
            id: Number(bookId),
        };
        cart.push(newBook);
    }

    let bookCard = document.querySelector(`[data-book-id="${bookId}"]`);


    let cartButton = bookCard.querySelector(".cart-button");
    cartButton.classList.remove("out-list");
    cartButton.classList.add("in-list");


    localStorage.setItem('cart', JSON.stringify(cart));
}

function likeClicked(bookId) {
    event.preventDefault();
    let liked = JSON.parse(localStorage.getItem('liked')) || [];
    liked = liked.filter(item => item.id !== bookId);
    localStorage.setItem('liked', JSON.stringify(liked));
    renderFavorite();

}

function createCard(book) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const liked = JSON.parse(localStorage.getItem('liked')) || [];

    const isInCart = cart.some(item => item.id === book.id);
    const isInLiked = liked.some(item => item.id === book.id);

    const ref = document.createElement('a');
    ref.href = "../pages/book_details.html?id=" + book.id;

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.bookId = book.id;

    const coverImg = document.createElement('img');
    coverImg.classList.add('book-cover');
    coverImg.src = book.cover;
    coverImg.alt = 'Обложка книги';

    const captionDiv = document.createElement('div');
    captionDiv.classList.add('caption');

    const titleP = document.createElement('p');
    titleP.classList.add('book-title');
    titleP.textContent = book.title;

    const authorP = document.createElement('p');
    authorP.textContent = book.author;

    captionDiv.appendChild(titleP);
    captionDiv.appendChild(authorP);

    const bottomDiv = document.createElement('div');
    bottomDiv.classList.add('card-bottom');

    const likeButton = document.createElement('button');
    likeButton.classList.add('button', 'like-button');
    likeButton.title = 'like';
    likeButton.onclick = function () {
        likeClicked(book.id);
    };

    const heartIcon = document.createElement('ion-icon');
    if (isInLiked) {
        likeButton.classList.add('in-list');
        heartIcon.name = 'heart';
    } else {
        likeButton.classList.add('out-list');
        heartIcon.name = 'heart-outline';
    }
    likeButton.appendChild(heartIcon);

    const cartButton = document.createElement('button');
    cartButton.classList.add('button', 'cart-button');
    cartButton.title = 'cart';
    cartButton.onclick = addToCart;
    cartButton.dataset.bookId = book.id;

    const cartIcon = document.createElement('ion-icon');
    cartIcon.name = 'bag-handle-outline';
    if (isInCart) {
        cartButton.classList.add('in-list');
    } else {
        cartButton.classList.add('out-list');
    }
    cartButton.appendChild(cartIcon);

    const ratingField = document.createElement('div');
    ratingField.classList.add('rating-field');

    const starIcon = document.createElement('ion-icon');
    starIcon.name = 'star';

    const ratingSpan = document.createElement('span');
    ratingSpan.id = 'rating';
    ratingSpan.textContent = `${book.rating.value}`;


    const votesSpan = document.createElement('span');
    votesSpan.id = 'votes';
    votesSpan.textContent = `(${book.rating.votes})`;

    ratingField.appendChild(starIcon);
    ratingField.appendChild(ratingSpan);
    ratingField.appendChild(votesSpan);

    bottomDiv.appendChild(ratingField);
    bottomDiv.appendChild(cartButton);
    bottomDiv.appendChild(likeButton);

    bookCard.appendChild(coverImg);
    bookCard.appendChild(captionDiv);
    bookCard.appendChild(bottomDiv);
    ref.appendChild(bookCard);

    return ref;
}

async function renderFavorite() {
    let liked = JSON.parse(localStorage.getItem('liked')) || [];

    if (liked.length == 0) {
        const favContainer = document.querySelector(".favorite-container");
        favContainer.innerHTML = `
                        <h1>Отложенные книги</h1>
                        <div class="empty">
                            <p>Отсутствуют. Перейдите в каталог и выберите произведения</p>
                        </div>
        `;
        return;
    } else {
        fetch('../data/catalog.json')
            .then(response => response.json())
            .then(data => {
                const booksContainer = document.querySelector('.books');
                booksContainer.innerHTML = '';
                console.log(liked);

                liked.forEach(book => {
                    booksContainer.appendChild(createCard(data[book.id]));
                });
            })
            .catch(error => console.error('Error loading books:', error));

    }

}

renderFavorite();