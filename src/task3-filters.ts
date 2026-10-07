import { Book, BookFilter } from "./task1-types";

// TODO 1: Создайте фильтр по имени автора
// Возвращает: функцию типа BookFilter, которая возвращает true, если автор есть в списке book.authors
// Подсказка: используйте метод массива .some() и приведите строки к нижнему регистру для нечувствительного поиска.
export const filterByAuthor = (authorName: string): BookFilter => {
  const lowerAuthor = authorName.toLowerCase().trim();

  return (book: Book) => {
    if (!book.authors || !Array.isArray(book.authors)) return false;

    return book.authors.some(author => 
      author && author.toLowerCase().trim().includes(lowerAuthor)
    );
  };
};

// TODO 2: Создайте фильтр по минимальному году издания
// Возвращает: функцию типа BookFilter, которая возвращает true, если book.year >= year
// Подсказка: не забудьте проверить, что book.year !== undefined, иначе будет ошибка.
export const filterByMinYear = (year: number): BookFilter => {
  return (book: Book) => {
    if (book.year === undefined || book.year === null || typeof book.year !== 'number') {
      return false;
    }

    return book.year >= year;
  };
};

// TODO 3: Создайте фильтр по минимальному рейтингу
// Возвращает: функцию типа BookFilter, которая возвращает true, если book.rating >= rating
export const filterByMinRating = (rating: number): BookFilter => {
  return (book: Book) => {
    if (book.rating === undefined || book.rating === null) return false;

    return book.rating >= rating;
  };
};

// TODO 4: Примените массив фильтров к массиву книг
// Возвращает: новый массив Book[], содержащий только те книги, которые проходят ВСЕ фильтры
// Подсказка: используйте метод массива .filter() в сочетании с .every().
export const applyFilters = (books: Book[], filters: BookFilter[]): Book[] => {
  if (!filters || filters.length === 0) return books;

  return books.filter(book => filters.every(filter => filter(book)));
};