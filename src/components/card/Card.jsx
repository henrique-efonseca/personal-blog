import Image from 'next/image';
import styles from './card.module.css';
import Link from 'next/link';

const Card = ({ item }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.container}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Link href={`/posts/${item.slug}`}>
            <Image
              src={item.img}
              alt=""
              width={350}
              height={350}
              className={styles.image}
            />
          </Link>
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.categories}>
          {item.categories?.map((category) => (
            <span
              key={category.category.id}
              className={`${styles.category} ${styles[category.category.slug]}`}
            >
              {category.category.title}
            </span>
          ))}
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1 className={styles.title}>{item.title}</h1>
        </Link>
        <div className={styles.details}>
          <span className={styles.date}>{formatDate(item.createdAt)}</span>
        </div>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: `${item?.desc.substring(0, 120)}...`,
          }}
        />
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
