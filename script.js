const bookCards = document.querySelector(".books");
const addBookBtn = document.querySelector(".addBookBtn");
const overlay = document.querySelector(".overlay");
const addBookModal = document.querySelector("#addBookModal");
const addBookForm = document.querySelector("#addBookForm");
const submitBookFormBtn = document.querySelector("#submitBookForm");

const books = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createBookElement(elementType, content, className) {
    const element = document.createElement(elementType);
    element.textContent = content;
    element.setAttribute("class", className);

    return element;
}

function createReadElement(book, bookCard) {
    const read = document.createElement("div");

    read.setAttribute("class", "book-read");
    read.appendChild(createBookElement("label", "Read", "book-read-label"));

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    if (book.read) {
        input.checked = true;
        bookCard.setAttribute("class", "book read-checked");
    } else {
        input.checked = false;
        bookCard.setAttribute("class", "book read-unchecked");
    }

    input.addEventListener("click", (e) => {
        if (e.target.checked) {
            bookCard.setAttribute("class", "book read-checked");
            book.read = true;
        } else {
            bookCard.setAttribute("class", "book read-unchecked");
            book.read = false;
        }
    });

    read.appendChild(input);
    return read;
}

function createBookCard(book, index) {
    const bookCard = document.createElement("div");

    bookCard.setAttribute("class", "book");
    bookCard.setAttribute("data-index", index);

    bookCard.appendChild(
        createBookElement("p", `Title: ${book.title}`, "book-title")
    );
    bookCard.appendChild(
        createBookElement("p", `Author: ${book.author}`, "book-author")
    );
    bookCard.appendChild(
        createBookElement("p", `Pages: ${book.pages}`, "book-pages")
    );
    bookCard.appendChild(createReadElement(book, bookCard));

    const delButton = createBookElement("button", "X", "book-delete");
    delButton.addEventListener("click", () => {
        books.splice(index, 1);
        renderBooks();
    });
    bookCard.appendChild(delButton);

    bookCards.insertAdjacentElement("afterbegin", bookCard);
}

function renderBooks() {
    bookCards.replaceChildren();
    books.forEach((book, index) => {
        createBookCard(book, index);
    });
}

overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    addBookModal.classList.remove("active");
    return;
});

submitBookFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.classList.remove("active");
    addBookModal.classList.remove("active");

    const title = document.querySelector("#addBookForm #title");
    const author = document.querySelector("#addBookForm #author");
    const pages = document.querySelector("#addBookForm #pages");
    const read = document.querySelector("#addBookForm #read");

    const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.checked
    );
    books.push(newBook);
    renderBooks();
});

addBookBtn.addEventListener("click", bringUpForm);
function bringUpForm() {
    addBookForm.reset();
    overlay.classList.add("active");
    addBookModal.classList.add("active");
}
