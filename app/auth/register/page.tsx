"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useDemoAuth } from "../../providers/DemoAuthProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useDemoAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    // Проверки только для обратной связи в интерфейсе, не для безопасности.
    if (password.length < 8) {
      setError("Пароль должен содержать не менее 8 символов.");
      return;
    }

    if (password !== confirmation) {
      setError("Введённые пароли не совпадают.");
      return;
    }

    register(name, email.trim());
    router.push("/cabinet");
  }

  return (
    <main className="page page--form">
      <h1 className="page__title">Регистрация</h1>
      <p className="demo-warning">
        Учебный прототип: данные существуют только в состоянии текущей вкладки
        и не записываются в базу данных.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label" htmlFor="name">
          Имя
        </label>
        <input
          className="form__input"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
        />

        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input
          className="form__input"
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <label className="form__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="form__input"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          aria-describedby={error ? "register-error" : undefined}
          required
        />

        <label className="form__label" htmlFor="confirmation">
          Повторите пароль
        </label>
        <input
          className="form__input"
          id="confirmation"
          type="password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          autoComplete="new-password"
          aria-describedby={error ? "register-error" : undefined}
          required
        />

        {error ? (
          <p className="form__error" id="register-error" role="alert">
            {error}
          </p>
        ) : null}

        <button className="button" type="submit">
          Создать учебную запись
        </button>
      </form>

      <p className="page__text">
        Уже есть учебная запись? <Link href="/auth/login">Войти</Link>
      </p>
    </main>
  );
}
