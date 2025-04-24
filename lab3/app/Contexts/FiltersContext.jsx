import { createContext, useState, useContext } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const defaultFilters = {
    search: {
      query: "",
      criteria: "name",
    },
    price: {
      min: 0,
      max: 500,
    },
    pages: {
      min: 0,
      max: 1500,
    },
    cover: "any",
    condition: "any",
    category: "any",
    sorting: "alphabetical",
  };

  const [filters, setFilters] = useState(defaultFilters);

  const updateSearch = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const updateFilters = (updatedValues) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedValues,
    }));
  };

  return (
    <FiltersContext.Provider value={{ filters, updateSearch, updateFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
