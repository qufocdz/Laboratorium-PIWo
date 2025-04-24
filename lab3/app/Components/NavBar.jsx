import { NavLink } from "react-router";

export default() => {
    return (
    <nav>
        <div className="menu">
            <NavLink to="/" className="nav-link">Strona Główna</NavLink>
            <NavLink to="/new" className="nav-link">Dodaj Nową Pozycję</NavLink>
            <NavLink to="/cart" className="nav-link">Koszyk</NavLink>
        </div>
    </nav>);
}