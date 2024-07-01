'use client';
import { signIn, useSession } from 'next-auth/react';
import styles from './loginPage.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faLinkedin,
  faFacebook,
  faGithub,
  faApple,
} from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState({
    google: false,
    linkedin: false,
    facebook: false,
    github: false,
    apple: false,
  });

  const handleSignIn = (provider) => {
    setLoading((prev) => ({ ...prev, [provider]: true }));
    signIn(provider);
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Login</h1>
        <button
          className={`${styles.socialButton} ${styles.google}`}
          onClick={() => handleSignIn('google')}
          disabled={loading.google}
        >
          {loading.google ? (
            <div className={styles.spinner}></div>
          ) : (
            <>
              <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
              Login with Google
            </>
          )}
        </button>

        <button
          className={`${styles.socialButton} ${styles.linkedin}`}
          onClick={() => handleSignIn('linkedin')}
          disabled={loading.linkedin}
        >
          {loading.linkedin ? (
            <div className={styles.spinner}></div>
          ) : (
            <>
              <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
              Login with LinkedIn
            </>
          )}
        </button>
        <button
          className={`${styles.socialButton} ${styles.github}`}
          onClick={() => handleSignIn('github')}
          disabled={loading.github}
        >
          {loading.github ? (
            <div className={styles.spinner}></div>
          ) : (
            <>
              <FontAwesomeIcon icon={faGithub} className={styles.icon} />
              Login with Github
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
