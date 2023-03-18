const { i18n } = require("./next-i18next.config.js")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  env: {
    TELEGRAM_BOT_TOKEN: "6066946311:AAEb-KiQE2ZvhF9LW4AZjn6uA_tTiaQUQlM",
    TELEGRAM_BOT_CHAT_ID: 1116530358,
  }
}

module.exports = nextConfig