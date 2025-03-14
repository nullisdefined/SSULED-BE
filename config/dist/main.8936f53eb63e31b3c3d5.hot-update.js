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

/***/ "./src/modules/uploads/uploads.controller.ts":
/*!***************************************************!*\
  !*** ./src/modules/uploads/uploads.controller.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UploadsController = void 0;\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst uploads_service_1 = __webpack_require__(/*! ./uploads.service */ \"./src/modules/uploads/uploads.service.ts\");\nconst winston_1 = __webpack_require__(/*! winston */ \"winston\");\nconst s3_service_1 = __webpack_require__(/*! ../s3/s3.service */ \"./src/modules/s3/s3.service.ts\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst delete_image_param_dto_1 = __webpack_require__(/*! ./dto/delete-image-param.dto */ \"./src/modules/uploads/dto/delete-image-param.dto.ts\");\nconst file_interceptor_decorator_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@/decorators/file-interceptor.decorator'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst swagger_decorator_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@/decorators/swagger.decorator'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nlet UploadsController = class UploadsController {\n    constructor(uploadsService, logger, s3Service) {\n        this.uploadsService = uploadsService;\n        this.logger = logger;\n        this.s3Service = s3Service;\n    }\n    async uploadImage(file) {\n        if (!file) {\n            throw new common_1.BadRequestException('이미지 파일을 제공해주세요.');\n        }\n        try {\n            this.logger.info(`이미지 업로드 시작: ${file.originalname}`);\n            const imageUrl = await this.s3Service.uploadImage(file);\n            this.logger.info(`이미지 업로드 완료: ${imageUrl}`);\n            return { message: '이미지가 업로드되었습니다.', imageUrl };\n        }\n        catch (error) {\n            this.logger.error(`이미지 업로드 실패 - ${error.message}`);\n            throw new common_1.BadRequestException(`이미지 업로드 실패: ${error.message}`);\n        }\n    }\n    async deleteImage(params) {\n        try {\n            this.logger.info(`이미지 삭제 시작: ${params.ImageUrl}`);\n            await this.s3Service.deleteImage(params.ImageUrl);\n            this.logger.info(`이미지 삭제 완료: ${params.ImageUrl}`);\n            return {\n                message: '이미지가 삭제되었습니다.',\n            };\n        }\n        catch (error) {\n            this.logger.error(`이미지 삭제 실패 - ${error.message}`);\n            throw new common_1.BadRequestException(`이미지 삭제 실패: ${error.message}`);\n        }\n    }\n};\nexports.UploadsController = UploadsController;\n__decorate([\n    (0, common_1.Post)('image'),\n    (0, swagger_decorator_1.ApiUploadImage)(),\n    (0, file_interceptor_decorator_1.ImageFileInterceptor)('image'),\n    __param(0, (0, common_1.UploadedFile)()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object]),\n    __metadata(\"design:returntype\", Promise)\n], UploadsController.prototype, \"uploadImage\", null);\n__decorate([\n    (0, common_1.Delete)('image/:url'),\n    (0, swagger_decorator_1.ApiDeleteImage)(),\n    __param(0, (0, common_1.Param)()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [delete_image_param_dto_1.DeleteImageParamDto]),\n    __metadata(\"design:returntype\", Promise)\n], UploadsController.prototype, \"deleteImage\", null);\nexports.UploadsController = UploadsController = __decorate([\n    (0, swagger_1.ApiTags)('uploads'),\n    (0, common_1.Controller)('uploads'),\n    __param(1, (0, common_1.Inject)('winston')),\n    __metadata(\"design:paramtypes\", [uploads_service_1.UploadsService,\n        winston_1.Logger,\n        s3_service_1.S3Service])\n], UploadsController);\n\n\n//# sourceURL=webpack://ssu-led-backend/./src/modules/uploads/uploads.controller.ts?");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("254e705d3ec1bd006a35")
/******/ })();
/******/ 
/******/ }
;