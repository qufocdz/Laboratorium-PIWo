import React, { useRef, useState } from 'react';

export default function BookEditModal({ book, onSave, onCancel }) {
  const editDataRef = useRef({
    title: book.title,
    author: book.author,
    price: book.price,
    pages: book.pages,
    cover: book.cover,
    condition: book.condition,
    category: book.category,
    description: book.description,
    image: book.image,
  });
  const [imagePreview, setImagePreview] = useState(book.image);

  const handleChange = (e) => {
    const { name, value } = e.target;
    editDataRef.current[name] = value;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      editDataRef.current.image = reader.result;
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(book.id, {
      ...editDataRef.current,
      price: parseFloat(editDataRef.current.price),
      pages: parseInt(editDataRef.current.pages, 10),
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close-button" onClick={onCancel}>X</button>
        <h2>Edytuj książkę</h2>
        <form onSubmit={handleSubmit}>
          <label>Tytuł:</label>
          <input name="title" defaultValue={book.title} onChange={handleChange} required />

          <label>Autor:</label>
          <input name="author" defaultValue={book.author} onChange={handleChange} required />

          <label>Cena (zł):</label>
          <input name="price" type="number" min="0" step="0.01" defaultValue={book.price} onChange={handleChange} required />

          <label>Liczba stron:</label>
          <input name="pages" type="number" min="0" defaultValue={book.pages} onChange={handleChange} required />

          <label>Okładka:</label>
          <select name="cover" defaultValue={book.cover} onChange={handleChange}>
            <option value="hard">Twarda</option>
            <option value="soft">Miękka</option>
          </select>

          <label>Stan:</label>
          <select name="condition" defaultValue={book.condition} onChange={handleChange}>
            <option value="new">Nowa</option>
            <option value="used">Używana</option>
          </select>

          <label>Kategoria:</label>
          <select name="category" defaultValue={book.category} onChange={handleChange}>
            <option value="poetry">Poezja</option>
            <option value="novel">Powieść</option>
            <option value="computer-science">Informatyka</option>
            <option value="biography">Biografia</option>
            <option value="fantasy">Fantastyka</option>
            <option value="fiction">Fikcja</option>
            <option value="history">Historia</option>
            <option value="crime">Kryminał</option>
            <option value="non-fiction">Literatura faktu</option>
            <option value="science">Nauka</option>
            <option value="textbook">Podręcznik</option>
            <option value="comic">Komiks</option>
            <option value="thriller">Thriller</option>
            <option value="other">Inne</option>
          </select>

          <label>Opis:</label>
          <textarea name="description" rows="4" defaultValue={book.description} onChange={handleChange} style={{ resize: "none" }}></textarea>

          <label>Zdjęcie książki:</label>
          <input type="file" name="image" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && <img src={imagePreview} alt="Podgląd" style={{ maxWidth: '200px', marginTop: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />}

          <div className="button-group">
            <button type="submit">Zapisz</button>
            <button type="button" onClick={onCancel}>Anuluj</button>
          </div>
        </form>
      </div>
    </div>
  );
}
