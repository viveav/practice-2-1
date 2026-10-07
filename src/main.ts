import './styles.css';
import { formatBook, Book, Catalog, BookFilter } from './task1-types';
import { addBook } from './task2-functions';
import { createBookFromForm } from './task4-integration';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';

// Готовые данные для старта
let initialBooks: Catalog = {
  '1': {id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2023},
  '2': {id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022},
  '3': {id: '3', title: 'Преступление и наказание', authors: ['Ф.М.Достоевский'], year: 1866},
};

// TODO: Студенты пишут код ниже
const bookList = document.getElementById('bookList')! as HTMLDivElement;
const form = document.getElementById('bookForm')! as HTMLFormElement;
const filtersBtn = document.getElementById('applyFilters')! as HTMLButtonElement;
const authorsInput = document.getElementById('filterAuthor')! as HTMLInputElement;
const yearInput = document.getElementById('filterYear')! as HTMLInputElement;
const errorMessage = document.getElementById('errorMessage')! as HTMLDivElement;

function renderBooks(books: Book[]) {
  bookList.innerHTML = books.map(book => 
    `<div class="book-card">${formatBook(book)}</div>`
  ).join('');
}

// Отрисовать начальные книги
renderBooks(Object.values(initialBooks));

// Обработчик формы
document.getElementById('bookForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMessage.textContent = '';
  try {
    const formData = new FormData(form);
    const newBook = createBookFromForm(formData);
    initialBooks = addBook(initialBooks, newBook);
    form.reset();
    renderBooks(Object.values(initialBooks));
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.textContent = error.message; 
    }
  }
});

// Обработчик фильтров
filtersBtn.addEventListener('click', () => {
  const activeFilters: BookFilter[] = [];

  if (authorsInput.value.trim()) {
    activeFilters.push(filterByAuthor(authorsInput.value.trim()));
  }

  if (yearInput.value) {
    activeFilters.push(filterByMinYear(Number.parseInt(yearInput.value, 10)));
  }

  const allBooksArray = Object.values(initialBooks);
  const filteredBooks = applyFilters(allBooksArray, activeFilters);
  renderBooks(filteredBooks);
});