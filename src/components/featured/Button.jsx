'use client';

import React from 'react';
import styles from './featured.module.css';

const ClientSideButton = ({ postSlug }) => {
  return (
    <button
      onClick={() => (window.location.href = `/posts/${postSlug}`)}
      className={styles.button}
    >
      Read More
    </button>
  );
};

export default ClientSideButton;
