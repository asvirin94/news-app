import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

type props = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export default function Categories({
  categories,
  selectedCategory,
  setSelectedCategory,
}: props): JSX.Element {
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <button
          onClick={() => setSelectedCategory(category)}
          key={category}
          className={
            selectedCategory === category ? styles.active : styles.item
          }
        >{category}</button>
      ))}
    </div>
  );
}
