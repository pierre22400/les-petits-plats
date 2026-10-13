import Link from "next/link";
import styles from "./not-found.module.css";

/**
 * PAGE 404 GLOBALE — Les Petits Plats
 * Utilisée par Next.js pour les URL inconnues et les recettes introuvables
 * lorsque la page dynamique appelle notFound().
 */

/**
 * Affiche un message d'erreur homogène et un retour à l'accueil.
 *
 * @returns {import("react").ReactNode} La page 404 commune à l'application.
 */
export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Erreur 404</h1>
        <p className={styles.message}>
          La page que tu recherches est introuvable.
        </p>
        <Link href="/" className={styles.homeLink}>
          Retour aux recettes
        </Link>
      </div>
    </main>
  );
}
