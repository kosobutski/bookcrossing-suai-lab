export type BookCondition = "как новая" | "хорошее" | "с пометками";

export type Book = {
  id: string;
  title: string;
  author: string;
  summary: string;
  genre: string;
  condition: BookCondition;
  exchangePoint: string;
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
    exchangePoint: "Полка в кофейне «Зерно», ул. Ленина, 12",
  },
  {
    id: "dune",
    title: "Дюна",
    author: "Фрэнк Герберт",
    summary:
      "Эпическая фантастика о пустынной планете Арракис, борьбе за власть и судьбе Пола Атрейдеса.",
    genre: "Фантастика",
    condition: "как новая",
    exchangePoint: "Шкаф буккроссинга в городской библиотеке, пр. Мира, 5",
  },
  {
    id: "sapiens",
    title: "Sapiens. Краткая история человечества",
    author: "Юваль Ной Харари",
    summary:
      "Научно-популярный рассказ о том, как человек разумный стал доминирующим видом на планете.",
    genre: "Нон-фикшн",
    condition: "с пометками",
    exchangePoint: "Полка в холле университета, корпус 2",
  },
];

export function getBook(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}
