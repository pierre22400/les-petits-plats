export function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .trim();
}

export function getUniqueValues(values) {
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

export function matchesMainSearch(recipe, searchQuery) {
  const normalizedSearch = normalizeText(searchQuery);

  if (normalizedSearch.length < 3) {
    return true;
  }

  const matchesName = normalizeText(recipe.name).includes(normalizedSearch);

  const matchesDescription = normalizeText(recipe.description).includes(
    normalizedSearch,
  );

  const matchesIngredient = recipe.ingredients.some((ingredient) =>
    normalizeText(ingredient.ingredient).includes(normalizedSearch),
  );

  return matchesName || matchesDescription || matchesIngredient;
}

export function matchesSelectedIngredients(recipe, selectedIngredients) {
  // On vérifie que TOUS les ingrédients sélectionnés par l'utilisateur
  // sont présents dans la recette.
  return selectedIngredients.every((selectedIngredient) =>
    // Pour chaque ingrédient sélectionné,
    // on cherche s'il existe AU MOINS UN ingrédient correspondant
    // dans le tableau recipe.ingredients.
    recipe.ingredients.some(
      (ingredient) =>
        // ingredient.ingredient :
        // nom de l'ingrédient présent dans la recette.
        //
        // selectedIngredient :
        // nom de l'ingrédient sélectionné par l'utilisateur.
        //
        // normalizeText() permet de comparer proprement
        // en neutralisant notamment les différences de casse et d'accents.
        normalizeText(ingredient.ingredient) ===
        normalizeText(selectedIngredient),
    ),
  );
}

export function matchesSelectedAppliances(recipe, selectedAppliances) {
  return selectedAppliances.every(
    (selectedAppliance) =>
      normalizeText(recipe.appliance) === normalizeText(selectedAppliance),
  );
}

export function matchesSelectedUtensils(recipe, selectedUtensils) {
  return selectedUtensils.every((selectedUtensil) =>
    recipe.ustensils.some(
      (utensil) => normalizeText(utensil) === normalizeText(selectedUtensil),
    ),
  );
}

export function filterRecipes(
  recipes,
  { searchQuery, selectedIngredients, selectedAppliances, selectedUtensils },
) {
  return recipes.filter((recipe) => {
    return (
      matchesMainSearch(recipe, searchQuery) &&
      matchesSelectedIngredients(recipe, selectedIngredients) &&
      matchesSelectedAppliances(recipe, selectedAppliances) &&
      matchesSelectedUtensils(recipe, selectedUtensils)
    );
  });
}

export function getIngredientOptions(recipes) {
  return getUniqueValues(
    recipes.flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient),
    ),
  );
}

export function getApplianceOptions(recipes) {
  return getUniqueValues(recipes.map((recipe) => recipe.appliance));
}

export function getUtensilOptions(recipes) {
  return getUniqueValues(recipes.flatMap((recipe) => recipe.ustensils));
}

export function removeSelectedOptions(options, selectedOptions) {
  return options.filter(
    (option) =>
      !selectedOptions.some(
        (selectedOption) =>
          normalizeText(selectedOption) === normalizeText(option),
      ),
  );
}
