import Link from "next/link";
import { books } from "../data/books";

export default function BooksPage() {
  return (
    <main className="page">
      <h1 className="page__title">Каталог книг</h1>
      <p className="page__lead">
        Книги, которые читатели оставили в точках обмена. Выберите экземпляр,
        чтобы узнать, где его забрать.
      </p>

      <div className="catalog">
        {books.map((book) => (
          <article className="card card--book" key={book.id}>
            <p className="card__meta">{book.genre}</p>
            <h2 className="card__title">{book.title}</h2>
            <p className="card__author">{book.author}</p>
            <p className="card__text">{book.summary}</p>
            <Link className="card__link" href={`/books/${book.id}`}>
              Подробнее
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
