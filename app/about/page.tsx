import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="page">
      <section className="idea">
        <h1 className="idea__title">Колибри</h1>

        <section className="idea__block">
          <h2 className="idea__subtitle">Цель разработки</h2>
          <p className="idea__paragraph">
            Создать веб-приложение для буккроссинга, где можно передать
            прочитанную книгу другому читателю и найти новую бесплатно или по
            обмену. Подбор идёт по жанру, состоянию экземпляра и ближайшим
            точкам обмена.
          </p>
        </section>

        <section className="idea__block">
          <h2 className="idea__subtitle">Будущий результат</h2>
          <p className="idea__paragraph">
            К завершению курса «Колибри» будет законченным приложением:
            каталог книг, карточка книги, карта точек обмена, список «хочу
            прочитать» и личный кабинет. Пользователь сможет найти книгу по
            жанру и состоянию, увидеть ближайшую точку обмена на карте и
            сохранить книгу для следующего визита.
          </p>
        </section>

        <section className="idea__block">
          <h2 className="idea__subtitle">Основная предметная сущность</h2>
          <p className="idea__paragraph">
            Книга: конкретный экземпляр, который можно забрать или оставить. У
            книги есть название, автор, жанр и состояние экземпляра, позже —
            обложка, описание и точка обмена на карте; каталог, карточка книги
            и список «хочу прочитать» строятся вокруг этого объекта.
          </p>
        </section>

        <section className="idea__block">
          <h2 className="idea__subtitle">Предполагаемые разделы приложения</h2>
          <ul className="idea__list">
            <li className="idea__list__item">главная страница;</li>
            <li className="idea__list__item">каталог книг;</li>
            <li className="idea__list__item">страница отдельной книги;</li>
            <li className="idea__list__item">карта точек обмена;</li>
            <li className="idea__list__item">личный кабинет;</li>
            <li className="idea__list__item">вход и регистрация;</li>
            <li className="idea__list__item">о проекте.</li>
          </ul>
        </section>

        <section className="idea__block">
          <h2 className="idea__subtitle">Предполагаемые функции</h2>
          <ul className="idea__list">
            <li className="idea__list__item">
              Каталог книг с фильтрами: жанр, состояние экземпляра, ближайшая
              точка обмена.
            </li>
            <li className="idea__list__item">
              Список «хочу прочитать» и история отданных и полученных книг с
              короткой заметкой о прочитанном.
            </li>
            <li className="idea__list__item">
              Разделение на несколько уровней пользователей: обычный
              пользователь, подтверждённый пользователь с расширенными
              возможностями, администратор.
            </li>
            <li className="idea__list__item">
              Передача книги другому пользователю через выбранную точку обмена
              в определённый день.
            </li>
          </ul>
        </section>

        <nav className="idea__nav">
          <Link href="/start" className="idea__nav__item">
            Вернуться на главную страницу
          </Link>
        </nav>
      </section>
    </main>
  );
}
