import { useState, useContext } from 'react';
import { NavLink } from 'react-router';
import BasketBooksContext from '../Contexts/BasketBooks';
import BasketWidget from './BasketWidget';

export default () => {
  const [showWidget, setShowWidget] = useState(false);
  const { state = [] } = useContext(BasketBooksContext);
  
  const totalItems = state.reduce((sum, item) => sum + item.quantity, 0);
return (
    <nav>
        <div className="menu">
            <NavLink to="/" className="nav-link">Strona Główna</NavLink>
            <NavLink to="/new" className="nav-link">Dodaj Nową Pozycję</NavLink>
            <div className="basket-container">
                {showWidget && (
                    <BasketWidget open={showWidget} onClose={() => setShowWidget(false)} />
                )}
                <button className="nav-link basket-button" onClick={() => setShowWidget((v) => !v)}>
                    Koszyk ({totalItems}) ▼
                </button>
            </div>
        </div>
    </nav>
);
}