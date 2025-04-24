import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("new", "routes/new.jsx"),
    route("cart", "routes/cart.jsx"),
];
