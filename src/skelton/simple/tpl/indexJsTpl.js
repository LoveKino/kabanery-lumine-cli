module.exports = ({
  pageSignalActionMapPath = './pageSignalAction',
  pageViewMapPath = './pageView',
  apiStubPath,
  defaultPage
}) => {
  return `'use strict';

const {
  SPA
} = require('kabanery-lumine/lib/page/flowPfcSPA');
const pageSignalActionMap = require('${pageSignalActionMapPath}');
const pageViewMap = require('${pageViewMapPath}');
${apiStubPath ? 'const apiStub = require(\'../../common/apiStub\');' : ''}

SPA({
  ${apiStubPath ? 'apiStub,' : ''}
  pageViewMap,
  pageSignalActionMap,
  pageOptionsMap: {
    ${defaultPage}: {
        localStateStore: false,
        localStateStoreWhiteList: []
    }
  },
  defaultPage: '${defaultPage}'
});`;
};
