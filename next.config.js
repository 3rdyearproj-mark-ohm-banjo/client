/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost','sharemybook.ddns.net'],
    loader: 'imgix',
    path: 'https://sharemybook.ddns.net/backend/api',
  },
}

module.exports = nextConfig
