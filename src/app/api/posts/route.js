import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page')) || 1;
  const cat = searchParams.get('cat');
  const postsPerPage = parseInt(searchParams.get('postsPerPage')) || 10;

  console.log("postsPerPage", postsPerPage);
  console.log("page", page);


  const query = {
    take: postsPerPage,
    skip: postsPerPage * (page - 1),
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

  console.log("query", JSON.stringify(query, null, 2));


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
