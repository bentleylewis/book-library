const myLibrary = [];
const dialog = document.querySelector("#book-dialog")
const modalBtn = document.querySelector("#modal-btn")
const cancelBtn = document.querySelector("#cancel-btn")
const bookForm = document.querySelector("#book-form")
const titleInput = document.querySelector("#book-title")
const authorInput = document.querySelector("#book-author")
const pagesInput = document.querySelector("#book-pages")
const readInput = document.querySelector("#book-read")


modalBtn.addEventListener("click", () => {
    dialog.showModal()
})

cancelBtn.addEventListener("click", () => {
    dialog.close()
})

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const readBefore = readInput.checked;  

    if (title && author && pages) {
        addBookToLibrary(title, author, pages, readBefore);
        displayLibrary();
        dialog.close();
        bookForm.reset();
    }
    
});


function Book(title, author, pages, readBefore) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBefore = readBefore;
    this.id = crypto.randomUUID();

    Book.prototype.toggleRead = function () {
        this.readBefore = !this.readBefore;
    };
}


function addBookToLibrary(title, author, pages, readBefore) {
    const newBook = new Book(title, author, pages, readBefore);
    myLibrary.push(newBook);

}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Good Profit", "Charles Koch", 201, false);



function createBookCard (book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add("book-card");

    const titleElement = document.createElement("h3");
    titleElement.textContent = "Title: " + book.title;

    const authorElement = document.createElement("p");
    authorElement.textContent = "Author: " + book.author;
    
    const pagesElement = document.createElement("p");
    pagesElement.textContent = "Pages: " + book.pages;

    const readElement = document.createElement("button");
    readElement.classList.add("read-btn");
    readElement.textContent =  "Read: " +  (book.readBefore ? "Yes" : "No");

    readElement.addEventListener("click", () => {
        book.toggleRead();
        displayLibrary();
    })

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Delete";
    removeBtn.dataset.id = book.id;

    removeBtn.addEventListener("click", () => {
        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        displayLibrary();
        }
    });

    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    bookCard.appendChild(readElement);
    bookCard.appendChild(removeBtn);

    document.getElementById("libraryDisplay").appendChild(bookCard);
}


function displayLibrary() {
    const libraryDisplay = document.getElementById("libraryDisplay");
    libraryDisplay.innerHTML = "";
    myLibrary.forEach(book => {
        createBookCard(book);
    });
}
displayLibrary();

