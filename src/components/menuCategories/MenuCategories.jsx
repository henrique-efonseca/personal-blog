'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import styles from './menuCategories.module.css';
import Image from 'next/image';

const getData = async () => {
  const res = await fetch('/api/categories', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
};

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);
  const excludedSlugs = useMemo(() => ['projects', 'experiences'], []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let fetchedCategories = await getData();
        // Filter out categories with specific slugs
        fetchedCategories = fetchedCategories.filter(
          (category) => !excludedSlugs.includes(category.slug),
        );
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [excludedSlugs]);

  return (
    <div className={styles.categoryList}>
      {categories.map((category) => (
        <Link
          href={`/blog?cat=${category.slug}`}
          className={`${styles.categoryItem} ${styles[category.slug]}`}
          key={category._id}
          onClick={() => {
            // Reload the page
            window.location.replace(`/blog?cat=${category.slug}`);
            // Scroll to top when a category is clicked
            window.scrollTo({ top: 0 });
          }}
        >
          {category.img && (
            <Image
              src={category.img}
              alt=""
              width={32}
              height={32}
              className={styles.image}
            />
          )}
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
