import styles from "./page.module.css";

import Hero from "@/components/Hero/Hero";
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import RecipeCard from "@/components/RecipeCard/RecipeCard";

export default function Home() {
  return (
    <>
      <Hero />

      <main className={styles.main}>
        <section className={styles.filters}>
          <FilterDropdown label="Ingrédients" />
          <FilterDropdown label="Appareils" />
          <FilterDropdown label="Ustensiles" />

          <p className={styles.recipeCount}>
            50 recettes
          </p>
        </section>

        <section className={styles.recipeGrid}>
          <RecipeCard />
        </section>
      </main>
    </>
  );
}