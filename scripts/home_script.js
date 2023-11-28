function addToCart(sectionId, bookId) {
    event.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.find(item => item.id === bookId)) {
        const newBook = {
            id: bookId,
        };
        cart.push(newBook);
    }

    const container = document.querySelector("#" + sectionId);
    let bookCard = container.querySelector(`[data-book-id="${bookId}"]`);
    let cartButton = bookCard.querySelector(".cart-button");
    cartButton.classList.add("in-list");

    localStorage.setItem('cart', JSON.stringify(cart));
}

function likeClicked(sectionId, bookId) {
    event.preventDefault();
    let liked = JSON.parse(localStorage.getItem('liked')) || [];

    const container = document.querySelector("#" + sectionId);
    let bookCard = container.querySelector(`[data-book-id="${bookId}"]`);
    let likeButton = bookCard.querySelector(".like-button");
    let likeIcon = likeButton.querySelector("ion-icon");


    let isLiked = liked.find(item => item.id === bookId);
    if (!isLiked) {
        const newBook = {
            id: bookId,
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

    console.log(liked);

    localStorage.setItem('liked', JSON.stringify(liked));
}

function addToLiked(sectionId, bookId) {
    const liked = JSON.parse(localStorage.getItem('liked')) || [];

    if (!liked.find(item => item.id === bookId)) {
        const newBook = {
            id: bookId,
        };
        liked.push(newBook);
    }

    const container = document.querySelector("#" + sectionId);
    let bookCard = container.querySelector(`[data-book-id="${bookId}"]`);
    let likeButton = bookCard.querySelector(".like-button");

    likeButton.classList.add("in-list");
    let likeIcon = likeButton.querySelector("ion-icon");
    likeIcon.setAttribute('name', 'heart');

    localStorage.setItem('liked', JSON.stringify(liked));
}

function bookCardGenerate(sectionId, book, isInLiked, isInCart) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    console.log(book);
    bookCard.dataset.bookId = book.id;

    bookCard.innerHTML = `
                        <a href="../pages/book_details.html?id=${book.id}">
                            <img class="book-cover" src="${book.cover}" alt="${book.title}"></img>
                            <div class="caption">
                                <p class="book-title">${book.title}</p>
                                <p>${book.author}</p>
                            </div>
                            <div class="card-bottom">
                                <button class="button like-button${isInLiked ? " in-list" : ""}" onclick="likeClicked('${sectionId}',${book.id})">
                                    <ion-icon name="${isInLiked ? "heart" : "heart-outline"}"></ion-icon>
                                </button>
                                <button class="button cart-button${isInCart ? " in-list" : ""}" id="${book.id}" onclick="addToCart('${sectionId}',${book.id})">
                                    <ion-icon name="bag-handle-outline"></ion-icon>
                                </button>
                                <div class="rating-field">
                                    <ion-icon name="star"></ion-icon>
                                    <span id="rating">${book.rating.value}</span>
                                    <span id="votes">(${book.rating.votes})</span>
                                </div>
                            </div>
                        </a>
                        `;

    return bookCard;
}

async function loadData() {
    const response = await fetch('../data/catalog.json');
    const catalog = await response.json();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const liked = JSON.parse(localStorage.getItem('liked')) || [];
    console.log(cart);
    console.log(liked);

    fetch('../data/home.json')
        .then(response => response.json())
        .then(data => {
            for (let section in data) {
                let booksList = document.querySelector('#' + section);
                let books = data[section];

                const booksWithDetails = books.map(id => {
                    const book = catalog.find(book => book.id === id);
                    return book;
                });

                booksWithDetails.forEach(book => {
                    const isInCart = cart.some(item => item.id === book.id);
                    const isInLiked = liked.some(item => item.id === book.id);
                    booksList.appendChild(bookCardGenerate(section, book, isInLiked, isInCart));
                });
            }

        })
        .catch(error => console.error('Error loading books:', error));
}



function initSlider(id) {
    const container = document.querySelector("#" + id);

    const booksList = container.querySelector(".slider-wrapper .books-list");
    const slideButtons = container.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = container.querySelector(".slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = booksList.scrollWidth - booksList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPostion = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPostion + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));

            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition} px`;
            booksList.scrollLeft = scrollPosition;
        }

        const handleMouseUp = (e) => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = booksList.clientWidth * direction;
            booksList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = booksList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = booksList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    const updateScrollThumbPosition = () => {
        const scrollPosition = booksList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    booksList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}

loadData();
setTimeout(() => {
    initSlider("container-recommendations");
    initSlider("container-new");
}, 1000);