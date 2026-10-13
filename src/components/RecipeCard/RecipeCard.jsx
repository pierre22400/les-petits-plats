import Image from "next/image";
import styles from "./RecipeCard.module.css";
import Link from "next/link";

/**
 * CARTE RECETTE — Les Petits Plats
 * Regroupe le titre, le descriptif et les ingrédients dans un même
 * conteneur afin de garantir des espacements cohérents sur chaque carte.
 */

/**
 * Affiche une carte de recette avec son lien, sa durée et ses ingrédients.
 *
 * @param {{image: string, name: string, slug: string, time: number, description: string, ingredients: Array<{ingredient: string, quantity?: number, unit?: string}>}} props
 * @returns {import("react").ReactNode} La carte complète de la recette.
 */
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
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />

          <span className={styles.preparationLabel}>
            TEMPS DE PRÉPARATION
          </span>
          <span className={styles.time}>{time} min</span>
        </div>
      </Link>

      <div className={styles.content}>
        <Link href={`/recette/${slug}`}>
          <h2 className={styles.title}>{name}</h2>
        </Link>

        <span className={styles.sectionLabel}>RECETTE</span>
        <p>{description}</p>

        <span className={`${styles.sectionLabel} ${styles.ingredientsLabel}`}>
          INGRÉDIENTS
        </span>
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
      </div>
    </article>
  );
}
