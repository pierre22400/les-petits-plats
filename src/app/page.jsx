"use client";

import { useState } from "react";

import styles from "./page.module.css";

import Hero from "@/components/Hero/Hero";
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import RecipeCard from "@/components/RecipeCard/RecipeCard";

import recipes from "@/data/recipes.json";


function normalizeText(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("fr")
        .trim();
}


function getUniqueValues(values) {
    const valuesAlreadySeen = new Set();

    return values.filter((value) => {
        const normalizedValue = normalizeText(value);

        if (valuesAlreadySeen.has(normalizedValue)) {
            return false;
        }

        valuesAlreadySeen.add(normalizedValue);
        return true;
    });
}


export default function Home() {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedAppliances, setSelectedAppliances] = useState([]);
    const [selectedUtensils, setSelectedUtensils] = useState([]);


    function handleIngredientSelect(ingredient) {
        setSelectedIngredients((currentIngredients) => [
            ...currentIngredients,
            ingredient
        ]);
    }


    function handleApplianceSelect(appliance) {
        setSelectedAppliances((currentAppliances) => [
            ...currentAppliances,
            appliance
        ]);
    }


    function handleUtensilSelect(utensil) {
        setSelectedUtensils((currentUtensils) => [
            ...currentUtensils,
            utensil
        ]);
    }

    function handleIngredientRemove(ingredientToRemove) {
        setSelectedIngredients((currentIngredients) =>
            currentIngredients.filter(
                (ingredient) =>
                    normalizeText(ingredient) !==
                    normalizeText(ingredientToRemove)
            )
        );
    }


    function handleApplianceRemove(applianceToRemove) {
        setSelectedAppliances((currentAppliances) =>
            currentAppliances.filter(
                (appliance) =>
                    normalizeText(appliance) !==
                    normalizeText(applianceToRemove)
            )
        );
    }


    function handleUtensilRemove(utensilToRemove) {
        setSelectedUtensils((currentUtensils) =>
            currentUtensils.filter(
                (utensil) =>
                    normalizeText(utensil) !==
                    normalizeText(utensilToRemove)
            )
        );
    }
    const filteredRecipes = recipes.filter((recipe) => {
        const matchesIngredients = selectedIngredients.every(
            (selectedIngredient) =>
                recipe.ingredients.some(
                    (ingredient) =>
                        normalizeText(ingredient.ingredient) ===
                        normalizeText(selectedIngredient)
                )
        );

        const matchesAppliances = selectedAppliances.every(
            (selectedAppliance) =>
                normalizeText(recipe.appliance) ===
                normalizeText(selectedAppliance)
        );

        const matchesUtensils = selectedUtensils.every(
            (selectedUtensil) =>
                recipe.ustensils.some(
                    (utensil) =>
                        normalizeText(utensil) ===
                        normalizeText(selectedUtensil)
                )
        );

        return (
            matchesIngredients &&
            matchesAppliances &&
            matchesUtensils
        );
    });


    const ingredientOptions = getUniqueValues(
        filteredRecipes.flatMap((recipe) =>
            recipe.ingredients.map(
                (ingredient) => ingredient.ingredient
            )
        )
    );


    const applianceOptions = getUniqueValues(
        filteredRecipes.map((recipe) => recipe.appliance)
    );


    const utensilOptions = getUniqueValues(
        filteredRecipes.flatMap(
            (recipe) => recipe.ustensils
        )
    );


    const availableIngredientOptions = ingredientOptions.filter(
        (ingredient) =>
            !selectedIngredients.some(
                (selectedIngredient) =>
                    normalizeText(selectedIngredient) ===
                    normalizeText(ingredient)
            )
    );


    const availableApplianceOptions = applianceOptions.filter(
        (appliance) =>
            !selectedAppliances.some(
                (selectedAppliance) =>
                    normalizeText(selectedAppliance) ===
                    normalizeText(appliance)
            )
    );


    const availableUtensilOptions = utensilOptions.filter(
        (utensil) =>
            !selectedUtensils.some(
                (selectedUtensil) =>
                    normalizeText(selectedUtensil) ===
                    normalizeText(utensil)
            )
    );


    return (
        <>
            <Hero />

            <main className={styles.main}>
                <section className={styles.filters}>
                    <FilterDropdown
                        label="Ingrédients"
                        options={availableIngredientOptions}
                        onSelect={handleIngredientSelect}
                    />

                    <FilterDropdown
                        label="Appareils"
                        options={availableApplianceOptions}
                        onSelect={handleApplianceSelect}
                    />

                    <FilterDropdown
                        label="Ustensiles"
                        options={availableUtensilOptions}
                        onSelect={handleUtensilSelect}
                    />

                    <p className={styles.recipeCount}>
                        {filteredRecipes.length} recettes
                    </p>
                </section>


                <div className={styles.selectedTags}>
                    {selectedIngredients.map((ingredient) => (
                        <button
                            type="button"
                            key={`ingredient-${ingredient}`}
                            className={styles.tag}
                            onClick={() => handleIngredientRemove(ingredient)}
                            aria-label={`Supprimer le filtre ${ingredient}`}
                        >
                            <span>{ingredient}</span>
                            <span aria-hidden="true">×</span>
                        </button>
                    ))}

                    {selectedAppliances.map((appliance) => (
                        <button
                            type="button"
                            key={`appliance-${appliance}`}
                            className={styles.tag}
                            onClick={() => handleApplianceRemove(appliance)}
                            aria-label={`Supprimer le filtre ${appliance}`}
                        >
                            <span>{appliance}</span>
                            <span aria-hidden="true">×</span>
                        </button>
                    ))}

                    {selectedUtensils.map((utensil) => (
                        <button
                            type="button"
                            key={`utensil-${utensil}`}
                            className={styles.tag}
                            onClick={() => handleUtensilRemove(utensil)}
                            aria-label={`Supprimer le filtre ${utensil}`}
                        >
                            <span>{utensil}</span>
                            <span aria-hidden="true">×</span>
                        </button>
                    ))}
                </div>

                {selectedAppliances.map((appliance) => (
                    <span
                        key={`appliance-${appliance}`}
                        className={styles.tag}
                    >
                        {appliance}
                    </span>
                ))}

                {selectedUtensils.map((utensil) => (
                    <span
                        key={`utensil-${utensil}`}
                        className={styles.tag}
                    >
                        {utensil}
                    </span>
                ))}
            </div>


            <section className={styles.recipeGrid}>
                {filteredRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        {...recipe}
                    />
                ))}
            </section>
        </main >
    </>
  );
}