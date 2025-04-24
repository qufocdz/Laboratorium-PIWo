import { createContext, useState } from "react";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([
    {
        id: 1,
        title: "Pan Tadeusz",
        author: "Adam Mickiewicz",
        cover: "hard",
        condition: "used",
        category: "poetry",
        pages: 352,
        price: 23.90,
        image: "/pan-tadeusz.jpg",
        description: "Pan Tadeusz to narodowa epopeja Polski, napisana przez Adama Mickiewicza. Opowiada o losach szlacheckiej rodziny Sopliców w czasach rozbiorów.",
        date: "2025-01-05",
      },
      {
        id: 2,
        title: "Proces",
        author: "Franz Kafka",
        cover: "soft",
        condition: "used",
        category: "novel",
        pages: 216,
        price: 10.60,
        image: "/proces.jpg",
        description: "Proces to powieść Franza Kafki, która opowiada o mężczyźnie oskarżonym o przestępstwo, którego nie zna. Książka bada absurdalność biurokracji i ludzkiej egzystencji.",
        date: "2025-02-20",
      },
      {
        id: 3,
        title: "Wprowadzenie do algorytmów",
        author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
        cover: "hard",
        condition: "used",
        category: "computer-science",
        pages: 1208,
        price: 299.99,
        image: "/wprowalgo.jpg",
        description: "Wprowadzenie do algorytmów to podręcznik akademicki, który szczegółowo opisuje różne algorytmy i struktury danych. Jest to niezbędna lektura dla studentów informatyki.",
        date: "2025-01-15",
      },
  ]);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};