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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst core_1 = __webpack_require__(/*! @nestjs/core */ \"@nestjs/core\");\nconst app_module_1 = __webpack_require__(/*! ./app.module */ \"./src/app.module.ts\");\nconst config_1 = __webpack_require__(/*! @nestjs/config */ \"@nestjs/config\");\nconst nest_winston_1 = __webpack_require__(/*! nest-winston */ \"nest-winston\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nasync function bootstrap() {\n    const app = await core_1.NestFactory.create(app_module_1.AppModule, {\n        logger:  false\n            ? 0\n            : ['error', 'warn', 'log', 'debug', 'verbose'],\n    });\n    const configService = app.get(config_1.ConfigService);\n    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));\n    app.setGlobalPrefix('api');\n    app.useGlobalPipes(new common_1.ValidationPipe({\n        whitelist: true,\n        forbidNonWhitelisted: true,\n        transform: true,\n    }));\n    app.enableCors({\n        origin:  false\n            ? 0\n            : 'http://localhost:5173',\n        credentials: true,\n    });\n    const config = new swagger_1.DocumentBuilder()\n        .setTitle('SSULED API')\n        .setDescription('SSULED API documentation')\n        .setVersion('1.0')\n        .addBearerAuth({\n        type: 'http',\n        scheme: 'bearer',\n        bearerFormat: 'JWT',\n        name: 'Authorization',\n        description: 'Enter JWT token',\n        in: 'header',\n    }, 'JWT-auth')\n        .build();\n    const document = swagger_1.SwaggerModule.createDocument(app, config);\n    swagger_1.SwaggerModule.setup('api/docs', app, document);\n    const port = configService.get('PORT') ?? 7777;\n    await app.listen(port);\n    console.log(`💡SSULED ${port}번 포트에서 실행중입니다.`);\n    if (true) {\n        module.hot.accept();\n        module.hot.dispose(() => app.close());\n    }\n}\nbootstrap();\n\n\n//# sourceURL=webpack://ssu-led-backend/./src/main.ts?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9de55d0e285a9c21b976")
/******/ })();
/******/ 
/******/ }
;