import CardList from '@/components/cardList/CardList';
import styles from './blogPage.module.css';
import Menu from '@/components/menu/Menu';

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

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

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${getCategoryClass(cat)}`}>{cat} Blog</h1>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <div className={styles.menuContainer}>
          <Menu recentPosts={false} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
