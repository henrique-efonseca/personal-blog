'use client';
import { useRouter, useSearchParams } from 'next/navigation'; // Use the correct import for useRouter in Next.js 13+ app directory
import CardList from '@/components/cardList/CardList';
import styles from './blogPage.module.css';
import Menu from '@/components/menu/Menu';

const BlogPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const cat = searchParams.get('cat');
  const postsPerPage = 5;

  // Function to get the appropriate class name for the category
  const getCategoryClass = (category) => {
    switch (category) {
      case 'technology':
        return styles.technology;
      case 'business':
        return styles.business;
      case 'society':
        return styles.society;
      case 'economics':
        return styles.economics;
      case 'lifestyle':
        return styles.lifestyle;
      case 'meditations':
        return styles.meditations;
      case 'projects':
        return styles.projects;
      default:
        return styles.default;
    }
  };

  const handlePagination = (newPage) => {
    console.log('handlePagination');
    const newURL = cat
      ? `/blog?cat=${cat}&page=${newPage}&postsPerPage=${postsPerPage}`
      : `/blog?page=${newPage}&postsPerPage=${postsPerPage}`;

    console.log('newPage', newPage);
    console.log('newURL', newURL);

    window.location.href = newURL;
    window.scrollTo(0, 0);
  };

  const isMobile = window.innerWidth < 768; // 768px is the breakpoint for mobile devices

  return (
    <div className={`${styles.fullWidthContainer}`}>
      <h1 className={`${styles.title} ${getCategoryClass(cat)}`}>{cat} Blog</h1>
      {isMobile && (
        <div className={styles.fullWidthContainer}>
          <CardList
            className={`${styles.fullWidthContainer}`}
            page={page}
            cat={cat}
            postsPerPage={postsPerPage}
          />
        </div>
      )}

      {!isMobile && (
        <div className={styles.content}>
          <CardList
            className={`${styles.fullWidthContainer}`}
            cat={cat}
            postsPerPage={postsPerPage}
            page={page}
          />
          <div className={styles.menuContainer}>
            <Menu recentPosts={false} />
          </div>
        </div>
      )}

      <div className={styles.pagination}>
        <button
          disabled={page <= 1}
          onClick={() => handlePagination(page - 1)}
          className={styles.pageButton}
        >
          Previous
        </button>
        <span className={styles.pageNumber}>Page {page}</span>
        <button
          onClick={() => handlePagination(page + 1)}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
