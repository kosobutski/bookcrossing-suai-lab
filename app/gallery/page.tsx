import BooksGallery from "./_components/BooksGallery";

export default function GalleryPage() {
  return (
    <main className="page">
      <h1 className="page__title">Галерея и карта</h1>
      <p className="page__lead">
        Выберите книгу или метку точки обмена на карте, чтобы открыть подробное
        окно.
      </p>
      <BooksGallery />
    </main>
  );
}
