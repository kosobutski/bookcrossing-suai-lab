import Link from "next/link";
import FeatureCard from "../ui/FeatureCard";

export default function StartPage() {
  return (
    <main className="page">
      <h1 className="page__title">Колибри</h1>

      <p className="page__lead">
        Приложение решает проблему обмена прочитанными книгами: помогает отдать
        книгу, которая уже прочитана, и найти новую бесплатно или по обмену
        рядом с домом. Подбор идёт по жанру, состоянию экземпляра и ближайшим
        точкам обмена.
      </p>

      <section className="page__section" aria-labelledby="audience-title">
        <h2 className="page__subtitle" id="audience-title">
          Целевая аудитория
        </h2>
        <p className="page__text">
          Читающие горожане, которые регулярно дочитывают книги, готовы
          передавать их другим и ищут новые книги недалеко от дома, работы или
          учёбы.
        </p>
      </section>

      <section className="page__section" aria-labelledby="features-title">
        <h2 className="page__subtitle" id="features-title">
          Основные функции
        </h2>

        <div className="page__features">
          <FeatureCard
            title="Каталог книг"
            description="Просмотр доступных книг с фильтрами: жанр, состояние экземпляра, ближайшая точка обмена."
          />
          <FeatureCard
            title="Карта точек обмена"
            description="Отображение полок и шкафов буккроссинга на карте города с адресом и режимом работы."
          />
          <FeatureCard
            title="Хочу прочитать"
            description="Личный список книг, которые пользователь ждёт, с отметкой о появлении в каталоге."
          />
        </div>
      </section>

      <div className="page__actions">
        <Link href="/books" className="page__link">
          Открыть каталог книг
        </Link>
        <Link href="/gallery" className="page__link page__link--secondary">
          Галерея и карта
        </Link>
        <Link href="/about" className="page__link page__link--secondary">
          О проекте
        </Link>
      </div>
    </main>
  );
}
