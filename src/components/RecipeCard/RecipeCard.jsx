import Image from "next/image";
import styles from "./RecipeCard.module.css";

export default function RecipeCard() {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src="/images/Recipes/Recette48.jpg"
          alt="Recette exemple"
          fill
          className={styles.image}
        />

        <span className={styles.time}>
          20 min
        </span>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          Recette exemple
        </h2>

        <h3>RECETTE</h3>

        <p>
          Une description provisoire de la recette.
        </p>

        <h3>INGRÉDIENTS</h3>

        <div>
          Tomates — 400 g
        </div>

        <div>
          Basilic — 20 g
        </div>
      </div>
    </article>
  );
}