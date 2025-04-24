import { useFilters } from "../Contexts/FiltersContext";

export default() => {
  const { filters, updateFilters } = useFilters();

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "minPrice" || name === "maxPrice") {
      updateFilters({
        price: {
          ...filters.price,
          [name === "minPrice" ? "min" : "max"]: Number(value),
        },
      });
    } else if (name === "minPages" || name === "maxPages") {
      updateFilters({
        pages: {
          ...filters.pages,
          [name === "minPages" ? "min" : "max"]: Number(value),
        },
      });
    } else {
      updateFilters({ [name]: value });
    }
  };

  return (
    <div className="filters">
      <h2>Filtry</h2>

      <div className="price">
        <label htmlFor="cena">Cena:</label>
        Minimalna cena:
        <input
          type="number"
          name="minPrice"
          value={filters.price.min}
          min="0"
          onChange={handleChange}
        />
        Maksymalna cena:
        <input
          type="number"
          name="maxPrice"
          value={filters.price.max}
          min="0"
          onChange={handleChange}
        />
      </div>

      <div className="pages">
        <label htmlFor="pages">Liczba stron:</label>
        Minimalna liczba stron:
        <input
          type="number"
          name="minPages"
          value={filters.pages.min}
          min="0"
          onChange={handleChange}
        />
        Maksymalna liczba stron:
        <input
          type="number"
          name="maxPages"
          value={filters.pages.max}
          min="0"
          onChange={handleChange}
        />
      </div>

      <label htmlFor="cover">Okładka:</label>
      <select
        id="cover"
        name="cover"
        value={filters.cover}
        onChange={handleChange}
      >
        <option value="any">Dowolna</option>
        <option value="hard">Twarda</option>
        <option value="soft">Miękka</option>
      </select>

      <label htmlFor="condition">Stan:</label>
      <select
        id="condition"
        name="condition"
        value={filters.condition}
        onChange={handleChange}
      >
        <option value="any">Dowolny</option>
        <option value="new">Nowa</option>
        <option value="used">Używana</option>
      </select>

      <label htmlFor="category">Kategoria:</label>
      <select
        id="category"
        name="category"
        value={filters.category}
        onChange={handleChange}
      >
        <option value="any">Dowolna</option>
        <option value="biography">Biografia</option>
        <option value="fantasy">Fantastyka</option>
        <option value="fiction">Fikcja</option>
        <option value="history">Historia</option>
        <option value="computer-science">Informatyka</option>
        <option value="comic-book">Komiks</option>
        <option value="crime">Kryminał</option>
        <option value="non-fiction">Literatura faktu</option>
        <option value="science">Nauka</option>
        <option value="textbook">Podręcznik</option>
        <option value="poetry">Poezja</option>
        <option value="novel">Powieść</option>
        <option value="thriller">Thriller</option>
        <option value="other">Inne</option>
      </select>
    </div>
  );
}
