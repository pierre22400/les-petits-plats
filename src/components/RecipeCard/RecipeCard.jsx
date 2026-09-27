import Image from "next/image";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({
  image,
  name,
  time,
  description,
  ingredients
}) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={`/images/recipes/${image}`}
          alt={name}
          fill
          className={styles.image}
        />

        <span className={styles.time}>
          {time} min
        </span>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          {name}
        </h2>

        <h3>RECETTE</h3>

        <p>
          {description}
        </p>

        <h3>INGRÉDIENTS</h3>

        <div className={styles.ingredients}>
          {ingredients.map((ingredient, index) => (
            <div
              key={`${ingredient.ingredient}-${index}`}
            >
              <span>
                {ingredient.ingredient}
              </span>

              <span>
                {ingredient.quantity}
                {ingredient.unit && ` ${ingredient.unit}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}