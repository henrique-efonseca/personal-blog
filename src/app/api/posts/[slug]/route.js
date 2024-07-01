import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

// GET SINGLE POST WITH CATEGORIES
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    // Fetch the post by its ID
    const post = await prisma.post.findUnique({
      where: { slug: slug },
      include: {
        user: true,
        comments: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    // If the post is not found, return a 404 response
    if (!post) {
      return NextResponse.json({ message: 'Post not found!' }, { status: 404 });
    }

    // Extract the categories from the post's categories relation
    const categories = post.categories.map(
      (postCategory) => postCategory.category,
    );

    // Combine the post data with its categories
    const postWithCategories = {
      ...post,
      categories,
    };

    // Return the combined data
    return NextResponse.json(postWithCategories, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 },
    );
  }
};

// UPDATE SINGLE POST
export const PUT = async (req) => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const { title, desc, img, categories } = await req.json();

  try {
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title,
        desc,
        img,
        categories: {
          set: categories.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
      include: {
        user: true,
        comments: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 },
    );
  }
};
