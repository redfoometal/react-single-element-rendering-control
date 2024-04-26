import Posts from "@/components/Posts";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
     <Posts/>
    </main>
  );
}
