import Image from "next/image";

import recipes from "@/data/recipes.json";

import { notFound } from "next/navigation";

import styles from "./page.module.css";

export default async function RecipePage({ params }) {
  const { slug } = await params;

  const recipe = recipes.find((currentRecipe) => currentRecipe.slug === slug);

  if (!recipe) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <article className={styles.recipe}>
        <div className={styles.imageContainer}>
          <Image
            src={`/images/recipes/${recipe.image}`}
            alt={recipe.name}
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{recipe.name}</h1>

          <div className={styles.meta}>
            <div>
              <h2 className={styles.sectionTitle}>TEMPS DE PREPARATION</h2>

              <p className={styles.metaItem}>{recipe.time} min</p>
            </div>
          </div>
          <h2 className={styles.sectionTitle}> Ingrédients</h2>
          <div className={styles.ingredients}>
            {recipe.ingredients.map((ingredient, index) => (
              <div
                key={`${ingredient.ingredient}-${index}`}
                className={styles.ingredient}
              >
                <span className={styles.ingredientName}>
                  {ingredient.ingredient}
                </span>

                <span className={styles.ingredientQuantity}>
                  {ingredient.quantity !== undefined && ingredient.quantity}

                  {ingredient.unit && ` ${ingredient.unit}`}
                </span>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Appareil</h2>

          <p className={styles.appliance}>{recipe.appliance}</p>

          <h2 className={styles.sectionTitle}>Ustensiles</h2>

          <ul className={styles.utensils}>
            {recipe.ustensils.map((utensil) => (
              <li key={utensil} className={styles.utensil}>
                {utensil}
              </li>
            ))}
          </ul>
          <h2 className={styles.sectionTitle}>Recette</h2>

          <p className={styles.description}>{recipe.description}</p>
        </div>
      </article>
    </main>
  );
}
