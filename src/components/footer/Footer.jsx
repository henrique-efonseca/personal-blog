'use client';

import React, { useContext } from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeContext } from '@/context/ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <div className={styles.separator}></div>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="HF Blog | Henrique Fonseca"
            width={50}
            height={50}
          />
          <h1 className={styles.logoText}>HF Blog</h1>
        </div>
        <p className={styles.desc}>
          Hi, I&apos;m Henrique Fonseca and this is my blog. Here I share my
          projects, experiences and thoughts in areas like technology, business,
          society, economics, lifestyle and philosophy. I don&apos;t consider
          myself an expert in any of these fields, but I love learning about
          different topics and sharing my thoughts with the world.
        </p>

        <div className={styles.rights}>
          <p>
            © {new Date().getFullYear()} Henrique Fonseca. All rights reserved.
          </p>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/blog">Blog</Link>
          <Link href="/blog?cat=projects">Projects</Link>
          <Link href="https://henriquefonseca.me">About</Link>
          <Link href="https://henriquefonseca.me/#contact">Contact</Link>
          <Link href="/login">Login</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/blog?cat=technology">Technology</Link>
          <Link href="/blog?cat=business">Business</Link>
          <Link href="/blog?cat=society">Society</Link>
          <Link href="/blog?cat=economics">Economics</Link>
          <Link href="/blog?cat=lifestyle">Lifestyle</Link>
          <Link href="/blog?cat=meditations">Meditations</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link
            target="_blank"
            href="https://linkedin.com/in/henrique-efonseca"
          >
            LinkedIn
          </Link>
          <Link target="_blank" href="https://github.com/henrique-efonseca">
            Github
          </Link>
          <Link target="_blank" href="https:/youtube.com/@HenriqueFonsecaETH">
            Youtube
          </Link>
          <Link target="_blank" href="https://tiktok.com/@henriquefonseca.eth">
            Tiktok
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
