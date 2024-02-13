/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [{ protocol: "https", hostname: "i.imgur.com" }, {protocol:'https', hostname:'images.pexels.com'},  {protocol:'https', hostname:'img.freepik.com'}],
    },
  };
  
  export default nextConfig;