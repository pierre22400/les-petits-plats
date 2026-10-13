import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Erreur 404 :(</h1>

      <p>
      La page que vous demandez est introuvable.
      </p>

      <Link href="/">
        Retour aux recettes
      </Link>
    </main>
  );
}