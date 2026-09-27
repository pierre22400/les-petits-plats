import Image from "next/image";
import recipes from "@/data/recipes.json";
import { notFound } from "next/navigation";

export default async function RecipePage({ params }) {
  const { slug } = await params;

  const recipe = recipes.find(
    (currentRecipe) => currentRecipe.slug === slug
  );


if (!recipe) {
  notFound();
}

  return (
    <main>
      <div>
        <Image
          src={`/images/recipes/${recipe.image}`}
          alt={recipe.name}
          width={500}
          height={500}
        />
      </div>

      <section>
        <h1>{recipe.name}</h1>

        <p>
          {recipe.time} min
        </p>

        <p>
          {recipe.servings} portions
        </p>

        <p>
          {recipe.description}
        </p>
        <section>
  <h2>Ingrédients</h2>

  {recipe.ingredients.map((ingredient, index) => (
    <div key={`${ingredient.ingredient}-${index}`}>
      <span>
        {ingredient.ingredient}
      </span>

      <span>
        {ingredient.quantity !== undefined && ingredient.quantity}
        {ingredient.unit && ` ${ingredient.unit}`}
      </span>
    </div>
  ))}
</section>
<p>
  Appareil : {recipe.appliance}
</p>
<ul>
  {recipe.ustensils.map((ustensil) => (
    <li key={ustensil}>
      {ustensil}
    </li>
  ))}
</ul>
      </section>
    </main>
  );
}