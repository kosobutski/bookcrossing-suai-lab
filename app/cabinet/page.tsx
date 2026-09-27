"use client";

import Link from "next/link";
import { useDemoAuth } from "../providers/DemoAuthProvider";

export default function CabinetPage() {
  const { user, logout } = useDemoAuth();

  if (!user) {
    return (
      <main className="page">
        <h1 className="page__title">Личный кабинет</h1>
        <p className="page__text">
          В демонстрационном состоянии пользователь отсутствует. Войдите, чтобы
          увидеть свой список «Хочу прочитать» и историю обменов.
        </p>
        <div className="page__actions">
          <Link href="/auth/login" className="page__link">
            Перейти ко входу
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <h1 className="page__title">Личный кабинет</h1>
      <p className="demo-warning">
        Учебный прототип: страница открыта по прямому адресу и лишь выбирает,
        что показать. Серверной защиты пока нет.
      </p>

      <dl className="details">
        <dt>Имя</dt>
        <dd>{user.name}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Уровень</dt>
        <dd>Обычный пользователь</dd>
        <dt>Хочу прочитать</dt>
        <dd>
          Список пока пуст. <Link href="/books">Найти книгу в каталоге</Link>
        </dd>
      </dl>

      <button className="button" type="button" onClick={logout}>
        Выйти
      </button>
    </main>
  );
}
