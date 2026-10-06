import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./Hero.module.css";

export default function Hero({
  searchQuery,
  onSearchChange
}) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Découvrez nos recettes du quotidien, simples et délicieuses
      </h1>

      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
      />
    </section>
  );
}