import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("new", "routes/new.jsx"),
    route("cart", "routes/cart.jsx"),
    route("login", "routes/login.jsx"),
    route("register", "routes/register.jsx"),
];
