import { useRef, useState } from "react";
import { createBook } from "../Services/BookService";
import { useUser } from "../Services/UserService";

export function meta() {
  return [
    { title: "LetBook - Dodaj książkę!" },
    { name: "description", content: "Dodaj ksiażkę!" },
  ];
}

export default function New() {
  const { user } = useUser();

  const newBookRef = useRef({
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
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  if (!user) {
    return (
      <section className="book" style={{ textAlign: "center", marginTop: "20px" }}>
        <div>
          Zaloguj się, aby dodać książkę.
        </div>
      </section>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    newBookRef.current[name] = value;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      newBookRef.current.image = reader.result;
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const bookData = { ...newBookRef.current };

    try {
      const price = parseFloat(bookData.price);
      if (isNaN(price)) {
        alert("Cena musi być liczbą");
        setUploading(false);
        return;
      }

      await createBook({
        ...bookData,
        price,
        pages: parseInt(bookData.pages, 10),
        date: new Date().toISOString(),
        userId: user ? user.uid : null,
        userEmail: user ? user.email : null,
      });

      newBookRef.current = {
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
      };

      setImagePreview("");
      alert("Książka została dodana!");
    } catch (err) {
      alert("Błąd podczas dodawania książki: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="new">
      <div className="main-container">
        <form className="book-form" onSubmit={handleSubmit}>
          <h2>Dodaj Nową Książkę</h2>

          <label htmlFor="title">Tytuł:</label>
          <input type="text" id="title" name="title" defaultValue="" onChange={handleChange} required />

          <label htmlFor="author">Autor:</label>
          <input type="text" id="author" name="author" defaultValue="" onChange={handleChange} required />

          <label htmlFor="price">Cena (zł):</label>
          <input type="number" id="price" name="price" min="0" step="0.01" defaultValue="" onChange={handleChange} required />

          <label htmlFor="pages">Liczba stron:</label>
          <input type="number" id="pages" name="pages" min="0" defaultValue="" onChange={handleChange} required />

          <label htmlFor="cover">Okładka:</label>
          <select id="cover" name="cover" defaultValue="hard" onChange={handleChange} required>
            <option value="hard">Twarda</option>
            <option value="soft">Miękka</option>
          </select>

          <label htmlFor="condition">Stan:</label>
          <select id="condition" name="condition" defaultValue="new" onChange={handleChange} required>
            <option value="new">Nowa</option>
            <option value="used">Używana</option>
          </select>

          <label htmlFor="category">Kategoria:</label>
          <select id="category" name="category" defaultValue="biography" onChange={handleChange} required>
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

          <label htmlFor="image">Zdjęcie książki:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageUpload} />

          {imagePreview && (
            <div>
              <p>Podgląd zdjęcia:</p>
              <img src={imagePreview} alt="Podgląd" style={{ maxWidth: "200px", marginTop: "10px" }} />
            </div>
          )}

          <label htmlFor="description">Opis:</label>
          <textarea id="description" name="description" rows="4" defaultValue="" onChange={handleChange} required></textarea>

          <button type="submit" disabled={uploading}>
            {uploading ? "Dodawanie..." : "Dodaj Książkę"}
          </button>
        </form>
      </div>
    </main>
  );
}
