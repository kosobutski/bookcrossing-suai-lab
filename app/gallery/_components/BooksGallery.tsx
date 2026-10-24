"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { books, type Book } from "../../data/books";
import BookMap from "./BookMap";
import BookModal from "./BookModal";
import styles from "./BooksGallery.module.css";

export default function BooksGallery() {
  const [selected, setSelected] = useState<Book | null>(null);
  const [wantIds, setWantIds] = useState<Set<string>>(() => new Set<string>());
  // Кнопка, на которую вернётся фокус после закрытия окна.
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLButtonElement | null>(
    null,
  );

  function openFromCard(book: Book, button: HTMLButtonElement) {
    setReturnFocusTo(button);
    setSelected(book);
  }

  // useCallback держит ссылки на функции стабильными, иначе карта
  // и обработчики окна пересоздавались бы при каждом рендере.
  const openFromMap = useCallback((book: Book) => {
    setReturnFocusTo(null);
    setSelected(book);
  }, []);

  const closeModal = useCallback(() => setSelected(null), []);

  function toggleWant(id: string) {
    setWantIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <div className={styles.grid}>
        {books.map((book, index) => (
          <button
            className={styles.card}
            type="button"
            key={book.id}
            onClick={(event) => openFromCard(book, event.currentTarget)}
          >
            <span className={styles.imageWrap}>
              <Image
                src={book.image}
                alt={book.imageAlt}
                fill
                // Ширина карточки: 1 колонка до 30rem, 2 до 45rem, дальше 3 в ряд
                // внутри страницы шириной не больше 72rem.
                sizes="(max-width: 30rem) calc(100vw - 2rem), (max-width: 45rem) 45vw, (max-width: 72rem) 30vw, 22rem"
                // На телефоне в первый экран попадают две карточки, и любая из них
                // может оказаться LCP-элементом: они грузятся сразу и с высоким
                // приоритетом, остальные — лениво.
                loading={index < 2 ? "eager" : "lazy"}
                fetchPriority={index < 2 ? "high" : "auto"}
                className={styles.image}
              />
            </span>
            <span className={styles.title}>{book.title}</span>
            <span className={styles.summary}>{book.author}</span>
            {wantIds.has(book.id) ? (
              <span className={styles.badge}>В списке «Хочу прочитать»</span>
            ) : null}
          </button>
        ))}
      </div>

      <p className="demo-warning">
        Учебный прототип: список «Хочу прочитать» хранится только в памяти
        страницы и сбросится после её обновления.
      </p>

      <BookMap books={books} onSelect={openFromMap} />

      {selected ? (
        <BookModal
          book={selected}
          isWanted={wantIds.has(selected.id)}
          onToggleWant={() => toggleWant(selected.id)}
          onClose={closeModal}
          returnFocusTo={returnFocusTo}
        />
      ) : null}
    </>
  );
}
