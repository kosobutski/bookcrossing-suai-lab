export type BookCondition = "как новая" | "хорошее" | "с пометками";

export type Book = {
  id: string;
  title: string;
  author: string;
  summary: string;
  genre: string;
  condition: BookCondition;
  exchangePoint: string;
  image: string;
  imageAlt: string;
  // Координаты точки обмена, где лежит экземпляр.
  latitude: number;
  longitude: number;
};

export const books: Book[] = [
  {
    id: "master-i-margarita",
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    summary:
      "Роман о визите дьявола в Москву 1930-х годов и истории Мастера, написавшего книгу о Понтии Пилате.",
    genre: "Классика",
    condition: "хорошее",
    exchangePoint: "Полка буккроссинга у Дома книги, Невский пр., 28",
    image: "/images/books/master-i-margarita.jpg",
    imageAlt:
      "Тёмно-фиолетовая обложка книги «Мастер и Маргарита» на книжной полке",
    latitude: 59.9357,
    longitude: 30.3256,
  },
  {
    id: "dune",
    title: "Дюна",
    author: "Фрэнк Герберт",
    summary:
      "Эпическая фантастика о пустынной планете Арракис, борьбе за власть и судьбе Пола Атрейдеса.",
    genre: "Фантастика",
    condition: "как новая",
    exchangePoint:
      "Шкаф буккроссинга в Библиотеке Маяковского, наб. реки Фонтанки, 46",
    image: "/images/books/dune.jpg",
    imageAlt: "Оранжевая обложка книги «Дюна» на книжной полке",
    latitude: 59.9343,
    longitude: 30.3436,
  },
  {
    id: "sapiens",
    title: "Sapiens. Краткая история человечества",
    author: "Юваль Ной Харари",
    summary:
      "Научно-популярный рассказ о том, как человек разумный стал доминирующим видом на планете.",
    genre: "Нон-фикшн",
    condition: "с пометками",
    exchangePoint: "Полка в холле ГУАП, ул. Большая Морская, 67",
    image: "/images/books/sapiens.jpg",
    imageAlt: "Светлая обложка книги «Sapiens» с красным заголовком на полке",
    latitude: 59.9298,
    longitude: 30.2964,
  },
];

export function getBook(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}
