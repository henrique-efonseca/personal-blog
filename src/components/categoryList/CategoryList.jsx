'use client';
import React, { useState, useEffect } from 'react';
import styles from './categoryList.module.css';
import Link from 'next/link';
import Image from 'next/image';

const getData = async () => {
  const res = await fetch('/api/categories', {
    cache: 'no-store',
  });


  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

const CategoryList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const excludedSlugs = ['projects', 'experiences']; // Move inside useEffect to avoid the dependency warning

      try {
        let categories = await getData();
        // Filter out categories with specific slugs
        categories = categories.filter(
          (category) => !excludedSlugs.includes(category.slug),
        );
        setData(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []); // No dependencies needed now

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
