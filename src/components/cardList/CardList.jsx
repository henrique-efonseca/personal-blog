'use client'; // Add this directive to enable client-side rendering

import React, { useEffect, useState } from 'react';
import styles from './cardList.module.css';
import Card from '../card/Card';

const getData = async (page, cat) => {
  const res = await fetch(`/api/posts?page=${page}&cat=${cat || ''}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

const CardList = ({ page = 1, cat, maxPosts }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    const loadPosts = async () => {
      if (!hasMore) {
        return; // No need to load more if hasMore is false
      }

      setLoading(true);
      try {
        const { posts: newPosts, count } = await getData(currentPage, cat);

        // Update posts and hasMore based on new data
        if (Array.isArray(newPosts)) {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          setHasMore(
            newPosts.length > 0 &&
              newPosts.length * currentPage < count &&
              posts.length + newPosts.length < maxPosts,
          );
        } else {
          console.error('newPosts is not an array', newPosts);
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
      }
      setLoading(false);
    };

    loadPosts();
  }, [currentPage, cat, maxPosts, posts.length, hasMore]); // Include hasMore in dependencies

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading // Check if loading is false before fetching more
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]); // Only listen to changes in loading state for scroll event

  const displayedPosts = posts.slice(0, maxPosts);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {displayedPosts.length > 0
          ? displayedPosts.map((item) => <Card item={item} key={item.slug} />)
          : !loading && (
              <div className={styles.noPostsMessage}>
                {
                  "Ups, there's nothing here yet. Guess I should get back to work! 🤔"
                }
              </div>
            )}
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
    </div>
  );
};

export default CardList;
