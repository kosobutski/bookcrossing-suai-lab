"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useDemoAuth } from "../../providers/DemoAuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useDemoAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    // Проверка только для обратной связи в интерфейсе, не для безопасности.
    if (password.length < 8) {
      setError("Пароль должен содержать не менее 8 символов.");
      return;
    }

    login(email.trim());
    router.push("/cabinet");
  }

  return (
    <main className="page page--form">
      <h1 className="page__title">Вход</h1>
      <p className="demo-warning">
        Учебный прототип: пароль не проверяется сервером и не сохраняется.
        Состояние входа сбросится после обновления страницы.
      </p>

      <form className="form" onSubmit={handleSubmit}>
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
          autoComplete="current-password"
          aria-describedby={error ? "login-error" : undefined}
          aria-invalid={error ? true : undefined}
          required
        />

        {error ? (
          <p className="form__error" id="login-error" role="alert">
            {error}
          </p>
        ) : null}

        <button className="button" type="submit">
          Войти в демонстрационном режиме
        </button>
      </form>

      <p className="page__text">
        Нет учебной записи? <Link href="/auth/register">Регистрация</Link>
      </p>
    </main>
  );
}
