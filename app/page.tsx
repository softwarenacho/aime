import Camera from './_components/Camera';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <header>
        <h1>AI Video Capture</h1>
      </header>
      <main className={styles.main}>
        <h1>AI.me</h1>
        <Camera />
        {/* <Filters /> */}
      </main>
    </>
  );
}
