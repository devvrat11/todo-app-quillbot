import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>QuillBot Todo App Assignment</h1>

        <p className={styles.description}>
          All instructions are in the{" "}
          <code className={styles.code}>README.md</code>
        </p>

        <div className={styles.grid}>
          <Link href="todos" className={styles.card}>
            <h2>Open Todos App &rarr;</h2>
            <p>
              {/*Find in-depth information about Next.js features and API.*/}
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
