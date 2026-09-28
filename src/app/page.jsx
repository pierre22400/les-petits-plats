"use client";

import { useState } from "react";

import styles from "./page.module.css";

import Hero from "@/components/Hero/Hero";
import FilterDropdown from "@/components/FilterDropdown/FilterDropdown";
import RecipeCard from "@/components/RecipeCard/RecipeCard";

import recipes from "@/data/recipes.json";

import {
  filterRecipes,
  getIngredientOptions,
  getApplianceOptions,
  getUtensilOptions,
  normalizeText,
  removeSelectedOptions
} from "@/utils/search";


export default function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [selectedUtensils, setSelectedUtensils] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


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


  const filteredRecipes = filterRecipes(
    recipes,
    {
      searchQuery,
      selectedIngredients,
      selectedAppliances,
      selectedUtensils
    }
  );


  const ingredientOptions =
    getIngredientOptions(filteredRecipes);

  const applianceOptions =
    getApplianceOptions(filteredRecipes);

  const utensilOptions =
    getUtensilOptions(filteredRecipes);


  const availableIngredientOptions =
    removeSelectedOptions(
      ingredientOptions,
      selectedIngredients
    );

  const availableApplianceOptions =
    removeSelectedOptions(
      applianceOptions,
      selectedAppliances
    );

  const availableUtensilOptions =
    removeSelectedOptions(
      utensilOptions,
      selectedUtensils
    );


  const hasMainSearch =
    normalizeText(searchQuery).length >= 3;

  const hasSelectedTags =
    selectedIngredients.length > 0 ||
    selectedAppliances.length > 0 ||
    selectedUtensils.length > 0;


  return (
    <>
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

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
              onClick={() =>
                handleIngredientRemove(ingredient)
              }
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
              onClick={() =>
                handleApplianceRemove(appliance)
              }
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
              onClick={() =>
                handleUtensilRemove(utensil)
              }
              aria-label={`Supprimer le filtre ${utensil}`}
            >
              <span>{utensil}</span>
              <span aria-hidden="true">×</span>
            </button>
          ))}
        </div>


        {filteredRecipes.length === 0 && (
          <p className={styles.noResults}>
            {hasMainSearch
              ? `Aucune recette ne contient « ${searchQuery} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`
              : hasSelectedTags
                ? "Aucune recette ne correspond aux filtres sélectionnés."
                : "Aucune recette disponible."
            }
          </p>
        )}


        <section className={styles.recipeGrid}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
            />
          ))}
        </section>
      </main>
    </>
  );
}