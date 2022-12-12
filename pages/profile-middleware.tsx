import { GetServerSideProps } from 'next';
import type { Claims, Session } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import auth0 from '../lib/auth0';

export default function ProfileMiddleware({ user }: { user: Claims }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Profile (MW)</h1>
        <p className={styles.description}>
          &larr; <Link href="/">back</Link>
        </p>
        <pre className={styles.description}>{JSON.stringify(user, null, 2)}</pre>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // This page is protected by middleware, so we know that `getSession` will return a valid Session.
  const { user } = (await auth0().getSession(req, res)) as Session;
  return { props: { user } };
};
