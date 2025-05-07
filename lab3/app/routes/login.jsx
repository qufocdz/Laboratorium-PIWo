import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { loginWithGoogle, loginWithUsernamePassword } from "../Services/UserService";

export function meta() {
  return [
    { title: "LetBook - Logowanie" },
    { name: "description", content: "Zaloguj się do LetBook!" },
  ];
}

export default function Login() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginWithUsernamePassword(
        usernameRef.current.value.trim(),
        passwordRef.current.value
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="login">
      <h2>Zaloguj się</h2>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          ref={usernameRef}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          ref={passwordRef}
          required
        />
        <button type="submit">
          Zaloguj się
        </button>
      </form>

      {error && (
        <p className="form-error">{error}</p>
      )}

      <hr className="form-divider" />

      <button
        className="google-login-btn"
        onClick={async () => {
          try {
            await loginWithGoogle();
            navigate("/");
          } catch (err) {
            setError(err.message);
          }
        }}
      >
        Zaloguj się przez Google
      </button>
    </main>
  );
}