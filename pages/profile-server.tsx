import Link from 'next/link';
import type { Claims } from '@auth0/nextjs-auth0';
import styles from '../styles/Home.module.css';
import auth0 from '../lib/auth0';

export default function ProfileServer({ user }: { user: Claims }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Profile (Server)</h1>
        <p className={styles.description}>
          &larr; <Link href="/">back</Link>
        </p>
        <pre className={styles.description}>{JSON.stringify(user, null, 2)}</pre>
      </main>
    </div>
  );
}

export const getServerSideProps = auth0().withPageAuthRequired();
