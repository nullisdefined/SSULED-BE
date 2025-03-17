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

/***/ "./src/decorators/swagger.decorator.ts":
/*!*********************************************!*\
  !*** ./src/decorators/swagger.decorator.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ApiUploadImage = ApiUploadImage;\nexports.ApiDeleteImage = ApiDeleteImage;\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst upload_response_dto_1 = __webpack_require__(/*! ../modules/uploads/dto/upload-response.dto */ \"./src/modules/uploads/dto/upload-response.dto.ts\");\nfunction ApiUploadImage() {\n    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({\n        summary: '이미지 업로드',\n        description: 'S3 Bucket에 이미지 파일을 업로드합니다.',\n    }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({\n        schema: {\n            type: 'object',\n            properties: {\n                image: {\n                    type: 'string',\n                    format: 'binary',\n                    description: '업로드할 이미지 파일 (jpg, jpeg, png, gif만 가능)',\n                },\n            },\n        },\n    }), (0, swagger_1.ApiResponse)({\n        status: 201,\n        description: '이미지가 성공적으로 업로드됨',\n        type: upload_response_dto_1.UploadResponseDto,\n        schema: {\n            example: {\n                message: '이미지가 업로드되었습니다.',\n                imageUrl: 'https://example-bucket.s3.amazonaws.com/images/example-image.jpg',\n            },\n        },\n    }), (0, swagger_1.ApiResponse)({\n        status: 400,\n        description: '잘못된 요청',\n        schema: {\n            type: 'object',\n            properties: {\n                message: {\n                    type: 'string',\n                    example: '이미지 업로드 실패: The bucket does not allow ACLs',\n                },\n                error: {\n                    type: 'string',\n                    example: 'Bad Request',\n                },\n                statusCode: {\n                    type: 'number',\n                    example: 400,\n                },\n            },\n        },\n    }));\n}\nfunction ApiDeleteImage() {\n    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({\n        summary: '이미지 삭제',\n        description: '업로드된 이미지를 S3에서 삭제합니다.',\n    }), (0, swagger_1.ApiParam)({\n        name: 'url',\n        description: '삭제할 이미지 URL',\n        required: true,\n    }), (0, swagger_1.ApiResponse)({\n        status: 200,\n        description: '이미지가 성공적으로 삭제됨',\n        schema: {\n            type: 'object',\n            properties: {\n                message: {\n                    type: 'string',\n                    example: '이미지가 삭제되었습니다.',\n                },\n            },\n        },\n    }), (0, swagger_1.ApiResponse)({\n        status: 400,\n        description: '잘못된 요청',\n        schema: {\n            type: 'object',\n            properties: {\n                message: {\n                    type: 'string',\n                    example: '이미지 삭제 실패: The specified key does not exist',\n                },\n                error: {\n                    type: 'string',\n                    example: 'Bad Request',\n                },\n                statusCode: {\n                    type: 'number',\n                    example: 400,\n                },\n            },\n        },\n    }));\n}\n\n\n//# sourceURL=webpack://ssu-led-backend/./src/decorators/swagger.decorator.ts?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("af71b54c655f62e09c57")
/******/ })();
/******/ 
/******/ }
;