const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  basePath,
  images: {
    loader: "custom",
  },
  trailingSlash: true,
};
