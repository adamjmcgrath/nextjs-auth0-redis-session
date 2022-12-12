import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          {(user && (
            <>
              You are logged in as <strong>{user.name}</strong>
            </>
          )) || (
            <>
              Click here to <a href="/api/auth/login">log in</a>
            </>
          )}
        </p>

        {user && (
          <div className={styles.grid}>
            <Link href="/profile-middleware" className={styles.card}>
              <h2>Profile (MW) &rarr;</h2>
              <p>Server Side Rendered (protected by Middleware).</p>
            </Link>

            <Link href="/profile-server" className={styles.card}>
              <h2>Profile (Server) &rarr;</h2>
              <p>
                Server Side Rendered (with <code>getServerSideProps</code>).
              </p>
            </Link>

            <Link href="profile-client" className={styles.card}>
              <h2>Profile (Client) &rarr;</h2>
              <p>Client Side Rendered.</p>
            </Link>

            <a href="/api/auth/logout" className={styles.card}>
              <h2>Logout &rarr;</h2>
              <p>Remove the session.</p>
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
