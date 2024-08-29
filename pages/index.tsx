import styles from '../styles/Home.module.css';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

export default function Home() {
  const { user, checkSession } = useUser();

  useEffect(() => {
    if (!user) return
    const timer = setTimeout(() => {
      checkSession();
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          UAL Demo
        </h1>

        <p className={styles.description}>
          {(user && (
            <>
              You are logged in as <strong>{user.name}</strong><br/>
              Click here to <a href="/api/auth/logout">log out</a>
            </>
          )) || (
            <>
              Click here to <a href="/api/auth/login">log in</a>
            </>
          )}
        </p>

        {user && (
          <pre className={styles.description}>{JSON.stringify(user, null, 2)}</pre>
        )}
      </main>
    </div>
  );
}
