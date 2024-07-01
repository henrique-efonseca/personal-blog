'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'; // Correct import for app directory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faSignOutAlt,
  faStar,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import styles from './authLinks.module.css';
import ThemeToggle from '../themeToggle/ThemeToggle';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname(); // Correct usage for app directory
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const isMe = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const isWritePage = pathname === '/write'; // Check the current path

  return (
    <>
      {status === 'unauthenticated' ? (
        <div className={styles.hideOnMobile}>
          <Link href="/login" className={styles.authLink}>
            Login
          </Link>
        </div>
      ) : (
        <>
          <div
            ref={dropdownRef}
            className={styles.avatarContainer}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Image
              width={40}
              height={40}
              src={session?.user?.image || '/default-avatar.png'}
              alt="User Avatar"
              className={styles.avatar}
            />
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                {isMe && (
                  <>
                    <Link href="/favorites" className={styles.link}>
                      <FontAwesomeIcon icon={faStar} className={styles.icon} />
                      Favorites
                    </Link>
                    <Link href="/my-posts" className={styles.link}>
                      <FontAwesomeIcon icon={faList} className={styles.icon} />
                      My Posts
                    </Link>
                    <Link
                      href="/write"
                      className={`${styles.link} ${isWritePage ? styles.activeLink : ''}`}
                    >
                      <FontAwesomeIcon icon={faPen} className={styles.icon} />
                      Write Post
                    </Link>
                  </>
                )}
                <span className={styles.link} onClick={signOut}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className={styles.icon}
                  />
                  Logout
                </span>
              </div>
            )}
          </div>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link
            onClick={() => {
              window.location.href = '/';
            }}
            href="/"
          >
            Homepage
          </Link>
          <Link
            onClick={() => {
              window.location.href = '/blog';
            }}
            href="/blog"
          >
            Blog
          </Link>
          <Link
            onClick={() => {
              window.location.href = '/blog?cat=projects';
            }}
            href="/blog?cat=projects"
          >
            Projects
          </Link>

          <Link href="http://localhost:3001">About</Link>
          {status === 'unauthenticated' ? (
            <Link
              onClick={() => {
                window.location.href = '/login';
              }}
              href="/login"
            >
              <b>Login</b>
            </Link>
          ) : (
            <span className={styles.link} onClick={signOut}>
              Logout
            </span>
          )}
          <ThemeToggle />
        </div>
      )}
    </>
  );
};

export default AuthLinks;
