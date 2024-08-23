"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/file-selector";
exports.ids = ["vendor-chunks/file-selector"];
exports.modules = {

/***/ "(ssr)/./node_modules/file-selector/dist/es5/file-selector.js":
/*!**************************************************************!*\
  !*** ./node_modules/file-selector/dist/es5/file-selector.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fromEvent: () => (/* binding */ fromEvent)\n/* harmony export */ });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ \"(ssr)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file */ \"(ssr)/./node_modules/file-selector/dist/es5/file.js\");\n\n\nvar FILES_TO_IGNORE = [\n    // Thumbnail cache files for macOS and Windows\n    '.DS_Store',\n    'Thumbs.db' // Windows\n];\n/**\n * Convert a DragEvent's DataTrasfer object to a list of File objects\n * NOTE: If some of the items are folders,\n * everything will be flattened and placed in the same list but the paths will be kept as a {path} property.\n *\n * EXPERIMENTAL: A list of https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle objects can also be passed as an arg\n * and a list of File objects will be returned.\n *\n * @param evt\n */\nfunction fromEvent(evt) {\n    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {\n        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {\n            if (isObject(evt) && isDataTransfer(evt.dataTransfer)) {\n                return [2 /*return*/, getDataTransferFiles(evt.dataTransfer, evt.type)];\n            }\n            else if (isChangeEvt(evt)) {\n                return [2 /*return*/, getInputFiles(evt)];\n            }\n            else if (Array.isArray(evt) && evt.every(function (item) { return 'getFile' in item && typeof item.getFile === 'function'; })) {\n                return [2 /*return*/, getFsHandleFiles(evt)];\n            }\n            return [2 /*return*/, []];\n        });\n    });\n}\nfunction isDataTransfer(value) {\n    return isObject(value);\n}\nfunction isChangeEvt(value) {\n    return isObject(value) && isObject(value.target);\n}\nfunction isObject(v) {\n    return typeof v === 'object' && v !== null;\n}\nfunction getInputFiles(evt) {\n    return fromList(evt.target.files).map(function (file) { return (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file); });\n}\n// Ee expect each handle to be https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle\nfunction getFsHandleFiles(handles) {\n    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {\n        var files;\n        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {\n            switch (_a.label) {\n                case 0: return [4 /*yield*/, Promise.all(handles.map(function (h) { return h.getFile(); }))];\n                case 1:\n                    files = _a.sent();\n                    return [2 /*return*/, files.map(function (file) { return (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file); })];\n            }\n        });\n    });\n}\nfunction getDataTransferFiles(dt, type) {\n    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {\n        var items, files;\n        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    if (!dt.items) return [3 /*break*/, 2];\n                    items = fromList(dt.items)\n                        .filter(function (item) { return item.kind === 'file'; });\n                    // According to https://html.spec.whatwg.org/multipage/dnd.html#dndevents,\n                    // only 'dragstart' and 'drop' has access to the data (source node)\n                    if (type !== 'drop') {\n                        return [2 /*return*/, items];\n                    }\n                    return [4 /*yield*/, Promise.all(items.map(toFilePromises))];\n                case 1:\n                    files = _a.sent();\n                    return [2 /*return*/, noIgnoredFiles(flatten(files))];\n                case 2: return [2 /*return*/, noIgnoredFiles(fromList(dt.files)\n                        .map(function (file) { return (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file); }))];\n            }\n        });\n    });\n}\nfunction noIgnoredFiles(files) {\n    return files.filter(function (file) { return FILES_TO_IGNORE.indexOf(file.name) === -1; });\n}\n// IE11 does not support Array.from()\n// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Browser_compatibility\n// https://developer.mozilla.org/en-US/docs/Web/API/FileList\n// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList\nfunction fromList(items) {\n    if (items === null) {\n        return [];\n    }\n    var files = [];\n    // tslint:disable: prefer-for-of\n    for (var i = 0; i < items.length; i++) {\n        var file = items[i];\n        files.push(file);\n    }\n    return files;\n}\n// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem\nfunction toFilePromises(item) {\n    if (typeof item.webkitGetAsEntry !== 'function') {\n        return fromDataTransferItem(item);\n    }\n    var entry = item.webkitGetAsEntry();\n    // Safari supports dropping an image node from a different window and can be retrieved using\n    // the DataTransferItem.getAsFile() API\n    // NOTE: FileSystemEntry.file() throws if trying to get the file\n    if (entry && entry.isDirectory) {\n        return fromDirEntry(entry);\n    }\n    return fromDataTransferItem(item);\n}\nfunction flatten(items) {\n    return items.reduce(function (acc, files) { return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__read)(acc), false), (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__read)((Array.isArray(files) ? flatten(files) : [files])), false); }, []);\n}\nfunction fromDataTransferItem(item) {\n    var file = item.getAsFile();\n    if (!file) {\n        return Promise.reject(\"\".concat(item, \" is not a File\"));\n    }\n    var fwp = (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file);\n    return Promise.resolve(fwp);\n}\n// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry\nfunction fromEntry(entry) {\n    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {\n        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {\n            return [2 /*return*/, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];\n        });\n    });\n}\n// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry\nfunction fromDirEntry(entry) {\n    var reader = entry.createReader();\n    return new Promise(function (resolve, reject) {\n        var entries = [];\n        function readEntries() {\n            var _this = this;\n            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry/createReader\n            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryReader/readEntries\n            reader.readEntries(function (batch) { return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(_this, void 0, void 0, function () {\n                var files, err_1, items;\n                return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {\n                    switch (_a.label) {\n                        case 0:\n                            if (!!batch.length) return [3 /*break*/, 5];\n                            _a.label = 1;\n                        case 1:\n                            _a.trys.push([1, 3, , 4]);\n                            return [4 /*yield*/, Promise.all(entries)];\n                        case 2:\n                            files = _a.sent();\n                            resolve(files);\n                            return [3 /*break*/, 4];\n                        case 3:\n                            err_1 = _a.sent();\n                            reject(err_1);\n                            return [3 /*break*/, 4];\n                        case 4: return [3 /*break*/, 6];\n                        case 5:\n                            items = Promise.all(batch.map(fromEntry));\n                            entries.push(items);\n                            // Continue reading\n                            readEntries();\n                            _a.label = 6;\n                        case 6: return [2 /*return*/];\n                    }\n                });\n            }); }, function (err) {\n                reject(err);\n            });\n        }\n        readEntries();\n    });\n}\n// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry\nfunction fromFileEntry(entry) {\n    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {\n        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {\n            return [2 /*return*/, new Promise(function (resolve, reject) {\n                    entry.file(function (file) {\n                        var fwp = (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file, entry.fullPath);\n                        resolve(fwp);\n                    }, function (err) {\n                        reject(err);\n                    });\n                })];\n        });\n    });\n}\n//# sourceMappingURL=file-selector.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmlsZS1zZWxlY3Rvci9kaXN0L2VzNS9maWxlLXNlbGVjdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFzRTtBQUM5QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkZBQTZGLE1BQU07QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxXQUFXLGdEQUFTO0FBQ3BCLGVBQWUsa0RBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLGlFQUFpRTtBQUN4STtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsT0FBTyxxREFBYyxTQUFTO0FBQzFGO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0RBQVM7QUFDcEI7QUFDQSxlQUFlLGtEQUFXO0FBQzFCO0FBQ0Esb0ZBQW9GLHFCQUFxQjtBQUN6RztBQUNBO0FBQ0Esc0VBQXNFLE9BQU8scURBQWMsU0FBUztBQUNwRztBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLFdBQVcsZ0RBQVM7QUFDcEI7QUFDQSxlQUFlLGtEQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELDhCQUE4QjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxPQUFPLHFEQUFjLFNBQVM7QUFDN0U7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSwwQ0FBMEMsbURBQW1EO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTyxvREFBYSxDQUFDLG9EQUFhLEtBQUssNkNBQU0sZUFBZSw2Q0FBTSw4REFBOEQ7QUFDaEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxREFBYztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0RBQVM7QUFDcEIsZUFBZSxrREFBVztBQUMxQjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsT0FBTyxnREFBUztBQUNsRTtBQUNBLHVCQUF1QixrREFBVztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYSxJQUFJO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnREFBUztBQUNwQixlQUFlLGtEQUFXO0FBQzFCO0FBQ0E7QUFDQSxrQ0FBa0MscURBQWM7QUFDaEQ7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hlYWx0aGNhcmUvLi9ub2RlX21vZHVsZXMvZmlsZS1zZWxlY3Rvci9kaXN0L2VzNS9maWxlLXNlbGVjdG9yLmpzPzkzN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX19hd2FpdGVyLCBfX2dlbmVyYXRvciwgX19yZWFkLCBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyB0b0ZpbGVXaXRoUGF0aCB9IGZyb20gJy4vZmlsZSc7XG52YXIgRklMRVNfVE9fSUdOT1JFID0gW1xuICAgIC8vIFRodW1ibmFpbCBjYWNoZSBmaWxlcyBmb3IgbWFjT1MgYW5kIFdpbmRvd3NcbiAgICAnLkRTX1N0b3JlJyxcbiAgICAnVGh1bWJzLmRiJyAvLyBXaW5kb3dzXG5dO1xuLyoqXG4gKiBDb252ZXJ0IGEgRHJhZ0V2ZW50J3MgRGF0YVRyYXNmZXIgb2JqZWN0IHRvIGEgbGlzdCBvZiBGaWxlIG9iamVjdHNcbiAqIE5PVEU6IElmIHNvbWUgb2YgdGhlIGl0ZW1zIGFyZSBmb2xkZXJzLFxuICogZXZlcnl0aGluZyB3aWxsIGJlIGZsYXR0ZW5lZCBhbmQgcGxhY2VkIGluIHRoZSBzYW1lIGxpc3QgYnV0IHRoZSBwYXRocyB3aWxsIGJlIGtlcHQgYXMgYSB7cGF0aH0gcHJvcGVydHkuXG4gKlxuICogRVhQRVJJTUVOVEFMOiBBIGxpc3Qgb2YgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ZpbGVTeXN0ZW1IYW5kbGUgb2JqZWN0cyBjYW4gYWxzbyBiZSBwYXNzZWQgYXMgYW4gYXJnXG4gKiBhbmQgYSBsaXN0IG9mIEZpbGUgb2JqZWN0cyB3aWxsIGJlIHJldHVybmVkLlxuICpcbiAqIEBwYXJhbSBldnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21FdmVudChldnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChldnQpICYmIGlzRGF0YVRyYW5zZmVyKGV2dC5kYXRhVHJhbnNmZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGdldERhdGFUcmFuc2ZlckZpbGVzKGV2dC5kYXRhVHJhbnNmZXIsIGV2dC50eXBlKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0NoYW5nZUV2dChldnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGdldElucHV0RmlsZXMoZXZ0KV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGV2dCkgJiYgZXZ0LmV2ZXJ5KGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiAnZ2V0RmlsZScgaW4gaXRlbSAmJiB0eXBlb2YgaXRlbS5nZXRGaWxlID09PSAnZnVuY3Rpb24nOyB9KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBnZXRGc0hhbmRsZUZpbGVzKGV2dCldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFtdXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBpc0RhdGFUcmFuc2Zlcih2YWx1ZSkge1xuICAgIHJldHVybiBpc09iamVjdCh2YWx1ZSk7XG59XG5mdW5jdGlvbiBpc0NoYW5nZUV2dCh2YWx1ZSkge1xuICAgIHJldHVybiBpc09iamVjdCh2YWx1ZSkgJiYgaXNPYmplY3QodmFsdWUudGFyZ2V0KTtcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0KHYpIHtcbiAgICByZXR1cm4gdHlwZW9mIHYgPT09ICdvYmplY3QnICYmIHYgIT09IG51bGw7XG59XG5mdW5jdGlvbiBnZXRJbnB1dEZpbGVzKGV2dCkge1xuICAgIHJldHVybiBmcm9tTGlzdChldnQudGFyZ2V0LmZpbGVzKS5tYXAoZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIHRvRmlsZVdpdGhQYXRoKGZpbGUpOyB9KTtcbn1cbi8vIEVlIGV4cGVjdCBlYWNoIGhhbmRsZSB0byBiZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmlsZVN5c3RlbUZpbGVIYW5kbGVcbmZ1bmN0aW9uIGdldEZzSGFuZGxlRmlsZXMoaGFuZGxlcykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZpbGVzO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbChoYW5kbGVzLm1hcChmdW5jdGlvbiAoaCkgeyByZXR1cm4gaC5nZXRGaWxlKCk7IH0pKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBmaWxlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGZpbGVzLm1hcChmdW5jdGlvbiAoZmlsZSkgeyByZXR1cm4gdG9GaWxlV2l0aFBhdGgoZmlsZSk7IH0pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXREYXRhVHJhbnNmZXJGaWxlcyhkdCwgdHlwZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1zLCBmaWxlcztcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkdC5pdGVtcykgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zID0gZnJvbUxpc3QoZHQuaXRlbXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBpdGVtLmtpbmQgPT09ICdmaWxlJzsgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFjY29yZGluZyB0byBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9kbmQuaHRtbCNkbmRldmVudHMsXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgJ2RyYWdzdGFydCcgYW5kICdkcm9wJyBoYXMgYWNjZXNzIHRvIHRoZSBkYXRhIChzb3VyY2Ugbm9kZSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09ICdkcm9wJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGl0ZW1zXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbChpdGVtcy5tYXAodG9GaWxlUHJvbWlzZXMpKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBmaWxlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5vSWdub3JlZEZpbGVzKGZsYXR0ZW4oZmlsZXMpKV07XG4gICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgbm9JZ25vcmVkRmlsZXMoZnJvbUxpc3QoZHQuZmlsZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChmaWxlKSB7IHJldHVybiB0b0ZpbGVXaXRoUGF0aChmaWxlKTsgfSkpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBub0lnbm9yZWRGaWxlcyhmaWxlcykge1xuICAgIHJldHVybiBmaWxlcy5maWx0ZXIoZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIEZJTEVTX1RPX0lHTk9SRS5pbmRleE9mKGZpbGUubmFtZSkgPT09IC0xOyB9KTtcbn1cbi8vIElFMTEgZG9lcyBub3Qgc3VwcG9ydCBBcnJheS5mcm9tKClcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2Zyb20jQnJvd3Nlcl9jb21wYXRpYmlsaXR5XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmlsZUxpc3Rcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9EYXRhVHJhbnNmZXJJdGVtTGlzdFxuZnVuY3Rpb24gZnJvbUxpc3QoaXRlbXMpIHtcbiAgICBpZiAoaXRlbXMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIgZmlsZXMgPSBbXTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZTogcHJlZmVyLWZvci1vZlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZpbGUgPSBpdGVtc1tpXTtcbiAgICAgICAgZmlsZXMucHVzaChmaWxlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVzO1xufVxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RhdGFUcmFuc2Zlckl0ZW1cbmZ1bmN0aW9uIHRvRmlsZVByb21pc2VzKGl0ZW0pIHtcbiAgICBpZiAodHlwZW9mIGl0ZW0ud2Via2l0R2V0QXNFbnRyeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZnJvbURhdGFUcmFuc2Zlckl0ZW0oaXRlbSk7XG4gICAgfVxuICAgIHZhciBlbnRyeSA9IGl0ZW0ud2Via2l0R2V0QXNFbnRyeSgpO1xuICAgIC8vIFNhZmFyaSBzdXBwb3J0cyBkcm9wcGluZyBhbiBpbWFnZSBub2RlIGZyb20gYSBkaWZmZXJlbnQgd2luZG93IGFuZCBjYW4gYmUgcmV0cmlldmVkIHVzaW5nXG4gICAgLy8gdGhlIERhdGFUcmFuc2Zlckl0ZW0uZ2V0QXNGaWxlKCkgQVBJXG4gICAgLy8gTk9URTogRmlsZVN5c3RlbUVudHJ5LmZpbGUoKSB0aHJvd3MgaWYgdHJ5aW5nIHRvIGdldCB0aGUgZmlsZVxuICAgIGlmIChlbnRyeSAmJiBlbnRyeS5pc0RpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZnJvbURpckVudHJ5KGVudHJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGZyb21EYXRhVHJhbnNmZXJJdGVtKGl0ZW0pO1xufVxuZnVuY3Rpb24gZmxhdHRlbihpdGVtcykge1xuICAgIHJldHVybiBpdGVtcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgZmlsZXMpIHsgcmV0dXJuIF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgX19yZWFkKGFjYyksIGZhbHNlKSwgX19yZWFkKChBcnJheS5pc0FycmF5KGZpbGVzKSA/IGZsYXR0ZW4oZmlsZXMpIDogW2ZpbGVzXSkpLCBmYWxzZSk7IH0sIFtdKTtcbn1cbmZ1bmN0aW9uIGZyb21EYXRhVHJhbnNmZXJJdGVtKGl0ZW0pIHtcbiAgICB2YXIgZmlsZSA9IGl0ZW0uZ2V0QXNGaWxlKCk7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIlwiLmNvbmNhdChpdGVtLCBcIiBpcyBub3QgYSBGaWxlXCIpKTtcbiAgICB9XG4gICAgdmFyIGZ3cCA9IHRvRmlsZVdpdGhQYXRoKGZpbGUpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZndwKTtcbn1cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GaWxlU3lzdGVtRW50cnlcbmZ1bmN0aW9uIGZyb21FbnRyeShlbnRyeSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGVudHJ5LmlzRGlyZWN0b3J5ID8gZnJvbURpckVudHJ5KGVudHJ5KSA6IGZyb21GaWxlRW50cnkoZW50cnkpXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmlsZVN5c3RlbURpcmVjdG9yeUVudHJ5XG5mdW5jdGlvbiBmcm9tRGlyRW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVhZGVyID0gZW50cnkuY3JlYXRlUmVhZGVyKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGVudHJpZXMgPSBbXTtcbiAgICAgICAgZnVuY3Rpb24gcmVhZEVudHJpZXMoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ZpbGVTeXN0ZW1EaXJlY3RvcnlFbnRyeS9jcmVhdGVSZWFkZXJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GaWxlU3lzdGVtRGlyZWN0b3J5UmVhZGVyL3JlYWRFbnRyaWVzXG4gICAgICAgICAgICByZWFkZXIucmVhZEVudHJpZXMoZnVuY3Rpb24gKGJhdGNoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGVzLCBlcnJfMSwgaXRlbXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhYmF0Y2gubGVuZ3RoKSByZXR1cm4gWzMgLypicmVhayovLCA1XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBQcm9taXNlLmFsbChlbnRyaWVzKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmaWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycl8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMgPSBQcm9taXNlLmFsbChiYXRjaC5tYXAoZnJvbUVudHJ5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cmllcy5wdXNoKGl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDb250aW51ZSByZWFkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZEVudHJpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7IH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlYWRFbnRyaWVzKCk7XG4gICAgfSk7XG59XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmlsZVN5c3RlbUZpbGVFbnRyeVxuZnVuY3Rpb24gZnJvbUZpbGVFbnRyeShlbnRyeSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuZmlsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZ3cCA9IHRvRmlsZVdpdGhQYXRoKGZpbGUsIGVudHJ5LmZ1bGxQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZndwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1maWxlLXNlbGVjdG9yLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/file-selector/dist/es5/file-selector.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/file-selector/dist/es5/file.js":
/*!*****************************************************!*\
  !*** ./node_modules/file-selector/dist/es5/file.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   COMMON_MIME_TYPES: () => (/* binding */ COMMON_MIME_TYPES),\n/* harmony export */   toFileWithPath: () => (/* binding */ toFileWithPath)\n/* harmony export */ });\nvar COMMON_MIME_TYPES = new Map([\n    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types\n    ['aac', 'audio/aac'],\n    ['abw', 'application/x-abiword'],\n    ['arc', 'application/x-freearc'],\n    ['avif', 'image/avif'],\n    ['avi', 'video/x-msvideo'],\n    ['azw', 'application/vnd.amazon.ebook'],\n    ['bin', 'application/octet-stream'],\n    ['bmp', 'image/bmp'],\n    ['bz', 'application/x-bzip'],\n    ['bz2', 'application/x-bzip2'],\n    ['cda', 'application/x-cdf'],\n    ['csh', 'application/x-csh'],\n    ['css', 'text/css'],\n    ['csv', 'text/csv'],\n    ['doc', 'application/msword'],\n    ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],\n    ['eot', 'application/vnd.ms-fontobject'],\n    ['epub', 'application/epub+zip'],\n    ['gz', 'application/gzip'],\n    ['gif', 'image/gif'],\n    ['heic', 'image/heic'],\n    ['heif', 'image/heif'],\n    ['htm', 'text/html'],\n    ['html', 'text/html'],\n    ['ico', 'image/vnd.microsoft.icon'],\n    ['ics', 'text/calendar'],\n    ['jar', 'application/java-archive'],\n    ['jpeg', 'image/jpeg'],\n    ['jpg', 'image/jpeg'],\n    ['js', 'text/javascript'],\n    ['json', 'application/json'],\n    ['jsonld', 'application/ld+json'],\n    ['mid', 'audio/midi'],\n    ['midi', 'audio/midi'],\n    ['mjs', 'text/javascript'],\n    ['mp3', 'audio/mpeg'],\n    ['mp4', 'video/mp4'],\n    ['mpeg', 'video/mpeg'],\n    ['mpkg', 'application/vnd.apple.installer+xml'],\n    ['odp', 'application/vnd.oasis.opendocument.presentation'],\n    ['ods', 'application/vnd.oasis.opendocument.spreadsheet'],\n    ['odt', 'application/vnd.oasis.opendocument.text'],\n    ['oga', 'audio/ogg'],\n    ['ogv', 'video/ogg'],\n    ['ogx', 'application/ogg'],\n    ['opus', 'audio/opus'],\n    ['otf', 'font/otf'],\n    ['png', 'image/png'],\n    ['pdf', 'application/pdf'],\n    ['php', 'application/x-httpd-php'],\n    ['ppt', 'application/vnd.ms-powerpoint'],\n    ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],\n    ['rar', 'application/vnd.rar'],\n    ['rtf', 'application/rtf'],\n    ['sh', 'application/x-sh'],\n    ['svg', 'image/svg+xml'],\n    ['swf', 'application/x-shockwave-flash'],\n    ['tar', 'application/x-tar'],\n    ['tif', 'image/tiff'],\n    ['tiff', 'image/tiff'],\n    ['ts', 'video/mp2t'],\n    ['ttf', 'font/ttf'],\n    ['txt', 'text/plain'],\n    ['vsd', 'application/vnd.visio'],\n    ['wav', 'audio/wav'],\n    ['weba', 'audio/webm'],\n    ['webm', 'video/webm'],\n    ['webp', 'image/webp'],\n    ['woff', 'font/woff'],\n    ['woff2', 'font/woff2'],\n    ['xhtml', 'application/xhtml+xml'],\n    ['xls', 'application/vnd.ms-excel'],\n    ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],\n    ['xml', 'application/xml'],\n    ['xul', 'application/vnd.mozilla.xul+xml'],\n    ['zip', 'application/zip'],\n    ['7z', 'application/x-7z-compressed'],\n    // Others\n    ['mkv', 'video/x-matroska'],\n    ['mov', 'video/quicktime'],\n    ['msg', 'application/vnd.ms-outlook']\n]);\nfunction toFileWithPath(file, path) {\n    var f = withMimeType(file);\n    if (typeof f.path !== 'string') { // on electron, path is already set to the absolute path\n        var webkitRelativePath = file.webkitRelativePath;\n        Object.defineProperty(f, 'path', {\n            value: typeof path === 'string'\n                ? path\n                // If <input webkitdirectory> is set,\n                // the File will have a {webkitRelativePath} property\n                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory\n                : typeof webkitRelativePath === 'string' && webkitRelativePath.length > 0\n                    ? webkitRelativePath\n                    : file.name,\n            writable: false,\n            configurable: false,\n            enumerable: true\n        });\n    }\n    return f;\n}\nfunction withMimeType(file) {\n    var name = file.name;\n    var hasExtension = name && name.lastIndexOf('.') !== -1;\n    if (hasExtension && !file.type) {\n        var ext = name.split('.')\n            .pop().toLowerCase();\n        var type = COMMON_MIME_TYPES.get(ext);\n        if (type) {\n            Object.defineProperty(file, 'type', {\n                value: type,\n                writable: false,\n                configurable: false,\n                enumerable: true\n            });\n        }\n    }\n    return file;\n}\n//# sourceMappingURL=file.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmlsZS1zZWxlY3Rvci9kaXN0L2VzNS9maWxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLG9CQUFvQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVhbHRoY2FyZS8uL25vZGVfbW9kdWxlcy9maWxlLXNlbGVjdG9yL2Rpc3QvZXM1L2ZpbGUuanM/YTljOSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIENPTU1PTl9NSU1FX1RZUEVTID0gbmV3IE1hcChbXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9CYXNpY3Nfb2ZfSFRUUC9NSU1FX3R5cGVzL0NvbW1vbl90eXBlc1xuICAgIFsnYWFjJywgJ2F1ZGlvL2FhYyddLFxuICAgIFsnYWJ3JywgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCddLFxuICAgIFsnYXJjJywgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYyddLFxuICAgIFsnYXZpZicsICdpbWFnZS9hdmlmJ10sXG4gICAgWydhdmknLCAndmlkZW8veC1tc3ZpZGVvJ10sXG4gICAgWydhencnLCAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vayddLFxuICAgIFsnYmluJywgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSddLFxuICAgIFsnYm1wJywgJ2ltYWdlL2JtcCddLFxuICAgIFsnYnonLCAnYXBwbGljYXRpb24veC1iemlwJ10sXG4gICAgWydiejInLCAnYXBwbGljYXRpb24veC1iemlwMiddLFxuICAgIFsnY2RhJywgJ2FwcGxpY2F0aW9uL3gtY2RmJ10sXG4gICAgWydjc2gnLCAnYXBwbGljYXRpb24veC1jc2gnXSxcbiAgICBbJ2NzcycsICd0ZXh0L2NzcyddLFxuICAgIFsnY3N2JywgJ3RleHQvY3N2J10sXG4gICAgWydkb2MnLCAnYXBwbGljYXRpb24vbXN3b3JkJ10sXG4gICAgWydkb2N4JywgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50J10sXG4gICAgWydlb3QnLCAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnXSxcbiAgICBbJ2VwdWInLCAnYXBwbGljYXRpb24vZXB1Yit6aXAnXSxcbiAgICBbJ2d6JywgJ2FwcGxpY2F0aW9uL2d6aXAnXSxcbiAgICBbJ2dpZicsICdpbWFnZS9naWYnXSxcbiAgICBbJ2hlaWMnLCAnaW1hZ2UvaGVpYyddLFxuICAgIFsnaGVpZicsICdpbWFnZS9oZWlmJ10sXG4gICAgWydodG0nLCAndGV4dC9odG1sJ10sXG4gICAgWydodG1sJywgJ3RleHQvaHRtbCddLFxuICAgIFsnaWNvJywgJ2ltYWdlL3ZuZC5taWNyb3NvZnQuaWNvbiddLFxuICAgIFsnaWNzJywgJ3RleHQvY2FsZW5kYXInXSxcbiAgICBbJ2phcicsICdhcHBsaWNhdGlvbi9qYXZhLWFyY2hpdmUnXSxcbiAgICBbJ2pwZWcnLCAnaW1hZ2UvanBlZyddLFxuICAgIFsnanBnJywgJ2ltYWdlL2pwZWcnXSxcbiAgICBbJ2pzJywgJ3RleHQvamF2YXNjcmlwdCddLFxuICAgIFsnanNvbicsICdhcHBsaWNhdGlvbi9qc29uJ10sXG4gICAgWydqc29ubGQnLCAnYXBwbGljYXRpb24vbGQranNvbiddLFxuICAgIFsnbWlkJywgJ2F1ZGlvL21pZGknXSxcbiAgICBbJ21pZGknLCAnYXVkaW8vbWlkaSddLFxuICAgIFsnbWpzJywgJ3RleHQvamF2YXNjcmlwdCddLFxuICAgIFsnbXAzJywgJ2F1ZGlvL21wZWcnXSxcbiAgICBbJ21wNCcsICd2aWRlby9tcDQnXSxcbiAgICBbJ21wZWcnLCAndmlkZW8vbXBlZyddLFxuICAgIFsnbXBrZycsICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCddLFxuICAgIFsnb2RwJywgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQucHJlc2VudGF0aW9uJ10sXG4gICAgWydvZHMnLCAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5zcHJlYWRzaGVldCddLFxuICAgIFsnb2R0JywgJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dCddLFxuICAgIFsnb2dhJywgJ2F1ZGlvL29nZyddLFxuICAgIFsnb2d2JywgJ3ZpZGVvL29nZyddLFxuICAgIFsnb2d4JywgJ2FwcGxpY2F0aW9uL29nZyddLFxuICAgIFsnb3B1cycsICdhdWRpby9vcHVzJ10sXG4gICAgWydvdGYnLCAnZm9udC9vdGYnXSxcbiAgICBbJ3BuZycsICdpbWFnZS9wbmcnXSxcbiAgICBbJ3BkZicsICdhcHBsaWNhdGlvbi9wZGYnXSxcbiAgICBbJ3BocCcsICdhcHBsaWNhdGlvbi94LWh0dHBkLXBocCddLFxuICAgIFsncHB0JywgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50J10sXG4gICAgWydwcHR4JywgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24nXSxcbiAgICBbJ3JhcicsICdhcHBsaWNhdGlvbi92bmQucmFyJ10sXG4gICAgWydydGYnLCAnYXBwbGljYXRpb24vcnRmJ10sXG4gICAgWydzaCcsICdhcHBsaWNhdGlvbi94LXNoJ10sXG4gICAgWydzdmcnLCAnaW1hZ2Uvc3ZnK3htbCddLFxuICAgIFsnc3dmJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ10sXG4gICAgWyd0YXInLCAnYXBwbGljYXRpb24veC10YXInXSxcbiAgICBbJ3RpZicsICdpbWFnZS90aWZmJ10sXG4gICAgWyd0aWZmJywgJ2ltYWdlL3RpZmYnXSxcbiAgICBbJ3RzJywgJ3ZpZGVvL21wMnQnXSxcbiAgICBbJ3R0ZicsICdmb250L3R0ZiddLFxuICAgIFsndHh0JywgJ3RleHQvcGxhaW4nXSxcbiAgICBbJ3ZzZCcsICdhcHBsaWNhdGlvbi92bmQudmlzaW8nXSxcbiAgICBbJ3dhdicsICdhdWRpby93YXYnXSxcbiAgICBbJ3dlYmEnLCAnYXVkaW8vd2VibSddLFxuICAgIFsnd2VibScsICd2aWRlby93ZWJtJ10sXG4gICAgWyd3ZWJwJywgJ2ltYWdlL3dlYnAnXSxcbiAgICBbJ3dvZmYnLCAnZm9udC93b2ZmJ10sXG4gICAgWyd3b2ZmMicsICdmb250L3dvZmYyJ10sXG4gICAgWyd4aHRtbCcsICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnXSxcbiAgICBbJ3hscycsICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnXSxcbiAgICBbJ3hsc3gnLCAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnXSxcbiAgICBbJ3htbCcsICdhcHBsaWNhdGlvbi94bWwnXSxcbiAgICBbJ3h1bCcsICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJ10sXG4gICAgWyd6aXAnLCAnYXBwbGljYXRpb24vemlwJ10sXG4gICAgWyc3eicsICdhcHBsaWNhdGlvbi94LTd6LWNvbXByZXNzZWQnXSxcbiAgICAvLyBPdGhlcnNcbiAgICBbJ21rdicsICd2aWRlby94LW1hdHJvc2thJ10sXG4gICAgWydtb3YnLCAndmlkZW8vcXVpY2t0aW1lJ10sXG4gICAgWydtc2cnLCAnYXBwbGljYXRpb24vdm5kLm1zLW91dGxvb2snXVxuXSk7XG5leHBvcnQgZnVuY3Rpb24gdG9GaWxlV2l0aFBhdGgoZmlsZSwgcGF0aCkge1xuICAgIHZhciBmID0gd2l0aE1pbWVUeXBlKGZpbGUpO1xuICAgIGlmICh0eXBlb2YgZi5wYXRoICE9PSAnc3RyaW5nJykgeyAvLyBvbiBlbGVjdHJvbiwgcGF0aCBpcyBhbHJlYWR5IHNldCB0byB0aGUgYWJzb2x1dGUgcGF0aFxuICAgICAgICB2YXIgd2Via2l0UmVsYXRpdmVQYXRoID0gZmlsZS53ZWJraXRSZWxhdGl2ZVBhdGg7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCAncGF0aCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICA/IHBhdGhcbiAgICAgICAgICAgICAgICAvLyBJZiA8aW5wdXQgd2Via2l0ZGlyZWN0b3J5PiBpcyBzZXQsXG4gICAgICAgICAgICAgICAgLy8gdGhlIEZpbGUgd2lsbCBoYXZlIGEge3dlYmtpdFJlbGF0aXZlUGF0aH0gcHJvcGVydHlcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTElucHV0RWxlbWVudC93ZWJraXRkaXJlY3RvcnlcbiAgICAgICAgICAgICAgICA6IHR5cGVvZiB3ZWJraXRSZWxhdGl2ZVBhdGggPT09ICdzdHJpbmcnICYmIHdlYmtpdFJlbGF0aXZlUGF0aC5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgID8gd2Via2l0UmVsYXRpdmVQYXRoXG4gICAgICAgICAgICAgICAgICAgIDogZmlsZS5uYW1lLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBmO1xufVxuZnVuY3Rpb24gd2l0aE1pbWVUeXBlKGZpbGUpIHtcbiAgICB2YXIgbmFtZSA9IGZpbGUubmFtZTtcbiAgICB2YXIgaGFzRXh0ZW5zaW9uID0gbmFtZSAmJiBuYW1lLmxhc3RJbmRleE9mKCcuJykgIT09IC0xO1xuICAgIGlmIChoYXNFeHRlbnNpb24gJiYgIWZpbGUudHlwZSkge1xuICAgICAgICB2YXIgZXh0ID0gbmFtZS5zcGxpdCgnLicpXG4gICAgICAgICAgICAucG9wKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIHR5cGUgPSBDT01NT05fTUlNRV9UWVBFUy5nZXQoZXh0KTtcbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmaWxlLCAndHlwZScsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHlwZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZpbGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/file-selector/dist/es5/file.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/file-selector/dist/es5/index.js":
/*!******************************************************!*\
  !*** ./node_modules/file-selector/dist/es5/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fromEvent: () => (/* reexport safe */ _file_selector__WEBPACK_IMPORTED_MODULE_0__.fromEvent)\n/* harmony export */ });\n/* harmony import */ var _file_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-selector */ \"(ssr)/./node_modules/file-selector/dist/es5/file-selector.js\");\n\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmlsZS1zZWxlY3Rvci9kaXN0L2VzNS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUE0QztBQUM1QyIsInNvdXJjZXMiOlsid2VicGFjazovL2hlYWx0aGNhcmUvLi9ub2RlX21vZHVsZXMvZmlsZS1zZWxlY3Rvci9kaXN0L2VzNS9pbmRleC5qcz8xOWVhIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IGZyb21FdmVudCB9IGZyb20gJy4vZmlsZS1zZWxlY3Rvcic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/file-selector/dist/es5/index.js\n");

/***/ })

};
;