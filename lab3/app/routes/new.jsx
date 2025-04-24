import { useState, useContext } from "react";
import { BooksContext } from "../Contexts/BooksContext";

export function meta() {
  return [
    { title: "LetBook - Dodaj książkę!" },
    { name: "description", content: "Dodaj nową książkę do bazy danych!" },
  ];
}

export default function New() {
  const { books, setBooks } = useContext(BooksContext);
  
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    pages: "",
    cover: "hard",
    condition: "new",
    category: "biography",
    image: "",
    description: "",
    date: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewBook((prevBook) => ({
      ...prevBook,
      image: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const price = parseFloat(newBook.price);
    if (isNaN(price)) {
      alert("Cena musi być liczbą");
      return;
    }
  
    setBooks([
      ...books,
      {
        ...newBook,
        price: price,
        id: books.length + 1,
      },
    ]);
  
    setNewBook({
      title: "",
      author: "",
      price: "",
      pages: "",
      cover: "hard",
      condition: "new",
      category: "biography",
      image: "",
      description: "",
      date: new Date().toISOString(),
    });
    
    alert("Książka została dodana!");
  };
  
  return (
    <main className="new">
      <div className="main-container">
        <form className="book-form" onSubmit={handleSubmit}>
          <h2>Dodaj Nową Książkę</h2>

          <label htmlFor="title">Tytuł:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBook.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={newBook.author}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Cena (zł):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newBook.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />

          <label htmlFor="pages">Liczba stron:</label>
          <input
            type="number"
            id="pages"
            name="pages"
            value={newBook.pages}
            onChange={handleChange}
            min="0"
            required
          />

          <label htmlFor="cover">Okładka:</label>
          <select
            id="cover"
            name="cover"
            value={newBook.cover}
            onChange={handleChange}
            required
          >
            <option value="hard">Twarda</option>
            <option value="soft">Miękka</option>
          </select>

          <label htmlFor="condition">Stan:</label>
          <select
            id="condition"
            name="condition"
            value={newBook.condition}
            onChange={handleChange}
            required
          >
            <option value="new">Nowa</option>
            <option value="used">Używana</option>
          </select>

          <label htmlFor="category">Kategoria:</label>
          <select
            id="category"
            name="category"
            value={newBook.category}
            onChange={handleChange}
            required
          >
            <option value="biography">Biografia</option>
            <option value="fantasy">Fantastyka</option>
            <option value="fiction">Fikcja</option>
            <option value="history">Historia</option>
            <option value="computer-science">Informatyka</option>
            <option value="comic-book">Komiks</option>
            <option value="crime">Kryminał</option>
            <option value="non-fiction">Literatura faktu</option>
            <option value="science">Nauka</option>
            <option value="textbook">Podręcznik</option>
            <option value="poetry">Poezja</option>
            <option value="novel">Powieść</option>
            <option value="thriller">Thriller</option>
            <option value="other">Inne</option>
          </select>

          <label htmlFor="image">Zdjęcie:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <label htmlFor="description">Opis:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={newBook.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Dodaj Książkę</button>
        </form>
      </div>
    </main>
  );
}
