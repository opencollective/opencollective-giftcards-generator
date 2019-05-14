const fs = require('fs');
const path = require('path');
const fileExistsCaseInsensitive = require('react-styleguidist/lib/scripts/utils/findFileCaseInsensitive');

module.exports = {
  assetsDir: 'src/static',
  serverPort: 6061,
  getExampleFilename(componentPath) {
    const parsedPath = path.parse(componentPath);
    const parentDirName = parsedPath.dir.split('src/components/')[1] || '';
    const parentDirPath = path.join(__dirname, 'styleguide', 'examples', parentDirName);

    if (!fs.existsSync(parentDirPath)) {
      return false;
    }

    const examplePath = path.join(parentDirPath, `${parsedPath.name}.md`);
    return fileExistsCaseInsensitive(examplePath) || false;
  },
  pagePerSection: true,
  moduleAliases: {
    components: path.resolve(__dirname, 'src/components'),
  },
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/Wrapper'),
  },
  title: 'Open Collective - Gift Cards Styleguide',
  usageMode: 'expand',
  webpackConfig: {
    resolve: { extensions: ['.js', '.json'] },
    stats: { children: false, chunks: false, modules: false, reasons: false },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
        },
        {
          test: /components\/.*\.(svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1000000,
            },
          },
        },
      ],
    },
  },
};
