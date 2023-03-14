"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.download = exports.filter = void 0;
var fs = require("fs");
var path = require("path");
var axios = require("axios");
var FormData = require("form-data");
var errorHandle = function (error) {
    if (error.response) {
        console.log("Error Data: ".concat(error.response.data));
        console.log("Error Status: ".concat(error.response.status));
    }
    else if (error.request) {
        console.log("Error Request: ".concat(error.request));
    }
    else {
        console.log("Error Message: ".concat(error.message));
    }
};
/**
 * @param filepath,fileName
 * @desc !UPLOAD IMAGE
 */
var getResponse = function (_a) {
    var location = _a.location;
    return __awaiter(void 0, void 0, void 0, function () {
        var formFile, data, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    formFile = new FormData();
                    formFile.append('file', fs.createReadStream(String(location)));
                    formFile.append('name', 'fileName');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios({
                            method: 'POST',
                            url: process.env.FILTER_UPLOAD,
                            data: formFile,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })];
                case 2:
                    data = (_b.sent()).data;
                    return [2 /*return*/, data];
                case 3:
                    err_1 = _b.sent();
                    console.log();
                    throw new Error('FILTER UPLOAD => ' + err_1);
                case 4: return [2 /*return*/];
            }
        });
    });
};
/**
 * @param photoId,effectId
 * @desc !FILTER IMAGE
 */
var getEffect = function (photoId, effectId) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, data, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formData = new FormData();
                formData.append('photoId', photoId);
                formData.append('effectId', effectId); //"520fdb6592237be077cf99eb"
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios({
                        method: 'POST',
                        url: process.env.FILTER_RENDER,
                        data: formData
                    })];
            case 2:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
            case 3:
                err_2 = _a.sent();
                throw new Error('FILTER APPLY => ' + err_2);
            case 4: return [2 /*return*/];
        }
    });
}); };
var download = function (_a) {
    var url = _a.url, filepath = _a.filepath, fileName = _a.fileName;
    return __awaiter(void 0, void 0, void 0, function () {
        var location_1, response, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!filepath || !fileName) {
                        throw new Error('DOWNLOAD => filepath or fileName is not defined');
                    }
                    ;
                    location_1 = path.join(__dirname, "../../", filepath, fileName);
                    fs.mkdirSync(filepath, { recursive: true });
                    return [4 /*yield*/, axios({
                            method: 'GET',
                            url: url,
                            responseType: 'stream'
                        })];
                case 1:
                    response = _b.sent();
                    response.data.pipe(fs.createWriteStream(location_1));
                    return [2 /*return*/, { location: location_1, fileName: fileName, filepath: filepath }];
                case 2:
                    err_3 = _b.sent();
                    throw new Error('DOWNLOAD => ' + err_3);
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.download = download;
var filter = function (_a) {
    var location = _a.location, filepath = _a.filepath, fileName = _a.fileName, effectId = _a.effectId;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, Promise.resolve()
                    .then(function () { return getResponse({ location: location, fileName: fileName }); })
                    .then(function (data) { return getEffect(data.id, effectId); })
                    .then(function (data) { return download({ url: data.url, filepath: filepath, fileName: fileName }); })
                    .then(function (paths) { return String(paths.location); })["catch"](function (err) {
                    console.log('err');
                    errorHandle(err);
                })];
        });
    });
};
exports.filter = filter;
