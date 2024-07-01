'use client'; // Add this directive to enable client-side rendering

import React, { useEffect, useState } from 'react';
import styles from './cardList.module.css';
import Card from '../card/Card';

const getData = async (cat, page, postsPerPage) => {
  const res = await fetch(`/api/posts?cat=${cat || ''}&page=${page || 1}&postsPerPage=${postsPerPage || 10}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

const CardList = ({ cat, page, postsPerPage }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { posts: newPosts } = await getData(cat, page, postsPerPage);
        setPosts(newPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
      setLoading(false);
    };

    loadPosts();
  }, [cat]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : posts.length > 0 ? (
          posts.map((item) => <Card item={item} key={item.slug} />)
        ) : (
          <div className={styles.noPostsMessage}>
            {
              "Ups, there's nothing here yet. Guess I should get back to work! 🤔"
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;
