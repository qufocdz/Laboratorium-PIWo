import Filters from "../Components/Filters";
import Search from "../Components/Search";
import BookList from "../Components/BookList";

export function meta() {
  return [
    { title: "LetBook - Strona Główna" },
    { name: "description", content: "Przejrzyj książki!" },
  ];
}

export default function Home() {
  return (
    <main className="home">
      <div className="main-container">
        <Filters/>
        <div className="search-and-results">
          <Search />
          <BookList/>
        </div>
      </div>
    </main>
  );
}
