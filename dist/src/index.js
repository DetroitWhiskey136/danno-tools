'use strict';
const __createBinding = (this && this.__createBinding) || (Object.create
  ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
  }
  : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  });
const __exportStar = (this && this.__exportStar) || function (m, exports) {
  for (const p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.Colors = exports.Logger = void 0;
const Logger_1 = require('./utils/Logger');
Object.defineProperty(exports, 'Logger', { enumerable: true, get: function () { return Logger_1.Logger; } });
const Colors_1 = require('./features/Colors');
Object.defineProperty(exports, 'Colors', { enumerable: true, get: function () { return Colors_1.Colors; } });
__exportStar(require('./strings/Strings'), exports);
