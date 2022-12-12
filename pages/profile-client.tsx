import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function ProfileClient() {
  const { user } = useUser();

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
});
