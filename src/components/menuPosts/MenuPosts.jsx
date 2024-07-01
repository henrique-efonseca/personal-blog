import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './menuPosts.module.css';

// Function to fetch data from API
const getData = async (cat) => {
  const res = await fetch(`/api/posts?postsPerPage=${5}&category=${cat}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MenuPosts = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(cat);
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cat]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.items}>
      {posts.map((post) => (
        <Link
          href={`/posts/${post.slug}`}
          key={post.slug}
          className={styles.item}
        >
          {post.img && (
            <div className={styles.imageContainer}>
              <Image
                src={post.img}
                alt={post.title}
                fill
                className={styles.image}
              />
            </div>
          )}

          <div className={styles.textContainer}>
            <div className={styles.categories}>
              {/* Display categories for each post */}
              {post.categories?.map((category) => (
                <span
                  key={category.category.id}
                  className={`${styles.category} ${styles[category.category.slug]}`}
                >
                  {category.category.title}
                </span>
              ))}
            </div>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <div className={styles.detail}>
              <span className={styles.username}>{post?.user?.name}</span>
              <span className={styles.date}>
                {' '}
                | {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
