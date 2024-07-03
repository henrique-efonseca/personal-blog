'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './singlePage.module.css';
import Comments from '@/components/comments/Comments';
import Menu from '@/components/menu/Menu';

const fetchPostData = async (slug) => {
  const res = await fetch(`/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post data');
  }

  return res.json();
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const SinglePage = ({ params }) => {
  const { slug } = params;
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPostData(slug);
        setData(postData);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [slug]);

  // Update the document title with the post title
  useEffect(() => {
    // Update the document title with the post title
    if (data?.title) {
      document.title = `HF Blog | ${data.title}`;
    }
  }, [data]);

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to delete the post');
    }
  };

  const isOwner = session?.user?.email === data?.user?.email;

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.categories}>
          {data?.categories?.map((category) => (
            <span
              key={category.id}
              className={`${styles.category} ${styles[category.slug]}`}
            >
              {category.title}
            </span>
          ))}
        </div>
        <h1 className={styles.title}>{data?.title}</h1>

        <div className={styles.userTextContainer}>
          <span className={styles.user}>{data?.user?.name} | </span>

          <span className={styles.user}> {formatDate(data?.createdAt)}</span>
        </div>
        <div className={styles.user}></div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      {isOwner && (
        <div className={styles.actions}>
          <Link href={`/edit/${slug}`} className={styles.editButton}>
            Edit
          </Link>
          <button
            className={styles.deleteButton}
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={data?.slug} postId={data?.id} />
          </div>
        </div>
        <div className={styles.sidebar}>
          <Menu recentPosts={true} categories={false} />
        </div>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="confirmDelete"
                className={styles.checkbox}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="confirmDelete">
                I understand this action cannot be undone
              </label>
            </div>
            <div className={styles.modalButtons}>
              <button
                className={styles.confirmButton}
                onClick={handleDelete}
                disabled={!isChecked} // Disable confirm button if checkbox is not checked
              >
                Confirm
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
