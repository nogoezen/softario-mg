/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vos autres configurations existantes
  reactStrictMode: true,
  // ...

  images: {
    domains: ['www.gravatar.com'],
  },
}

module.exports = nextConfig