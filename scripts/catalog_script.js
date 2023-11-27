function addToCart(event) {
    const bookId = event.target.dataset.bookId;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.find(item => item.id === bookId)) {
        const newBook = {
            id: bookId,
        };
        cart.push(newBook);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('../data/catalog.json')
        .then(response => response.json())
        .then(data => {
            const booksContainer = document.querySelector('.books');

            data.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.classList.add('book-card');

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
                likeButton.onclick = likeBook;

                const heartIcon = document.createElement('ion-icon');
                heartIcon.name = 'heart-outline';

                likeButton.appendChild(heartIcon);

                const cartButton = document.createElement('button');
                cartButton.classList.add('button');
                cartButton.title = 'cart';
                cartButton.onclick = addToCart;
                cartButton.dataset.bookId = book.id;


                const bagIcon = document.createElement('ion-icon');
                bagIcon.name = 'bag-handle-outline';

                cartButton.appendChild(bagIcon);

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

                booksContainer.appendChild(bookCard);
            });
        })
        .catch(error => console.error('Error loading books:', error));
});