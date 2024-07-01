import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get('page') || 1;
  const cat = searchParams.get('cat');
  const postsPerPage = searchParams.get('postsPerPage');

  const POST_PER_PAGE = postsPerPage ? parseInt(postsPerPage) : 20;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {},
    include: {
      user: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  };

  if (cat) {
    query.where = {
      categories: {
        some: {
          category: {
            slug: cat, // Filter by category slug
          },
        },
      },
    };
  }

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    console.error('Error fetching posts:', err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, { status: 500 }),
    );
  }
};
