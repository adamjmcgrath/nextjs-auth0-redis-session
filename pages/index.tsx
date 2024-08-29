import styles from '../styles/Home.module.css';
import { useUser } from '@auth0/nextjs-auth0/client';
import auth0 from '../lib/auth0';
import { useEffect } from 'react';

export default function Home({ rt, client_id, client_secret,url }: any) {
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
          <><pre className={styles.description} style={{ width: '80%', overflow: 'hidden' }}>{JSON.stringify(user, null, 2)}</pre>
          <pre className={styles.description} style={{ width: '80%' }}>{`curl --request POST \\
  --url '${url}/oauth/token' \\
  --header 'content-type: application/x-www-form-urlencoded' \\
  --data 'grant_type=refresh_token&client_id=${client_id}&client_secret=${client_secret}&refresh_token=${rt}' | jq`}
              </pre></>
        )}
      </main>
    </div>
  );
}


export const getServerSideProps = async (ctx: any) => {
  // @ts-ignore
  const a0 = auth0();
  // @ts-ignore
  const session = await a0.getSession(ctx.req, ctx.res);
  if (session) {
    return {
      props: {
        rt: (session as any).refreshToken || null,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        url: process.env.AUTH0_ISSUER_BASE_URL
      }
    };
  }
  return { props: {} }
};