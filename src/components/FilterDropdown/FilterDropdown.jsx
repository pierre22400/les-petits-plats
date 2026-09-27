"use client";

import { useState } from "react";
import styles from "./FilterDropdown.module.css";

export default function FilterDropdown({
  label,
  options,
  onSelect
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
<button
  type="button"
  key={option}
  className={styles.option}
  onClick={() => onSelect(option)}
>
  {option}
</button>

      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <button
              type="button"
              key={option}
              className={styles.option}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}