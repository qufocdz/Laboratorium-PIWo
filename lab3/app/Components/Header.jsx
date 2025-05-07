import { NavLink } from 'react-router';
import { useUser } from '../Services/UserService';
import { auth } from '../Services/init';

export default () => {
    const { user } = useUser();

    const handleLogout = async () => {
        await auth.signOut();
    };

    return (
        <header>
            <div className="header-container">
                <h1>letBook</h1>
                <div className="login-buttons">
                    {user ? (
                        <>
                            <span>Witaj, {user.displayName || user.email}</span>
                            <button type="button" onClick={handleLogout} style={{ marginLeft: 12 }}>
                                Wyloguj się
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <button type="button">Zaloguj się</button>
                            </NavLink>
                            <NavLink to="/register">
                                <button type="button">Zarejestruj się</button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
