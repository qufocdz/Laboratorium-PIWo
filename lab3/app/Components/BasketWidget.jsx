import { useContext } from 'react';
import BasketBooksContext from '../Contexts/BasketBooks';

export default({ open, onClose }) => {
  const { state = [], dispatch } = useContext(BasketBooksContext);
  
  if (!open) return null;
  
  const totalItems = state.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="basket-widget">
      <div className="basket-widget-header">
        <span>Koszyk ({totalItems})</span>
        <button className="basket-widget-close" onClick={onClose}>✖</button>
      </div>
      {state.length === 0 ? (
        <div className="basket-widget-empty">Brak książek w koszyku.</div>
      ) : (
        <>
          <ul className="basket-widget-list">
            {state.map((item) => (
              <li key={item.id} className="basket-widget-item">
                <img src={item.image} alt={item.title} className="basket-widget-image" />
                <div className="basket-widget-info">
                  <strong>{item.title}</strong>
                  <div>{item.author}</div>
                  <div>{Number(item.price).toFixed(2)} zł</div>
                  <div className="quantity-info">Ilość: {item.quantity}</div>
                </div>
                <div className="basket-widget-actions">
                  <button 
                    className="quantity-btn"
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
                  >
                    −
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}
                  >
                    +
                  </button>
                  <button 
                    className="remove-all-btn"
                    onClick={() => dispatch({ type: 'REMOVE_ALL_OF_ITEM', payload: item })}
                    title="Usuń wszystkie"
                  >
                    ✖
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="basket-widget-total">
            <strong>Razem: {Number(totalPrice).toFixed(2)} zł</strong>
          </div>
        </>
      )}
    </div>
  );
}