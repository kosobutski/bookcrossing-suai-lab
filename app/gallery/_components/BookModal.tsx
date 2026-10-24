"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import type { Book } from "../../data/books";
import { useDemoAuth } from "../../providers/DemoAuthProvider";
import styles from "./BookModal.module.css";

type BookModalProps = {
  book: Book;
  isWanted: boolean;
  onToggleWant: () => void;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function BookModal({
  book,
  isWanted,
  onToggleWant,
  onClose,
  returnFocusTo,
}: BookModalProps) {
  const { user } = useDemoAuth();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.documentElement.style.overflow = previousOverflow;
      returnFocusTo?.focus();
    };
  }, [onClose, returnFocusTo]);

  // Tab и Shift + Tab ходят по кругу и не выходят за границы окна.
  function keepFocusInside(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;

    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        // Закрываем окно только при нажатии на сам фон.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        onKeyDown={keepFocusInside}
      >
        <button
          ref={closeButtonRef}
          className={styles.close}
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className={styles.title} id="book-modal-title">
          {book.title}
        </h2>

        <Image
          src={book.image}
          alt={book.imageAlt}
          width={900}
          height={600}
          className={styles.image}
          sizes="(max-width: 700px) calc(100vw - 48px), 720px"
        />

        <p className={styles.text}>{book.summary}</p>
        <dl className={styles.details}>
          <dt>Автор</dt>
          <dd>{book.author}</dd>
          <dt>Состояние</dt>
          <dd>{book.condition}</dd>
          <dt>Точка обмена</dt>
          <dd>{book.exchangePoint}</dd>
        </dl>

        <div className={styles.actions}>
          {user ? (
            <button className="button" type="button" onClick={onToggleWant}>
              {isWanted
                ? "Убрать из «Хочу прочитать»"
                : "Добавить в «Хочу прочитать»"}
            </button>
          ) : (
            <Link href="/auth/login">
              Войдите, чтобы добавить книгу в «Хочу прочитать»
            </Link>
          )}
          <Link href={`/books/${book.id}`}>Страница книги</Link>
        </div>
      </div>
    </div>,
    document.body,
  );
}
