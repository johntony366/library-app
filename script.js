const bookCards = document.querySelector(".books");
const addBookBtn = document.querySelector(".addBookBtn");
const overlay = document.querySelector(".overlay");
const addBookModal = document.querySelector("#addBookModal");
const addBookForm = document.querySelector("#addBookForm");
const submitBookFormBtn = document.querySelector("#submitBookForm");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    getBooks() {
        return this.books;
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }
}

class DisplayController {
    constructor() {
        this.library = new Library();
    }

    setupEventListeners() {
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
            this.library.addBook(newBook);
            this.renderBooks();
        });

        addBookBtn.addEventListener("click", bringUpForm);
        function bringUpForm() {
            addBookForm.reset();
            overlay.classList.add("active");
            addBookModal.classList.add("active");
        }
    }

    createBookElement(elementType, content, className) {
        const element = document.createElement(elementType);
        element.textContent = content;
        element.setAttribute("class", className);

        return element;
    }

    createReadElement(book, bookCard) {
        const read = document.createElement("div");

        read.setAttribute("class", "book-read");
        read.appendChild(this.createBookElement("label", "Read", "book-read-label"));

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

    createBookCard(book, index) {
        const bookCard = document.createElement("div");

        bookCard.setAttribute("class", "book");
        bookCard.setAttribute("data-index", index);

        bookCard.appendChild(
            this.createBookElement("p", `Title: ${book.title}`, "book-title")
        );
        bookCard.appendChild(
            this.createBookElement("p", `Author: ${book.author}`, "book-author")
        );
        bookCard.appendChild(
            this.createBookElement("p", `Pages: ${book.pages}`, "book-pages")
        );
        bookCard.appendChild(this.createReadElement(book, bookCard));

        const delButton = this.createBookElement("button", "X", "book-delete");
        delButton.addEventListener("click", () => {
            this.library.removeBook(index, 1);
            this.renderBooks();
        });

        bookCard.appendChild(delButton);

        bookCards.appendChild(bookCard);
    }

    renderBooks() {
        bookCards.replaceChildren();
        this.library.getBooks().forEach((book, index) => {
            this.createBookCard(book, index);
        });
    }
}

displayController = new DisplayController();
displayController.setupEventListeners();
