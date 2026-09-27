import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook } from "../../data/books";

export default async function BookPage({ params }: PageProps<"/books/[id]">) {
  const { id } = await params;
  const book = getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <main className="page">
      <p className="page__eyebrow">{book.genre}</p>
      <h1 className="page__title">{book.title}</h1>
      <p className="page__lead">{book.summary}</p>

      <dl className="details">
        <dt>Автор</dt>
        <dd>{book.author}</dd>
        <dt>Состояние</dt>
        <dd>{book.condition}</dd>
        <dt>Точка обмена</dt>
        <dd>{book.exchangePoint}</dd>
      </dl>

      <Link href="/books" className="page__back">
        Вернуться в каталог
      </Link>
    </main>
  );
}
