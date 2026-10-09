import Image from "next/image";
import styles from "./RecipeCard.module.css";
import Link from "next/link";

export default function RecipeCard({
  image,
  name,
  slug,
  time,
  description,
  ingredients,
}) {
  return (
    <article className={styles.card}>
      <Link href={`/recette/${slug}`}>
        <div className={styles.imageContainer}>
          <Image
            src={`/images/recipes/${image}`}
            alt={name}
            fill
            className={styles.image}
          />

          <span>TEMPS DE PRÉPARATION</span>
          <span className={styles.time}>{time} min</span>
        </div>
      </Link>

      <span>INGRÉDIENTS</span>

      <div className={styles.ingredients}>
        {ingredients.map((ingredient, index) => (
          <div key={`${ingredient.ingredient}-${index}`}>
            <span>{ingredient.ingredient}</span>

            <span>
              {ingredient.quantity}
              {ingredient.unit && ` ${ingredient.unit}`}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <Link href={`/recette/${slug}`}>
          <h2 className={styles.title}>{name}</h2>
        </Link>

        <span>RECETTE</span>

        <p>{description}</p>
      </div>
    </article>
  );
}
