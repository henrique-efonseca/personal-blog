'use client';
import React from 'react';
import { usePathname } from 'next/navigation'; // Correct import for app directory
import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AuthLinks from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToggle/ThemeToggle';

const Navbar = () => {
  const pathname = usePathname(); // Correct usage for app directory

  const isBlogPage = pathname === '/blog'; // Check the current path

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.png"
          alt="HF Blog | Henrique Fonseca"
          width={50}
          height={50}
          onClick={() => {
            window.location.href = '/';
          }}
        />
        <span>HF Blog</span>
      </Link>
      <div className={styles.links}>
        <div className={styles.hideOnMobile}>
          <ThemeToggle />
        </div>
        <Link
          href="/blog"
          className={`${styles.link} ${isBlogPage ? styles.activeLink : ''}`}
          onClick={() => {
            // force the page to reload
            window.open('/blog', '_self');
          }}
        >
          Blog
        </Link>
        <Link
          href="/blog?cat=projects"
          className={`${styles.link} ${isBlogPage ? styles.activeLink : ''}`}
          onClick={() => {
            window.open('/blog?cat=projects', '_self');
          }}
        >
          Projects
        </Link>
        <Link href="http://localhost:3000" className={styles.link}>
          About
        </Link>

        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
