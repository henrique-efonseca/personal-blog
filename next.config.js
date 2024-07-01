/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');
const path = require('path');

/**
 * The ENV variable in .env.local is used to override the NODE_ENV variable
 * This is used to determine the env file (development or production) to be used (one might want to use development env file while testing the production build)
 * If ENV is not set, it will default to Nextjs NODE_ENV variable, i.e. development when running next dev and production when running next start
 * */
const env = process.env.ENV || process.env.NODE_ENV;
dotenv.config({ path: path.resolve(__dirname, `config/.env.${env}`) });

const nextConfig = {
  images: {
    // allow images from all domains
    domains: [
      'localhost',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'photographylife.com',
    ],
  },
};

module.exports = nextConfig;
