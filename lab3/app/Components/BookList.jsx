import { useState, useContext } from 'react';
import { BooksContext } from '../Contexts/BooksContext';
import { useFilters } from '../Contexts/FiltersContext';
import BookDescriptionModal from './BookDescription';

const filterTranslations = {
  cover: {
    hard: 'Twarda',
    soft: 'Miękka',
  },
  condition: {
    new: 'Nowa',
    used: 'Używana',
  },
  category: {
    poetry: 'Poezja',
    novel: 'Powieść',
    'computer-science': 'Informatyka',
    biography: 'Biografia',
    fantasy: 'Fantastyka',
    fiction: 'Fikcja',
    history: 'Historia',
    crime: 'Kryminał',
    'non-fiction': 'Literatura faktu',
    science: 'Nauka',
    textbook: 'Podręcznik',
    comic: 'Komiks',
    thriller: 'Thriller',
    other: 'Inne',
  },
};

const translateFilter = (type, value) => {
  return filterTranslations[type]?.[value] || value;
};

const sortBooks = (books, sortingMethod) => {
  switch (sortingMethod) {
    case 'alphabetical':
      return [...books].sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
      return [...books].sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'oldest':
      return [...books].sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'lowest':
      return [...books].sort((a, b) => a.price - b.price);
    case 'highest':
      return [...books].sort((a, b) => b.price - a.price);
    default:
      return books;
  }
};

export default() => {
  const { books } = useContext(BooksContext);
  const { filters } = useFilters();
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = books.filter((book) => {
    const searchTerm = filters.search.query.toLowerCase();

    if (filters.search.criteria === 'name' && !book.title.toLowerCase().includes(searchTerm)) return false;
    if (filters.search.criteria === 'author' && !book.author.toLowerCase().includes(searchTerm)) return false;
    if (filters.search.criteria === 'description' && !book.description.toLowerCase().includes(searchTerm)) return false;

    if (book.price < filters.price.min || book.price > filters.price.max) return false;
    if (book.pages < filters.pages.min || book.pages > filters.pages.max) return false;
    if (filters.cover !== 'any' && book.cover !== filters.cover) return false;
    if (filters.condition !== 'any' && book.condition !== filters.condition) return false;
    if (filters.category !== 'any' && book.category !== filters.category) return false;

    return true;
  });

  const sortedBooks = sortBooks(filteredBooks, filters.sorting);

  return (
    <section className="books">
      {sortedBooks.map((book) => (
        <div className="book" key={book.id}>
          <button className="edit-buttons">Edytuj</button>
          <button className="edit-buttons">Usuń</button>
          <img src={book.image} alt={book.title} />
          <p>
            <strong>{book.title}</strong>
            <br />
            Autor: {book.author}
            <br />
            Okładka: {translateFilter('cover', book.cover)}
            <br />
            Stan: {translateFilter('condition', book.condition)}
            <br />
            Kategoria: {translateFilter('category', book.category)}
            <br />
            Liczba stron: {book.pages}
            <br />
            Cena: {book.price.toFixed(2)} zł
          </p>
          <button onClick={() => setSelectedBook(book)}>Pokaż opis</button>
          <div></div>
          <button>Dodaj do koszyka</button>
          <div className="date">
            Data wystawienia: {new Date(book.date).toLocaleDateString('pl-PL')}
          </div>
        </div>
      ))}

      <BookDescriptionModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </section>
  );
}
