"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Hero from "@/components/pages/Hero/Hero";
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import SelectedFilters from "@/components/SelectedFilters/SelectedFilters";
import recipes from "@/data/recipes.json";

import {
  filterRecipes,
  getIngredientOptions,
  getApplianceOptions,
  getUtensilOptions,
  normalizeText,
  removeSelectedOptions,
} from "@/utils/search";

/**
 * PAGE D’ACCUEIL — Les Petits Plats
 * Gère les sélections dans un seul état parent et confie leur affichage
 * au composant SelectedFilters, sans dupliquer le rendu des boutons.
 */

/** Affiche les recettes et pilote les recherches et les filtres combinés. */
export default function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [selectedUtensils, setSelectedUtensils] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  /** Ajoute un ingrédient parmi les filtres actifs. */
  function handleIngredientSelect(ingredient) {
    setSelectedIngredients((currentIngredients) => [
      ...currentIngredients,
      ingredient,
    ]);
  }

  /** Ajoute un appareil parmi les filtres actifs. */
  function handleApplianceSelect(appliance) {
    setSelectedAppliances((currentAppliances) => [
      ...currentAppliances,
      appliance,
    ]);
  }

  /** Ajoute un ustensile parmi les filtres actifs. */
  function handleUtensilSelect(utensil) {
    setSelectedUtensils((currentUtensils) => [...currentUtensils, utensil]);
  }

  /** Retire un ingrédient en comparant les libellés normalisés. */
  function handleIngredientRemove(ingredientToRemove) {
    setSelectedIngredients((currentIngredients) =>
      currentIngredients.filter(
        (ingredient) =>
          normalizeText(ingredient) !== normalizeText(ingredientToRemove),
      ),
    );
  }

  /** Retire un appareil en comparant les libellés normalisés. */
  function handleApplianceRemove(applianceToRemove) {
    setSelectedAppliances((currentAppliances) =>
      currentAppliances.filter(
        (appliance) =>
          normalizeText(appliance) !== normalizeText(applianceToRemove),
      ),
    );
  }

  /** Retire un ustensile en comparant les libellés normalisés. */
  function handleUtensilRemove(utensilToRemove) {
    setSelectedUtensils((currentUtensils) =>
      currentUtensils.filter(
        (utensil) => normalizeText(utensil) !== normalizeText(utensilToRemove),
      ),
    );
  }

  const filteredRecipes = filterRecipes(recipes, {
    searchQuery,
    selectedIngredients,
    selectedAppliances,
    selectedUtensils,
  });

  const ingredientOptions = getIngredientOptions(filteredRecipes);
  const applianceOptions = getApplianceOptions(filteredRecipes);
  const utensilOptions = getUtensilOptions(filteredRecipes);
  const availableIngredientOptions = removeSelectedOptions(
    ingredientOptions,
    selectedIngredients,
  );
  const availableApplianceOptions = removeSelectedOptions(
    applianceOptions,
    selectedAppliances,
  );
  const availableUtensilOptions = removeSelectedOptions(
    utensilOptions,
    selectedUtensils,
  );
  const hasMainSearch = normalizeText(searchQuery).length >= 3;
  
  const hasSelectedTags =
    selectedIngredients.length > 0 ||
    selectedAppliances.length > 0 ||
    selectedUtensils.length > 0;

  return (
    <>
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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

        <SelectedFilters
          groups={[
            {
              type: "ingredient",
              values: selectedIngredients,
              onRemove: handleIngredientRemove,
            },
            {
              type: "appliance",
              values: selectedAppliances,
              onRemove: handleApplianceRemove,
            },
            {
              type: "utensil",
              values: selectedUtensils,
              onRemove: handleUtensilRemove,
            },
          ]}
        />

        {filteredRecipes.length === 0 && (
          <p className={styles.noResults}>
            {hasMainSearch
              ? `Aucune recette ne contient « ${searchQuery} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`
              : hasSelectedTags
                ? "Aucune recette ne correspond aux filtres sélectionnés."
                : "Aucune recette disponible."}
          </p>
        )}

        <section className={styles.recipeGrid}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </section>
      </main>
    </>
  );
}
