"use client";

import { useEffect, useRef, useState } from "react";
import type { Book } from "../../data/books";
import styles from "./BookMap.module.css";

type Coordinates = [number, number];

// Минимальные типы той части API Яндекс Карт, которая используется ниже.
type YandexPlacemark = {
  events: {
    add: (eventName: string, handler: () => void) => void;
  };
};

type YandexMap = {
  geoObjects: {
    add: (placemark: YandexPlacemark) => void;
  };
  destroy: () => void;
};

type YandexMapsApi = {
  ready: (callback: () => void) => void;
  Map: new (
    container: HTMLElement,
    state: { center: Coordinates; zoom: number; controls: string[] },
  ) => YandexMap;
  Placemark: new (
    coordinates: Coordinates,
    properties: { hintContent: string; balloonContent: string },
    options: { preset: string; iconColor: string },
  ) => YandexPlacemark;
};

declare global {
  interface Window {
    ymaps?: YandexMapsApi;
  }
}

const scriptId = "kolibri-yandex-maps";
let mapsPromise: Promise<YandexMapsApi> | null = null;

// Скрипт подключается один раз, а промис ждёт готовности API через ymaps.ready.
function loadMaps(apiKey: string): Promise<YandexMapsApi> {
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    function fail() {
      mapsPromise = null;
      reject(new Error("Не удалось загрузить API Яндекс Карт"));
    }

    function resolveWhenReady() {
      const ymaps = window.ymaps;
      if (!ymaps) {
        fail();
        return;
      }
      ymaps.ready(() => resolve(ymaps));
    }

    if (window.ymaps) {
      resolveWhenReady();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`;
    script.async = true;
    script.addEventListener("load", resolveWhenReady, { once: true });
    script.addEventListener("error", fail, { once: true });
    document.head.appendChild(script);
  });

  return mapsPromise;
}

type BookMapProps = {
  books: Book[];
  onSelect: (book: Book) => void;
};

export default function BookMap({ books, onSelect }: BookMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ?? "";

  useEffect(() => {
    if (!apiKey || !containerRef.current || books.length === 0) return;

    let disposed = false;
    let map: YandexMap | null = null;

    async function buildMap() {
      try {
        const ymaps = await loadMaps(apiKey);
        if (disposed || !containerRef.current) return;

        // Центр карты — среднее положение всех точек обмена.
        const center: Coordinates = [
          books.reduce((sum, book) => sum + book.latitude, 0) / books.length,
          books.reduce((sum, book) => sum + book.longitude, 0) / books.length,
        ];

        map = new ymaps.Map(containerRef.current, {
          center,
          zoom: 13,
          controls: ["zoomControl"],
        });

        books.forEach((book) => {
          const placemark = new ymaps.Placemark(
            [book.latitude, book.longitude],
            { hintContent: book.title, balloonContent: book.exchangePoint },
            { preset: "islands#circleDotIcon", iconColor: "#111111" },
          );
          placemark.events.add("click", () => onSelect(book));
          map?.geoObjects.add(placemark);
        });

        setStatus("ready");
      } catch {
        if (!disposed) setStatus("error");
      }
    }

    void buildMap();

    return () => {
      disposed = true;
      map?.destroy();
    };
  }, [apiKey, books, onSelect]);

  return (
    <section className={styles.section} aria-labelledby="map-title">
      <h2 className="page__subtitle" id="map-title">
        Карта точек обмена
      </h2>

      {!apiKey ? (
        <p className={styles.status} role="status">
          Карта недоступна: не задан ключ API. Добавьте
          NEXT_PUBLIC_YANDEX_MAPS_API_KEY в файл .env.local и перезапустите
          сервер.
        </p>
      ) : null}

      {apiKey && status === "loading" ? (
        <p className={styles.status} role="status">
          Карта загружается…
        </p>
      ) : null}

      {apiKey && status === "error" ? (
        <p className={styles.status} role="status">
          Не удалось загрузить карту. Проверьте ключ и подключение к интернету.
        </p>
      ) : null}

      {apiKey ? (
        <div
          ref={containerRef}
          className={styles.canvas}
          aria-label="Интерактивная карта точек обмена"
        />
      ) : null}
    </section>
  );
}
