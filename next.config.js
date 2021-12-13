const assetPrefix = process.env.NEXT_ASSET_PREFIX ?? "";

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  images: {
    loader: "custom",
  },
  assetPrefix: assetPrefix,
};
