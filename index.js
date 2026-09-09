let myLibrary = [];
const bookContent = document.getElementById("book-content");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-pages");
const isBookRead = document.getElementById("is-read");
const submitForm = document.querySelector(".new-book-form");
function Book(title, author, pages, read) {
  //constructor
  if (!new.target) {
    throw Error('You must use the "new" operator to call the constructor.');
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author}, has ${this.pages} pages, ${this.read ? "read" : "not read"}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  //take params, create a book then store it in the array
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

submitForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let book = bookTitle.value;
  let author = bookAuthor.value;
  let pages = Number(bookPages.value);
  let read = isBookRead.checked;

  addBookToLibrary(book, author, pages, read);
  displayBook();
});

bookContent.addEventListener("click", function (e) {
  const targetBookObj = myLibrary.filter(function (book) {
    return e.target.dataset.id !== book.id;
  });
  myLibrary = targetBookObj;
  displayBook();
  console.log(targetBookObj);
});

function displayBook() {
  bookContent.innerHTML = "";
  myLibrary.forEach(function (book) {
    bookContent.innerHTML += `
      <div class="card">
        <h2>${book.title}</h2>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <p>${book.read ? "read" : "not read"}</p>
        <button class="remove-book-btn" data-id="${book.id}">Remove</button>
      </div>
    `;
  });
}

addBookToLibrary("gelas tav", "papo", 222, false);
addBookToLibrary("Vasksa", "paaaapo", 2222, true);
displayBook();
console.log(myLibrary);
