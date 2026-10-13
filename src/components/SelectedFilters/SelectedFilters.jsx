"use client";

import styles from "./SelectedFilters.module.css";

/**
 * COMPOSANT — FILTRES SÉLECTIONNÉS
 * Regroupe le rendu de tous les filtres actifs dans une boucle unique.
 * La page parent reste responsable de leur ajout et de leur suppression.
 */

/**
 * Affiche les filtres actifs et transmet leur retrait au parent.
 *
 * @param {{groups: Array<{type: string, values: string[], onRemove: (value: string) => void}>}} props
 * @returns {import("react").ReactNode} Les boutons des filtres, ou rien si aucun n'est actif.
 */
export default function SelectedFilters({ groups }) {
  if (!groups.some((group) => group.values.length > 0)) {
    return null;
  }

  return (
    <div className={styles.selectedTags} aria-label="Filtres sélectionnés">
      {groups.flatMap(({ type, values, onRemove }) =>
        values.map((value) => (
          <button
            type="button"
            key={`${type}-${value}`}
            className={styles.tag}
            onClick={() => onRemove(value)}
            aria-label={`Supprimer le filtre ${value}`}
          >
            <span>{value}</span>
            <span aria-hidden="true">×</span>
          </button>
        )),
      )}
    </div>
  );
}
