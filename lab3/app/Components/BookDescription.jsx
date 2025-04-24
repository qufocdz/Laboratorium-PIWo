export default ({ book, onClose }) => {
    if (!book) return null;
  
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h3>{book.title}</h3>
          <p><strong>Autor:</strong> {book.author}</p>
          <p>{book.description}</p>
          <button className="modal-close-button" onClick={onClose}>Zamknij</button>
        </div>
      </div>
    );
  }