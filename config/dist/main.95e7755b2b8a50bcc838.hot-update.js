"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "main";
exports.ids = null;
exports.modules = {

/***/ "./src/modules/uploads/uploads.module.ts":
/*!***********************************************!*\
  !*** ./src/modules/uploads/uploads.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UploadsModule = void 0;\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst uploads_service_1 = __webpack_require__(/*! ./uploads.service */ \"./src/modules/uploads/uploads.service.ts\");\nconst uploads_controller_1 = __webpack_require__(/*! ./uploads.controller */ \"./src/modules/uploads/uploads.controller.ts\");\nconst config_1 = __webpack_require__(/*! @nestjs/config */ \"@nestjs/config\");\nlet UploadsModule = class UploadsModule {\n};\nexports.UploadsModule = UploadsModule;\nexports.UploadsModule = UploadsModule = __decorate([\n    (0, common_1.Module)({\n        imports: [config_1.ConfigModule],\n        controllers: [uploads_controller_1.UploadsController],\n        providers: [uploads_service_1.UploadsService, S3Service],\n    })\n], UploadsModule);\n\n\n//# sourceURL=webpack://ssu-led-backend/./src/modules/uploads/uploads.module.ts?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("28b729c1bbe050f0aafa")
/******/ })();
/******/ 
/******/ }
;