import { useRef, useState} from "react";
import { useNavigate } from "react-router";
import { registerUserWithUsername, loginWithGoogle } from "../Services/UserService";

export function meta() {
  return [
    { title: "LetBook - Rejestracja" },
    { name: "description", content: "Zarejestruj się w LetBook!" },
  ];
}

export default function Register() {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await registerUserWithUsername(
        usernameRef.current.value.trim(),
        emailRef.current.value.trim(),
        passwordRef.current.value
      );
      setSuccess("Rejestracja zakończona sukcesem!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="login">
      <h2>Zarejestruj się</h2>

      <form onSubmit={handleRegister} className="login-form">
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          ref={usernameRef}
          required
        />
        <input
          type="email"
          placeholder="Adres email"
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          ref={passwordRef}
          required
        />
        <button type="submit">
          Zarejestruj się
        </button>
      </form>

      {error && (
        <p className="form-error">{error}</p>
      )}
      {success && (
        <p className="form-success">{success}</p>
      )}

      <hr className="form-divider" />

      <button
        className="google-login-btn"
        onClick={loginWithGoogle}
      >
        Zaloguj się przez Google
      </button>
    </main>
  );
}