'use strict';

const {
  promisify
} = require('es6-promisify');
const path = require('path');
const mkdirp = promisify(require('mkdirp'));
const spawnp = require('spawnp');

const indexHtmlTpl = require('./tpl/indexHtmlTpl');
const indexJsTpl = require('./tpl/indexJsTpl');
const signalsJsTpl = require('./tpl/signalJsTpl');

const pageSignalActionJsTpl = require('./tpl/pageSignalActionJsTpl');
const pageViewIndexJsTpl = require('./tpl/pageViewIndexJsTpl');
const webpackConfigTpl = require('./tpl/webpackConfigTpl');
const pageViewTpl = require('./tpl/pageViewTpl');
const {
  safeWrite
} = require('../../util');

/**
 *
 * skelton = { // for a SPA module
 *     -asset
 *          index.html
 *     -lib
 *           index.js
 *          -pageView
 *              index.js
 *          -pageSignalAction
 *              index.js
 *          -signals
 * }
 */
module.exports = (options) => {
  const assetDir = path.join(options.webDir, options.assetName || 'asset');
  const libDir = path.join(options.webDir, options.libName || 'lib');

  const indexHtmlPath =
    path.join(assetDir, options.indexName || 'index.html');

  const libIndexJs = path.join(libDir, options.libIndexName || 'index.js');

  options.pageSignalActionMapPath =
    options.pageSignalActionMapPath || './pageSignalAction';
  options.pageViewMapPath = options.pageViewMapPath || './pageView';
  options.defaultPage = options.defaultPage || 'indexPage';

  const pageSignalActionDir = path.join(libDir, options.pageSignalActionMapPath);
  const pageViewDir = path.join(libDir, options.pageViewMapPath);

  const pageSignalActionIndexJs = path.join(pageSignalActionDir, 'index.js');
  const pageViewIndexJs = path.join(pageViewDir, 'index.js');
  const defaultPageViewJs = path.join(pageViewDir, options.defaultPage + '.js');

  const signalsJs = path.join(libDir, options.signalsName || 'signals.js');

  const webpackConfigTplJs = path.join(options.webDir, 'webpack.config.js');

  return mkdirp(options.webDir).then(() => {
    return Promise.all([
      mkdirp(assetDir),

      safeWrite(webpackConfigTplJs, webpackConfigTpl()),

      mkdirp(libDir).then(() => {
        return Promise.all([
          mkdirp(pageSignalActionDir).then(() => {
            return safeWrite(pageSignalActionIndexJs,
              pageSignalActionJsTpl(options));
          }),
          mkdirp(pageViewDir).then(() => {
            return Promise.all([
              safeWrite(pageViewIndexJs, pageViewIndexJsTpl(options)),
              safeWrite(defaultPageViewJs, pageViewTpl())
            ]);
          }),
          safeWrite(signalsJs, signalsJsTpl()),
          safeWrite(libIndexJs, indexJsTpl(options))
        ]);
      }),

      safeWrite(indexHtmlPath, indexHtmlTpl(options))
    ]);
  }).then(() => {
    return installDeps();
  });
};

const installDeps = () => {
  const opts = {
    stdio: 'inherit'
  };

  return [
    () => spawnp('npm', ['i', 'kabanery-lumine', '--save'], opts),
    () => spawnp('npm', ['i', 'webpack', '--save'], opts),
    () => spawnp('npm', ['i', 'webpack-cli', '--save'], opts),
    () => spawnp('npm', ['i', 'babel-core', '--save'], opts),
    () => spawnp('npm', ['i', 'babel-loader', '--save'], opts),
    () => spawnp('npm', ['i', 'babel-plugin-wildcard', '--save'], opts),
    () => spawnp('npm', ['i', 'babel-preset-env', '--save'], opts),
    () => spawnp('npm', ['i', 'babel-preset-react', '--save'], opts),
    () => spawnp('npm', ['i', 'url-loader', '--save'], opts)
  ].reduce((prev, cur) => {
    return prev.then(() => {
      return cur();
    });
  }, Promise.resolve());
};
