"use client";

import styles from "./SearchBar.module.css";

export default function SearchBar({
  value,
  onChange
}) {
  return (
    <div className={styles.searchBar}>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher une recette, un ingrédient..."
        aria-label="Rechercher une recette"
      />

      <button type="button">
        Rechercher
      </button>
    </div>
  );
}