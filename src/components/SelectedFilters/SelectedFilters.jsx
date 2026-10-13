
import styles from "./SelectedFilters.module.css";
/**
 * Affiche les filtres sélectionnés et permet de les supprimer.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {string[]} props.filters - Filtres sélectionnés.
 * @param {Function} props.onRemove - Fonction de suppression.
 */
export default function SelectedFilters({ filters, onRemove }) {
return (
  <>
    {filters.map((filter) => (
      <button
        type="button"
        key={filter}
        className={styles.tag}
        onClick={() => onRemove(filter)}
        aria-label={`Supprimer le filtre ${filter}`}
      >
        <span>{filter}</span>
        <span aria-hidden="true">×</span>
      </button>
    ))}
  </>
);
}