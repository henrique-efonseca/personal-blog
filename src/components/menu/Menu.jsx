'use client';
import React from 'react';
import styles from './menu.module.css';
import Link from 'next/link';
import Image from 'next/image';
import MenuPosts from '../menuPosts/MenuPosts';
import MenuCategories from '../menuCategories/MenuCategories';

const Menu = ({ recentPosts = true, categories = true }) => {
  return (
    <div className={styles.container}>
      {categories && (
        <div className={styles.section}>
          <h2 className={styles.subtitle}>Discover by topic</h2>
          <h1 className={styles.title}>Categories</h1>
          <MenuCategories />
        </div>
      )}
      {recentPosts && (
        <div className={styles.section}>
          <h2 className={styles.subtitle}>{"What's hot"}</h2>
          <h1 className={styles.title}>Recent Posts</h1>
          <MenuPosts withImage={true} />
        </div>
      )}
    </div>
  );
};

export default Menu;
