import styles from "./FilterDropdown.module.css";

export default function FilterDropdown({ label }) {
  return (
    <button
      type="button"
      className={styles.filter}
    >
      <span>{label}</span>
      <span>⌄</span>
    </button>
  );
}