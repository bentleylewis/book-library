const myLibrary = [];


function Book(title, author, pages, readBefore) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readBefore = readBefore;
    this.id = crypto.randomUUID();
}


function addBookToLibrary(title, author, pages, readBefore) {
    const newBook = new Book(title, author, pages, readBefore);
    myLibrary.push(newBook);

}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("19000 pens", "diddy", 12, false);
console.log(myLibrary);


function createBookCard (book) {
    const bookCard = document.createElement('div');

    const titleElement = document.createElement("h3");
    titleElement.textContent = "Title: " + book.title;

    const authorElement = document.createElement("p");
    authorElement.textContent = "Author: " + book.author;
    
    const pagesElement = document.createElement("p");
    pagesElement.textContent = "Pages: " + book.pages;

    const readElement = document.createElement("p");
    readElement.textContent =  "Read: " +  (book.readBefore ? "Yes" : "No");


    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    bookCard.appendChild(readElement);

    document.getElementById("libraryDisplay").appendChild(bookCard);
}


function displayLibrary() {
    const libraryDisplay = document.getElementById("libraryDisplay");
    libraryDisplay.innerHTML = "";
    myLibrary.forEach(book => {
        createBookCard(book);
    });
}


function promptNewBook () {
    const title = prompt("enter book title")
    const author = prompt("Enter book author:");
    const pages = prompt("Enter number of pages:");
    const readBefore = confirm("Have you read this book? (OK = Yes, Cancel = No)");

    addBookToLibrary(title, author, pages, readBefore);
    displayLibrary();
}