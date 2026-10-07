// Задание 1: Интерфейсы и типы
// Описание модели каталога книг

// TODO 1: Объявите интерфейс Book с readonly id
export interface Book {
  readonly id: string;
  title: string;
  authors: string[];
  year?: number;
  // Проверка диапазона будет осуществляться в задании 4
  rating?: number; 
}

// TODO 2: Объявите тип Catalog как словарь
export type Catalog = Record<string, Book>;

// TODO 3: Объявите тип BookFilter как функцию
export type BookFilter = (book: Book) => boolean;

// TODO 4: Реализуйте функцию formatBook
// Формат: "Title (Year) — Authors"
export function formatBook(book: Book): string {
  const yearStr = book.year !== undefined ? ` (${book.year})` : "";
  const authorsStr = book.authors.join(", ");
  return `${book.title}${yearStr} — ${authorsStr}`;
}

// TODO 5: Реализуйте функцию calculateAverageYear
// Вернуть средний год издания. Если книг нет или у них нет года - вернуть 0.
export function calculateAverageYear(books: Book[]): number {
  // Отбираем книги с указанным годом
  const booksWithYear = books.filter((book) => book.year !== undefined);

  if (booksWithYear.length === 0) return 0;

  // Считаем сумму, безопасно подставляя 0 вместо undefined через ??
  const sum = booksWithYear.reduce(
    (acc, book) => acc + (book.year ?? 0), 
    0
  );

  return sum / booksWithYear.length;
}