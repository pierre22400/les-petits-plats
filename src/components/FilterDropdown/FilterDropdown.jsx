"use client";

import { useState } from "react";

import styles from "./FilterDropdown.module.css";
import { normalizeText } from "@/utils/search";





export default function FilterDropdown({
  label,
  options,
  onSelect
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");


  const filteredOptions = options.filter((option) =>
    normalizeText(option).includes(
      normalizeText(filterQuery)
    )
  );


  function handleOptionSelect(option) {
    onSelect(option);
    setFilterQuery("");
  }


  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.filter}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <span aria-hidden="true">⌄</span>
      </button>

      {isOpen && (
        <div className={styles.options}>
          <input
            type="search"
            value={filterQuery}
            onChange={(event) =>
              setFilterQuery(event.target.value)
            }
            placeholder={`Rechercher dans ${label.toLowerCase()}`}
            className={styles.searchInput}
            aria-label={`Rechercher dans ${label.toLowerCase()}`}
          />

          <div className={styles.optionList}>
            {filteredOptions.map((option) => (
              <button
                type="button"
                key={option}
                className={styles.option}
                onClick={() =>
                  handleOptionSelect(option)
                }
              >
                {option}
              </button>
            ))}

            {filteredOptions.length === 0 && (
              <p className={styles.noOption}>
                Aucun résultat
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}