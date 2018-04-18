'use strict';

module.exports = ({defaultPage}) => `'use strict';
/**
 *  register all pages here in the module
 */
const ${defaultPage} = require('./${defaultPage}');

module.exports = {
  ${defaultPage}
};`;
