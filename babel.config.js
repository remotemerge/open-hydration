module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        targets: {
          node: 'current'
        }
      }
    ],
  ],
  ignore: ['dist/*', 'playground/*']
};
