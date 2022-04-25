@@ -14,4 +14,13 @@ module.exports = {
  patterns: [{ from: 'public' }],
}),
],
module: {
rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: ['babel-loader']
    }
]
}
};
