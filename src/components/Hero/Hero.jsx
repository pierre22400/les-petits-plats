import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <header className={styles.hero}>
            <div className={styles.logo}>
                LES PETITS PLATS
            </div>

            <h1 className={styles.title}>
                Découvrez nos recettes du quotidien, simples et délicieuses
            </h1>

            <SearchBar />
        </header>
    );
}
