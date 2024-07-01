'use client';
import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import removeHtmlTags from '../../utils/removeHtmlTags';

const truncateText = (text, maxLength) => {
  if (text?.length <= maxLength) return text;
  return text?.substring(0, maxLength) + '...';
};

const featuredPost = 'how-i-built-the-uber-of-elderly-care';

const fetchPostData = async () => {
  const res = await fetch(`/api/posts/${featuredPost}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post data');
  }

  return res.json();
};

const Featured = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPostData();
        setData(postData);
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return null; // or return a loading spinner component
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hey, <b> Henrique Fonseca </b> here! Discover my projects, experiences
        and meditations.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src={data?.img}
            alt=""
            layout="fill"
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>{data?.title}</h1>
          <p className={styles.postDesc}>{truncateText(removeHtmlTags(data?.desc), 180)}</p>
          <button
            onClick={() => (window.location.href = `/posts/${featuredPost}`)}
            className={styles.button}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
