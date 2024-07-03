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
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styles from './authLinks.module.css';
import ThemeToggle from '../themeToggle/ThemeToggle';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname(); // Correct usage for app directory
  const dropdownRef = useRef(null);
  const responsiveMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        responsiveMenuRef.current &&
        !responsiveMenuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, responsiveMenuRef]);

  const isMe = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const isWritePage = pathname === '/write'; // Check the current path

  const handleBurgerClick = () => {
    console.log(dropdownOpen);
    setDropdownOpen(!dropdownOpen);
    setOpen(!dropdownOpen);
  };

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
      <div className={styles.burger} onClick={handleBurgerClick}>
        <FontAwesomeIcon icon={open ? faTimes : faBars} size="2x" />
      </div>
      {open && (
        <div ref={responsiveMenuRef} className={styles.responsiveMenu}>
          <Link
            onClick={() => {
              setOpen(false);
              window.location.href = '/';
            }}
            href="/"
          >
            Homepage
          </Link>
          <Link
            onClick={() => {
              setOpen(false);
              window.location.href = '/blog';
            }}
            href="/blog"
          >
            Blog
          </Link>
          <Link
            onClick={() => {
              setOpen(false);
              window.location.href = '/blog?cat=projects';
            }}
            href="/blog?cat=projects"
          >
            Projects
          </Link>

          <Link href="https://henriquefonseca.me">About</Link>
          {status === 'unauthenticated' ? (
            <Link
              onClick={() => {
                setOpen(false);
                window.location.href = '/login';
              }}
              href="/login"
            >
              <b>Login</b>
            </Link>
          ) : (
            <span
              className={styles.link}
              onClick={() => {
                setOpen(false);
                signOut();
              }}
            >
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
