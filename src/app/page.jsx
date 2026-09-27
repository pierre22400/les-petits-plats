"use client";

import { useState } from "react";
import styles from "./page.module.css";

import Hero from "@/components/Hero/Hero";
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import RecipeCard from "@/components/RecipeCard/RecipeCard";

import recipes from "@/data/recipes.json";


// normalisation des textes pour éviter les doublons dans les filtres (tags uniques)
function getUniqueValues(values) {
    const valuesAlreadySeen = new Set();

    return values.filter((value) => {
        const normalizedValue = value
            .trim()
            .toLocaleLowerCase("fr");

        if (valuesAlreadySeen.has(normalizedValue)) {
            return false;
        }

        valuesAlreadySeen.add(normalizedValue);
        return true;
    });
}


function normalizeText(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

//flatMap() → rassemble les valeurs et getUniqueValues() → retire les doublons

export default function Home() {
    const ingredientOptions = getUniqueValues(
        recipes.flatMap((recipe) =>
            recipe.ingredients.map((ingredient) =>
                ingredient.ingredient
            )
        )
    );

    const applianceOptions = getUniqueValues(
        recipes.map((recipe) => recipe.appliance)
    );

    const utensilOptions = getUniqueValues(
        recipes.flatMap((recipe) => recipe.ustensils)
    );
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    return (
        <>
            <Hero />

            <main className={styles.main}>
                <section className={styles.filters}>
                    <FilterDropdown
                        label="Ingrédients"
                        options={ingredientOptions}
                        onSelect={handleIngredientSelect}
                    />

                    <FilterDropdown
                        label="Appareils"
                        options={applianceOptions}
                    />

                    <FilterDropdown
                        label="Ustensiles"
                        options={utensilOptions}
                    />

                    <p className={styles.recipeCount}>
                        {recipes.length} recettes
                    </p>
                </section>

                <section className={styles.recipeGrid}>
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            {...recipe}
                        />
                    ))}
                </section>

                <div className={styles.selectedTags}>
                    {selectedIngredients.map((ingredient) => (
                        <span
                            key={ingredient}
                            className={styles.tag}
                        >
                            {ingredient}
                        </span>
                    ))}
                </div>
            </main>
        </>
    );
}


function handleIngredientSelect(ingredient) {
    setSelectedIngredients((currentIngredients) => [
        ...currentIngredients,
        ingredient
    ]);
}


const filteredRecipes = recipes.filter((recipe) =>
    selectedIngredients.every((selectedIngredient) =>
        recipe.ingredients.some(
            (ingredient) =>
                normalizeText(ingredient.ingredient) ===
                normalizeText(selectedIngredient)
        )
    )
);