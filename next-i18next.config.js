const path = require("path")

module.exports = {
  i18n: {
    locales: ["ckb", "en"],
    localeDetection: false,
    defaultLocale: "ckb",
    localePath: path.resolve('./public/locales')
  },
  returnNull: false,
}