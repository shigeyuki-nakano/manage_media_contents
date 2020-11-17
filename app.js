/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resource/ts/Classes/ImagePreview.ts":
/*!*********************************************!*\
  !*** ./resource/ts/Classes/ImagePreview.ts ***!
  \*********************************************/
/*! namespace exports */
/*! export ImagePreview [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImagePreview": () => /* binding */ ImagePreview
/* harmony export */ });
/* harmony import */ var _ImageValidation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageValidation */ "./resource/ts/Classes/ImageValidation.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*

    画像プレビューライブラリ(のつもり)
    使用する際はお好きなtsファイルに下記の用に指定する

    new ImagePreview({
        // 全項目必須ここから
        // クラス名を指定する
        classNames: {
            root: // 画像プレビューの対象のルートHTML要素,
            // クラス名は「(root要素のクラス名)__xx」を想定
            childs: {
                form: ドロップエリア(input[type="file"]を想定)クラスのサフィックス,
                preview: 画像タグ(img)クラスのサフィックス,
                mediaFileName: 挿入した画像の名前を表示するクラスのサフィックス
            }
        },
        // 全項目必須ここまで

        // 任意項目ここから
        // 検証設定(指定しない場合は自動)
        validation {
            // 配列にして複数指定可能(複数指定でなくても配列で指定)
            ratios: [
                {
                    width: 横比率,
                    height: 縦比率,
                },
                {
                    width: ...,
                    height: ...
                }
            ],
            // 許可する縦横比の誤差
            ratioBuffer: number = 0.05,

            // 配列で許可する拡張子を指定
            extensions: [
                jpg,
                png,
                gif...
            ],

            // 画像の最低容量を指定
            minSize = 1,
            // 画像の最高容量を指定
            maxSize = 100000,
        }
    })

    (例)
    new ImagePreview({
        classNames: {
            root: '.js-image-preview',
            childs: {
                dropArea: '__droparea',
                imgTag: '__img',
                imgName: '__img-name'
            }
        },
    })
*/
 // 子要素のクラス名かHTMLElementを挿入する

var ImagePreview = /*#__PURE__*/function () {
  function ImagePreview(args) {
    var _this = this;

    _classCallCheck(this, ImagePreview);

    _defineProperty(this, "rootElements", void 0);

    _defineProperty(this, "childElementMembers", {});

    _defineProperty(this, "rootClassName", void 0);

    _defineProperty(this, "childClassNames", void 0);

    _defineProperty(this, "validOpts", void 0);

    _defineProperty(this, "switcherHTMLClass", void 0);

    this.rootClassName = args.classNames.root;
    this.childClassNames = {
      preview: args.classNames.childs.preview,
      form: args.classNames.childs.form,
      mediaFileName: args.classNames.childs.mediaFileName
    };
    this.validOpts = args.validation;
    window.addEventListener('load', function () {
      _this.getRequireElements();

      for (var i = 0; i < _this.rootElements.length; i++) {
        var rootElement = _this.rootElements[i];
        var childElementMember = _this.childElementMembers[i];

        _this.registerImage(rootElement, childElementMember);

        _this.dragover(rootElement);

        _this.dragleave(rootElement);
      }
    });
  }

  _createClass(ImagePreview, [{
    key: "message",
    value: function message(msgNum) {
      var addInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var msg;

      switch (msgNum) {
        case 1:
          // rootのHTMLクラスがない時に使用
          msg = 'クラス名「' + addInfo + '」が存在しません';
          break;

        case 2:
          // 子要素のクラスが足りないときに使用
          msg = 'クラス名「' + addInfo + '」が存在しない箇所があります。ご確認の上追加を願います。';
          break;
      }

      return msg;
    }
  }, {
    key: "getRequireElements",
    value: function getRequireElements() {
      var _this2 = this;

      // ルート要素のHTMLを取得
      this.rootElements = document.querySelectorAll(this.rootClassName);

      try {
        if (this.rootElements.length === 0) {
          throw new Error(this.message(1, this.rootClassName));
        } else {
          var _loop = function _loop(i) {
            var childElements = {}; // this.childClassNamesからメンバー名を参照

            Object.keys(_this2.childClassNames).forEach(function (key) {
              var childElement = _this2.rootElements[i].querySelector(_this2.rootClassName + _this2.childClassNames[key]);

              if (childElement) {
                childElements[key] = childElement;
              } else {
                throw new Error(_this2.message(2, _this2.rootClassName + _this2.childClassNames[key]));
              }
            });
            _this2.childElementMembers[i] = childElements;
          };

          // その配下に必要な子要素がいるか検証し、いなかったらエラー、いたらthis.childElementMembersに追加する
          for (var i = 0; i < this.rootElements.length; i++) {
            _loop(i);
          }
        }
      } catch (e) {
        console.error("name:", e.name);
        console.error("message:", e.message);
        console.error("stack:", e.stack);
      }
    }
  }, {
    key: "registerImage",
    value: function registerImage(rootElement, childElementMember) {
      var _this3 = this;

      rootElement.addEventListener('change', function (e) {
        var fileObj = e.target.files[0];

        try {
          // 拡張子の検証
          var extensionResult = _ImageValidation__WEBPACK_IMPORTED_MODULE_0__.ImageValidation.chkExtension(fileObj.type, _this3.validOpts.extensions);

          if (!extensionResult[0]) {
            throw new Error(extensionResult[1]);
          } // 画像サイズの検証


          var sizeResult = _ImageValidation__WEBPACK_IMPORTED_MODULE_0__.ImageValidation.chkSize(fileObj.size, _this3.validOpts.sizes);

          if (!sizeResult[0]) {
            throw new Error(sizeResult[1]);
          }
        } catch (err) {
          console.error("name:", err.name);
          console.error("message:", err.message);
          console.error("stack:", err.stack);
          alert(err.message);
        }

        var imageObj = new Image();
        var dataURL;
        var promise = new Promise(function (resolve, reject) {
          // srcに渡ってきたデータを処理
          imageObj.addEventListener('load', function () {
            // 渡ってきた画像のwidth、heightを保存
            var imageSizes = {
              width: imageObj.naturalWidth,
              height: imageObj.naturalHeight
            }; // BlobURLはデータURLとして保存(Preview)表示の際に使用

            dataURL = imageObj.src;
            resolve(imageSizes);
          }); // FileオブジェクトをBlobURLに変換し、Imageオブジェクトのsrcに渡す

          imageObj.src = URL.createObjectURL(fileObj);
        });
        promise.then(function (imageSizes) {
          try {
            // 画像比率の検証
            var ratioResult = _ImageValidation__WEBPACK_IMPORTED_MODULE_0__.ImageValidation.chkRatio(imageSizes, _this3.validOpts.ratioConfig);

            if (ratioResult[0]) {
              childElementMember.preview.setAttribute('src', dataURL);
              childElementMember.mediaFileName.innerHTML = fileObj.name;
              rootElement.classList.add('is-active');
            } else {
              throw new Error(ratioResult[1]);
            }
          } catch (e) {
            console.error("name:", e.name);
            console.error("message:", e.message);
            console.error("stack:", e.stack);
            alert(e.message);
          }
        });
      }, false);
    }
  }, {
    key: "dragover",
    value: function dragover(rootElement) {
      rootElement.addEventListener('dragover', function (e) {
        this.classList.add('is-drag-over');
      }, false);
    }
  }, {
    key: "dragleave",
    value: function dragleave(rootElement) {
      rootElement.addEventListener('dragleave', function (e) {
        this.classList.remove('is-drag-over');
      }, false);
    }
  }]);

  return ImagePreview;
}();

/***/ }),

/***/ "./resource/ts/Classes/ImageValidation.ts":
/*!************************************************!*\
  !*** ./resource/ts/Classes/ImageValidation.ts ***!
  \************************************************/
/*! namespace exports */
/*! export ImageValidation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageValidation": () => /* binding */ ImageValidation
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*

画像に関するバリデーションを行う

*/
var ImageValidation = /*#__PURE__*/function () {
  function ImageValidation() {
    _classCallCheck(this, ImageValidation);
  }

  _createClass(ImageValidation, null, [{
    key: "message",
    // エラー、その他メッセージにて使用
    value: function message(errorNum) {
      var addInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var message;

      switch (errorNum) {
        case 1:
          message = 'jpg、jpeg、png、gif以外のフォーマットのものを指定しないでください';
          break;

        case 2:
          message = '画像を指定してください';
          break;

        case 3:
          message = '画像サイズは' + this.sizes.max + 'より小さいものを指定してください';
          break;

        case 4:
          message = '画像サイズは' + this.sizes.min + 'より大きいものを指定してください';
          break;

        case 5:
          var ratios = "";
          this.allowRatios.ratios.forEach(function (allowRatio) {
            if (allowRatio.width && allowRatio.height) {
              ratios += "".concat(allowRatio.width, ":").concat(allowRatio.height, "\u3001");
            }
          });
          message = "\u7E26\u6A2A\u6BD4\u306F".concat(ratios, "\u306E\u3069\u308C\u304B\u3067\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044");
      }

      return message;
    } // 拡張子、データ規格(imageのみ)を判定

  }, {
    key: "chkExtension",
    value: function chkExtension(mimeType) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var result = false;
      var errMsg;
      var type = mimeType.split('/')[0];
      var extension = mimeType.split('/')[1];
      var allowExtensions;

      if (opts) {
        allowExtensions = opts;
      } else {
        allowExtensions = this.allowExtensions;
      }

      if (type === 'image') {
        // チェック対象がallowExtensionsプロパティに入っているか検証する
        allowExtensions.forEach(function (allowExtension) {
          if (allowExtension === extension) {
            result = true;
          }
        });

        if (!result) {
          errMsg = this.message(1);
        }
      } else {
        errMsg = this.message(2);
      }

      return [result, errMsg];
    } // 画像サイズを判定

  }, {
    key: "chkSize",
    value: function chkSize(size) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var result = false;
      var errMsg;

      if (opts) {
        this.sizes = opts;
      }

      if (size > this.sizes.max) {
        errMsg = this.message(3);
      } else if (size < this.sizes.min) {
        errMsg = this.message(4);
      } else {
        result = true;
      }

      return [result, errMsg];
    } // 画像の縦横比を判定

  }, {
    key: "chkRatio",
    value: function chkRatio(sizes) {
      var _this = this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var result = false;
      var errMsg;

      if (opts) {
        this.allowRatios = opts;
      }

      this.allowRatios.ratios.forEach(function (allowRatio) {
        var baseRatio = allowRatio['height'] / allowRatio['width'];
        var ratio = sizes['height'] / sizes['width']; // this.allowRtiosの縦横を割った数と引数の縦横を割った数がニアイコール(bufferで指定した範囲)だった場合true

        if (baseRatio < ratio + _this.allowRatios.buffer && baseRatio + _this.allowRatios.buffer > ratio) {
          result = true;
        } else {
          errMsg = _this.message(5, _this.allowRatios.ratios);
        }
      });
      return [result, errMsg];
    }
  }]);

  return ImageValidation;
}();

_defineProperty(ImageValidation, "sizes", {
  min: 1,
  max: 10000000
});

_defineProperty(ImageValidation, "allowExtensions", ['jpg', 'jpeg', 'gif', 'png']);

_defineProperty(ImageValidation, "allowRatios", {
  ratios: [{
    width: 16,
    height: 9
  }, {
    width: 4,
    height: 3
  }],
  // 差分許容5%
  buffer: 0.05
});

/***/ }),

/***/ "./resource/ts/app.js":
/*!****************************!*\
  !*** ./resource/ts/app.js ***!
  \****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toppage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toppage */ "./resource/ts/toppage.ts");
/* harmony import */ var _videospage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./videospage */ "./resource/ts/videospage.ts");
/* harmony import */ var _videospage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_videospage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sass_app_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sass/app.scss */ "./resource/sass/app.scss");
// ts
;
 // sass



/***/ }),

/***/ "./resource/ts/toppage.ts":
/*!********************************!*\
  !*** ./resource/ts/toppage.ts ***!
  \********************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Classes_ImagePreview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/ImagePreview */ "./resource/ts/Classes/ImagePreview.ts");
;

(function () {
  var searchParams = new URLSearchParams(window.location.search);

  if (searchParams.get('page') !== 'TOP') {
    return false;
  }

  new _Classes_ImagePreview__WEBPACK_IMPORTED_MODULE_0__.ImagePreview({
    classNames: {
      root: '.js-image-preview',
      childs: {
        form: '__form',
        preview: '__preview',
        mediaFileName: '__img-name'
      }
    },
    validation: {
      sizes: {
        min: 1,
        max: 10000000
      },
      extensions: ['jpg', 'jpeg', 'gif', 'png'],
      ratioConfig: {
        ratios: [{
          width: 16,
          height: 9
        }],
        // 差分許容5%
        buffer: 0.05
      }
    }
  });
  window.addEventListener('load', function () {
    var rootElement = document.querySelector('.js-video-preview');
    var formElement = rootElement.querySelector('.js-video-preview__form');
    var previewElement = rootElement.querySelector('.js-video-preview__preview');
    var switcherElement = rootElement.querySelector('.js-video-preview__switcher');
    var oldURL;
    formElement.addEventListener('blur', function (e) {
      var newURL = this.value;

      if (!newURL) {
        return false;
      } else if (newURL === oldURL) {
        return false;
      }

      switcherElement.classList.add('is-active');
      previewElement.setAttribute('src', newURL);
      oldURL = newURL;
    });
  });
})();

/***/ }),

/***/ "./resource/ts/videospage.ts":
/*!***********************************!*\
  !*** ./resource/ts/videospage.ts ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

(function () {
  var searchParams = new URLSearchParams(window.location.search);

  if (searchParams.get('page') !== 'videos') {
    return false;
  }

  window.addEventListener('load', function () {
    var rootElement = document.querySelector('.js-media-preview');
    var formElement = rootElement.querySelector('.js-media-preview__form');
    var previewElement = rootElement.querySelector('.js-media-preview__preview');
    var switcherElement = rootElement.querySelector('.js-media-preview__switcher');
    formElement.addEventListener('blur', function (e) {
      var url = this.value;

      if (!url) {
        return false;
      }

      switcherElement.classList.add('is-active');
      previewElement.setAttribute('src', url);
    });
  });
})();

/***/ }),

/***/ "./resource/sass/app.scss":
/*!********************************!*\
  !*** ./resource/sass/app.scss ***!
  \********************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./resource/ts/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvLi9yZXNvdXJjZS90cy9DbGFzc2VzL0ltYWdlUHJldmlldy50cyIsIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvLi9yZXNvdXJjZS90cy9DbGFzc2VzL0ltYWdlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvLi9yZXNvdXJjZS90cy9hcHAuanMiLCJ3ZWJwYWNrOi8vbWFuYWdlX21lZGlhX2NvbnRlbnRzLy4vcmVzb3VyY2UvdHMvdG9wcGFnZS50cyIsIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvLi9yZXNvdXJjZS90cy92aWRlb3NwYWdlLnRzIiwid2VicGFjazovL21hbmFnZV9tZWRpYV9jb250ZW50cy8uL3Jlc291cmNlL3Nhc3MvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vbWFuYWdlX21lZGlhX2NvbnRlbnRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21hbmFnZV9tZWRpYV9jb250ZW50cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hbmFnZV9tZWRpYV9jb250ZW50cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21hbmFnZV9tZWRpYV9jb250ZW50cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hbmFnZV9tZWRpYV9jb250ZW50cy93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOlsiSW1hZ2VQcmV2aWV3IiwiYXJncyIsInJvb3RDbGFzc05hbWUiLCJjbGFzc05hbWVzIiwicm9vdCIsImNoaWxkQ2xhc3NOYW1lcyIsInByZXZpZXciLCJjaGlsZHMiLCJmb3JtIiwibWVkaWFGaWxlTmFtZSIsInZhbGlkT3B0cyIsInZhbGlkYXRpb24iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0UmVxdWlyZUVsZW1lbnRzIiwiaSIsInJvb3RFbGVtZW50cyIsImxlbmd0aCIsInJvb3RFbGVtZW50IiwiY2hpbGRFbGVtZW50TWVtYmVyIiwiY2hpbGRFbGVtZW50TWVtYmVycyIsInJlZ2lzdGVySW1hZ2UiLCJkcmFnb3ZlciIsImRyYWdsZWF2ZSIsIm1zZ051bSIsImFkZEluZm8iLCJtc2ciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJFcnJvciIsIm1lc3NhZ2UiLCJjaGlsZEVsZW1lbnRzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjaGlsZEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsIm5hbWUiLCJzdGFjayIsImZpbGVPYmoiLCJ0YXJnZXQiLCJmaWxlcyIsImV4dGVuc2lvblJlc3VsdCIsIkltYWdlVmFsaWRhdGlvbiIsInR5cGUiLCJleHRlbnNpb25zIiwic2l6ZVJlc3VsdCIsInNpemUiLCJzaXplcyIsImVyciIsImFsZXJ0IiwiaW1hZ2VPYmoiLCJJbWFnZSIsImRhdGFVUkwiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpbWFnZVNpemVzIiwid2lkdGgiLCJuYXR1cmFsV2lkdGgiLCJoZWlnaHQiLCJuYXR1cmFsSGVpZ2h0Iiwic3JjIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwidGhlbiIsInJhdGlvUmVzdWx0IiwicmF0aW9Db25maWciLCJzZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJlcnJvck51bSIsIm1heCIsIm1pbiIsInJhdGlvcyIsImFsbG93UmF0aW9zIiwiYWxsb3dSYXRpbyIsIm1pbWVUeXBlIiwib3B0cyIsInJlc3VsdCIsImVyck1zZyIsInNwbGl0IiwiZXh0ZW5zaW9uIiwiYWxsb3dFeHRlbnNpb25zIiwiYWxsb3dFeHRlbnNpb24iLCJiYXNlUmF0aW8iLCJyYXRpbyIsImJ1ZmZlciIsInNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImxvY2F0aW9uIiwic2VhcmNoIiwiZ2V0IiwiZm9ybUVsZW1lbnQiLCJwcmV2aWV3RWxlbWVudCIsInN3aXRjaGVyRWxlbWVudCIsIm9sZFVSTCIsIm5ld1VSTCIsInZhbHVlIiwidXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0NBS0E7O0FBZ0NPLElBQU1BLFlBQWI7QUFRSSx3QkFBbUJDLElBQW5CLEVBQXVDO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsaURBTjJDLEVBTTNDOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUNuQyxTQUFLQyxhQUFMLEdBQXFCRCxJQUFJLENBQUNFLFVBQUwsQ0FBZ0JDLElBQXJDO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QjtBQUNuQkMsYUFBTyxFQUFFTCxJQUFJLENBQUNFLFVBQUwsQ0FBZ0JJLE1BQWhCLENBQXVCRCxPQURiO0FBRW5CRSxVQUFJLEVBQUVQLElBQUksQ0FBQ0UsVUFBTCxDQUFnQkksTUFBaEIsQ0FBdUJDLElBRlY7QUFHbkJDLG1CQUFhLEVBQUVSLElBQUksQ0FBQ0UsVUFBTCxD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QXRDO0FBQ0EsUUFBTWdFLGNBQTJCLEdBQUduRixXQUFXLENBQUNtQixhQUFaLENBQTBCLDRCQUExQixDQUFwQztBQUNBLFFBQU1pRSxlQUE0QixHQUFHcEYsV0FBVyxDQUFDbUIsYUFBWixDQUEwQiw2QkFBMUIsQ0FBckM7QUFFQStELGVBQVcsQ0FBQ3ZGLGdCQUFaLENBQTZCLE1BQTdCLEVBQXFDLFVBQVN5QixDQUFULEVBQW1CO0FBQ3BELFVBQU1vRSxHQUFXLEdBQUcsS0FBS0QsS0FBekI7O0FBQ0EsVUFBSSxDQUFFQyxHQUFOLEVBQVc7QUFDUCxlQUFPLEtBQVA7QUFDSDs7QUFDREoscUJBQWUsQ0FBQzNCLFNBQWhCLENBQTBCQyxHQUExQixDQUE4QixXQUE5QjtBQUNBeUIsb0JBQWMsQ0FBQzVCLFlBQWYsQ0FBNEIsS0FBNUIsRUFBbUNpQyxHQUFuQztBQUNILEtBUEQ7QUFRSCxHQWREO0FBZUgsQ0FyQkQsSTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5cclxuICAgIOeUu+WDj+ODl+ODrOODk+ODpeODvOODqeOCpOODluODqeODqijjga7jgaTjgoLjgoopXHJcbiAgICDkvb/nlKjjgZnjgovpmpvjga/jgYrlpb3jgY3jgap0c+ODleOCoeOCpOODq+OBq+S4i+iomOOBrueUqOOBq+aMh+WumuOBmeOCi1xyXG5cclxuICAgIG5ldyBJbWFnZVByZXZpZXcoe1xyXG4gICAgICAgIC8vIOWFqOmgheebruW/hemgiOOBk+OBk+OBi+OCiVxyXG4gICAgICAgIC8vIOOCr+ODqeOCueWQjeOCkuaMh+WumuOBmeOCi1xyXG4gICAgICAgIGNsYXNzTmFtZXM6IHtcclxuICAgICAgICAgICAgcm9vdDogLy8g55S75YOP44OX44Os44OT44Ol44O844Gu5a++6LGh44Gu44Or44O844OISFRNTOimgee0oCxcclxuICAgICAgICAgICAgLy8g44Kv44Op44K55ZCN44Gv44CMKHJvb3TopoHntKDjga7jgq/jg6njgrnlkI0pX194eOOAjeOCkuaDs+WumlxyXG4gICAgICAgICAgICBjaGlsZHM6IHtcclxuICAgICAgICAgICAgICAgIGZvcm06IOODieODreODg+ODl+OCqOODquOCoihpbnB1dFt0eXBlPVwiZmlsZVwiXeOCkuaDs+Wuminjgq/jg6njgrnjga7jgrXjg5XjgqPjg4Pjgq/jgrksXHJcbiAgICAgICAgICAgICAgICBwcmV2aWV3OiDnlLvlg4/jgr/jgrAoaW1nKeOCr+ODqeOCueOBruOCteODleOCo+ODg+OCr+OCuSxcclxuICAgICAgICAgICAgICAgIG1lZGlhRmlsZU5hbWU6IOaMv+WFpeOBl+OBn+eUu+WDj+OBruWQjeWJjeOCkuihqOekuuOBmeOCi+OCr+ODqeOCueOBruOCteODleOCo+ODg+OCr+OCuVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDlhajpoIXnm67lv4XpoIjjgZPjgZPjgb7jgadcclxuXHJcbiAgICAgICAgLy8g5Lu75oSP6aCF55uu44GT44GT44GL44KJXHJcbiAgICAgICAgLy8g5qSc6Ki86Kit5a6aKOaMh+WumuOBl+OBquOBhOWgtOWQiOOBr+iHquWLlSlcclxuICAgICAgICB2YWxpZGF0aW9uIHtcclxuICAgICAgICAgICAgLy8g6YWN5YiX44Gr44GX44Gm6KSH5pWw5oyH5a6a5Y+v6IO9KOikh+aVsOaMh+WumuOBp+OBquOBj+OBpuOCgumFjeWIl+OBp+aMh+WumilcclxuICAgICAgICAgICAgcmF0aW9zOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IOaoquavlOeOhyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IOe4puavlOeOhyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IC4uLixcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IC4uLlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAvLyDoqLHlj6/jgZnjgovnuKbmqKrmr5Tjga7oqqTlt65cclxuICAgICAgICAgICAgcmF0aW9CdWZmZXI6IG51bWJlciA9IDAuMDUsXHJcblxyXG4gICAgICAgICAgICAvLyDphY3liJfjgafoqLHlj6/jgZnjgovmi6HlvLXlrZDjgpLmjIflrppcclxuICAgICAgICAgICAgZXh0ZW5zaW9uczogW1xyXG4gICAgICAgICAgICAgICAganBnLFxyXG4gICAgICAgICAgICAgICAgcG5nLFxyXG4gICAgICAgICAgICAgICAgZ2lmLi4uXHJcbiAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAvLyDnlLvlg4/jga7mnIDkvY7lrrnph4/jgpLmjIflrppcclxuICAgICAgICAgICAgbWluU2l6ZSA9IDEsXHJcbiAgICAgICAgICAgIC8vIOeUu+WDj+OBruacgOmrmOWuuemHj+OCkuaMh+WumlxyXG4gICAgICAgICAgICBtYXhTaXplID0gMTAwMDAwLFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgKOS+iylcclxuICAgIG5ldyBJbWFnZVByZXZpZXcoe1xyXG4gICAgICAgIGNsYXNzTmFtZXM6IHtcclxuICAgICAgICAgICAgcm9vdDogJy5qcy1pbWFnZS1wcmV2aWV3JyxcclxuICAgICAgICAgICAgY2hpbGRzOiB7XHJcbiAgICAgICAgICAgICAgICBkcm9wQXJlYTogJ19fZHJvcGFyZWEnLFxyXG4gICAgICAgICAgICAgICAgaW1nVGFnOiAnX19pbWcnLFxyXG4gICAgICAgICAgICAgICAgaW1nTmFtZTogJ19faW1nLW5hbWUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfSlcclxuKi9cclxuXHJcbmltcG9ydCB7IEhUTUxFbGVtZW50RXZlbnQgfSBmcm9tICcuL0ludGVyZmFjZXMvSFRNTEVsZW1lbnRFdmVudCc7XHJcbmltcG9ydCB7IEltYWdlVmFsaWRhdGlvbiB9IGZyb20gJy4vSW1hZ2VWYWxpZGF0aW9uJztcclxuXHJcbi8vIOWtkOimgee0oOOBruOCr+ODqeOCueWQjeOBi0hUTUxFbGVtZW5044KS5oy/5YWl44GZ44KLXHJcbmludGVyZmFjZSBDaGlsZEhUTUxDbGFzc01lbWJlcjxUPiB7XHJcbiAgICBwcmV2aWV3OiBULFxyXG4gICAgZm9ybTogVCxcclxuICAgIG1lZGlhRmlsZU5hbWU6IFQgXHJcbn1cclxuXHJcbi8vIOOCs+ODs+OCueODiOODqeOCr+OCv+OBruW8leaVsFxyXG5pbnRlcmZhY2UgQXJnUHJvcGF0aWVzIHtcclxuICAgIGNsYXNzTmFtZXM6IHtcclxuICAgICAgICByb290OiBzdHJpbmcsXHJcbiAgICAgICAgY2hpbGRzOiBDaGlsZEhUTUxDbGFzc01lbWJlcjxzdHJpbmc+LFxyXG4gICAgICAgIHN3aXRjaGVyPzogc3RyaW5nLFxyXG4gICAgfSxcclxuICAgIHZhbGlkYXRpb246IEltYWdlVmFsaWRhdGlvblByb3BhdGllc1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW1hZ2VWYWxpZGF0aW9uUHJvcGF0aWVzIHtcclxuICAgIHJhdGlvQ29uZmlnPzoge1xyXG4gICAgICAgIHJhdGlvczogQXJyYXk8e1xyXG4gICAgICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IG51bWJlclxyXG4gICAgICAgIH0+LFxyXG4gICAgICAgIGJ1ZmZlcj86IG51bWJlclxyXG4gICAgfSxcclxuICAgIHNpemVzPzoge1xyXG4gICAgICAgIG1pbjogbnVtYmVyLFxyXG4gICAgICAgIG1heDogbnVtYmVyXHJcbiAgICB9XHJcbiAgICBleHRlbnNpb25zOiBBcnJheTxzdHJpbmc+LFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VQcmV2aWV3IHtcclxuICAgIHByaXZhdGUgcm9vdEVsZW1lbnRzOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcclxuICAgIHByaXZhdGUgY2hpbGRFbGVtZW50TWVtYmVyczoge1trZXk6IG51bWJlcl06IENoaWxkSFRNTENsYXNzTWVtYmVyPEhUTUxFbGVtZW50Pn0gPSB7fTtcclxuICAgIHByaXZhdGUgcm9vdENsYXNzTmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjaGlsZENsYXNzTmFtZXM6IENoaWxkSFRNTENsYXNzTWVtYmVyPHN0cmluZz47XHJcbiAgICBwcml2YXRlIHZhbGlkT3B0czogSW1hZ2VWYWxpZGF0aW9uUHJvcGF0aWVzO1xyXG4gICAgcHJpdmF0ZSBzd2l0Y2hlckhUTUxDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhcmdzOiBBcmdQcm9wYXRpZXMpIHtcclxuICAgICAgICB0aGlzLnJvb3RDbGFzc05hbWUgPSBhcmdzLmNsYXNzTmFtZXMucm9vdDtcclxuICAgICAgICB0aGlzLmNoaWxkQ2xhc3NOYW1lcyA9IHtcclxuICAgICAgICAgICAgcHJldmlldzogYXJncy5jbGFzc05hbWVzLmNoaWxkcy5wcmV2aWV3LFxyXG4gICAgICAgICAgICBmb3JtOiBhcmdzLmNsYXNzTmFtZXMuY2hpbGRzLmZvcm0sXHJcbiAgICAgICAgICAgIG1lZGlhRmlsZU5hbWU6IGFyZ3MuY2xhc3NOYW1lcy5jaGlsZHMubWVkaWFGaWxlTmFtZSxcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZE9wdHMgPSBhcmdzLnZhbGlkYXRpb247XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldFJlcXVpcmVFbGVtZW50cygpO1xyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucm9vdEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5yb290RWxlbWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGRFbGVtZW50TWVtYmVyOiBDaGlsZEhUTUxDbGFzc01lbWJlcjxIVE1MRWxlbWVudD4gPSB0aGlzLmNoaWxkRWxlbWVudE1lbWJlcnNbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVySW1hZ2Uocm9vdEVsZW1lbnQsIGNoaWxkRWxlbWVudE1lbWJlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdvdmVyKHJvb3RFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2xlYXZlKHJvb3RFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlKG1zZ051bTogbnVtYmVyLCBhZGRJbmZvID0gbnVsbCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IG1zZzogc3RyaW5nO1xyXG4gICAgICAgIHN3aXRjaChtc2dOdW0pIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gcm9vdOOBrkhUTUzjgq/jg6njgrnjgYzjgarjgYTmmYLjgavkvb/nlKhcclxuICAgICAgICAgICAgICAgIG1zZyA9ICfjgq/jg6njgrnlkI3jgIwnICsgYWRkSW5mbyArICfjgI3jgYzlrZjlnKjjgZfjgb7jgZvjgpMnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8g5a2Q6KaB57Sg44Gu44Kv44Op44K544GM6Laz44KK44Gq44GE44Go44GN44Gr5L2/55SoXHJcbiAgICAgICAgICAgICAgICBtc2cgPSAn44Kv44Op44K55ZCN44CMJyArIGFkZEluZm8gKyAn44CN44GM5a2Y5Zyo44GX44Gq44GE566H5omA44GM44GC44KK44G+44GZ44CC44GU56K66KqN44Gu5LiK6L+95Yqg44KS6aGY44GE44G+44GZ44CCJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbXNnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSZXF1aXJlRWxlbWVudHMoKSB7XHJcbiAgICAgICAgLy8g44Or44O844OI6KaB57Sg44GuSFRNTOOCkuWPluW+l1xyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnJvb3RDbGFzc05hbWUpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLm1lc3NhZ2UoMSwgdGhpcy5yb290Q2xhc3NOYW1lKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIOOBneOBrumFjeS4i+OBq+W/heimgeOBquWtkOimgee0oOOBjOOBhOOCi+OBi+aknOiovOOBl+OAgeOBhOOBquOBi+OBo+OBn+OCieOCqOODqeODvOOAgeOBhOOBn+OCiXRoaXMuY2hpbGRFbGVtZW50TWVtYmVyc+OBq+i/veWKoOOBmeOCi1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucm9vdEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkRWxlbWVudHM6IENoaWxkSFRNTENsYXNzTWVtYmVyPEhUTUxFbGVtZW50PiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY2hpbGRDbGFzc05hbWVz44GL44KJ44Oh44Oz44OQ44O85ZCN44KS5Y+C54WnXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5jaGlsZENsYXNzTmFtZXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLnJvb3RFbGVtZW50c1tpXS5xdWVyeVNlbGVjdG9yKHRoaXMucm9vdENsYXNzTmFtZSArIHRoaXMuY2hpbGRDbGFzc05hbWVzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudHNba2V5XSA9IGNoaWxkRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLm1lc3NhZ2UoMiwgdGhpcy5yb290Q2xhc3NOYW1lICsgdGhpcy5jaGlsZENsYXNzTmFtZXNba2V5XSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZEVsZW1lbnRNZW1iZXJzW2ldID0gY2hpbGRFbGVtZW50cztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibmFtZTpcIiwgZS5uYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm1lc3NhZ2U6XCIsIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdGFjazpcIiwgZS5zdGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlckltYWdlKHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCwgY2hpbGRFbGVtZW50TWVtYmVyOiBDaGlsZEhUTUxDbGFzc01lbWJlcjxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICByb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZTogSFRNTEVsZW1lbnRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU9iajogYW55ID0gZS50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmi6HlvLXlrZDjga7mpJzoqLxcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvblJlc3VsdDogW2Jvb2xlYW4sIHN0cmluZ10gPSBJbWFnZVZhbGlkYXRpb24uY2hrRXh0ZW5zaW9uKGZpbGVPYmoudHlwZSwgdGhpcy52YWxpZE9wdHMuZXh0ZW5zaW9ucyk7XHJcbiAgICAgICAgICAgICAgICBpZiggISBleHRlbnNpb25SZXN1bHRbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXh0ZW5zaW9uUmVzdWx0WzFdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOeUu+WDj+OCteOCpOOCuuOBruaknOiovFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZVJlc3VsdDogW2Jvb2xlYW4sIHN0cmluZ10gPSBJbWFnZVZhbGlkYXRpb24uY2hrU2l6ZShmaWxlT2JqLnNpemUsIHRoaXMudmFsaWRPcHRzLnNpemVzKTtcclxuICAgICAgICAgICAgICAgIGlmKCAhIHNpemVSZXN1bHRbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2l6ZVJlc3VsdFsxXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJuYW1lOlwiLCBlcnIubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibWVzc2FnZTpcIiwgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInN0YWNrOlwiLCBlcnIuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbWFnZU9iaiA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YVVSTDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNyY+OBq+a4oeOBo+OBpuOBjeOBn+ODh+ODvOOCv+OCkuWHpueQhlxyXG4gICAgICAgICAgICAgICAgaW1hZ2VPYmouYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmuKHjgaPjgabjgY3jgZ/nlLvlg4/jga53aWR0aOOAgWhlaWdodOOCkuS/neWtmFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlU2l6ZXM6IHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBpbWFnZU9iai5uYXR1cmFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaW1hZ2VPYmoubmF0dXJhbEhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBCbG9iVVJM44Gv44OH44O844K/VVJM44Go44GX44Gm5L+d5a2YKFByZXZpZXcp6KGo56S644Gu6Zqb44Gr5L2/55SoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVSTCA9IGltYWdlT2JqLnNyYztcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGltYWdlU2l6ZXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEZpbGXjgqrjg5bjgrjjgqfjgq/jg4jjgpJCbG9iVVJM44Gr5aSJ5o+b44GX44CBSW1hZ2Xjgqrjg5bjgrjjgqfjgq/jg4jjga5zcmPjgavmuKHjgZlcclxuICAgICAgICAgICAgICAgIGltYWdlT2JqLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZU9iaik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKChpbWFnZVNpemVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g55S75YOP5q+U546H44Gu5qSc6Ki8XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmF0aW9SZXN1bHQ6IFtib29sZWFuLCBzdHJpbmddID0gSW1hZ2VWYWxpZGF0aW9uLmNoa1JhdGlvKGltYWdlU2l6ZXMsIHRoaXMudmFsaWRPcHRzLnJhdGlvQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihyYXRpb1Jlc3VsdFswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnRNZW1iZXIucHJldmlldy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGRhdGFVUkwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnRNZW1iZXIubWVkaWFGaWxlTmFtZS5pbm5lckhUTUwgPSBmaWxlT2JqLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyYXRpb1Jlc3VsdFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm5hbWU6XCIsIGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm1lc3NhZ2U6XCIsIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInN0YWNrOlwiLCBlLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYWdvdmVyKHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZnVuY3Rpb24oZTogSFRNTEVsZW1lbnRFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2lzLWRyYWctb3ZlcicpO1xyXG4gICAgICAgIH0sIGZhbHNlKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmFnbGVhdmUocm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZnVuY3Rpb24oZTogSFRNTEVsZW1lbnRFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWRyYWctb3ZlcicpO1xyXG4gICAgICAgIH0sIGZhbHNlKVxyXG4gICAgfVxyXG5cclxufSIsIi8qXHJcblxyXG7nlLvlg4/jgavplqLjgZnjgovjg5Djg6rjg4fjg7zjgrfjg6fjg7PjgpLooYzjgYZcclxuXHJcbiovXHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VWYWxpZGF0aW9uIHtcclxuICAgIHN0YXRpYyBzaXplcyA9IHtcclxuICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgbWF4OiAxMDAwMDAwMFxyXG4gICAgfVxyXG4gICAgc3RhdGljIGFsbG93RXh0ZW5zaW9uczogc3RyaW5nW10gPSBbXHJcbiAgICAgICAgJ2pwZycsXHJcbiAgICAgICAgJ2pwZWcnLFxyXG4gICAgICAgICdnaWYnLFxyXG4gICAgICAgICdwbmcnXHJcbiAgICBdO1xyXG4gICAgc3RhdGljIGFsbG93UmF0aW9zID0ge1xyXG4gICAgICAgIHJhdGlvczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTYsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgLy8g5beu5YiG6Kix5a65NSVcclxuICAgICAgICBidWZmZXI6IDAuMDVcclxuICAgIH07XHJcblxyXG4gICAgLy8g44Ko44Op44O844CB44Gd44Gu5LuW44Oh44OD44K744O844K444Gr44Gm5L2/55SoXHJcbiAgICBzdGF0aWMgbWVzc2FnZShlcnJvck51bTogbnVtYmVyLCBhZGRJbmZvID0gbnVsbCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcclxuICAgICAgICBzd2l0Y2goZXJyb3JOdW0pIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdqcGfjgIFqcGVn44CBcG5n44CBZ2lm5Lul5aSW44Gu44OV44Kp44O844Oe44OD44OI44Gu44KC44Gu44KS5oyH5a6a44GX44Gq44GE44Gn44GP44Gg44GV44GEJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAn55S75YOP44KS5oyH5a6a44GX44Gm44GP44Gg44GV44GEJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAn55S75YOP44K144Kk44K644GvJyArIHRoaXMuc2l6ZXMubWF4ICsgJ+OCiOOCiuWwj+OBleOBhOOCguOBruOCkuaMh+WumuOBl+OBpuOBj+OBoOOBleOBhCc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ+eUu+WDj+OCteOCpOOCuuOBrycgKyB0aGlzLnNpemVzLm1pbiArICfjgojjgorlpKfjgY3jgYTjgoLjga7jgpLmjIflrprjgZfjgabjgY/jgaDjgZXjgYQnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgbGV0IHJhdGlvczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dSYXRpb3MucmF0aW9zLmZvckVhY2goKGFsbG93UmF0aW86IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxsb3dSYXRpby53aWR0aCAmJiBhbGxvd1JhdGlvLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRpb3MgKz0gYCR7YWxsb3dSYXRpby53aWR0aH06JHthbGxvd1JhdGlvLmhlaWdodH3jgIFgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYOe4puaoquavlOOBryR7cmF0aW9zfeOBruOBqeOCjOOBi+OBp+aMh+WumuOBl+OBpuOBj+OBoOOBleOBhGBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaLoeW8teWtkOOAgeODh+ODvOOCv+imj+agvChpbWFnZeOBruOBvynjgpLliKTlrppcclxuICAgIHN0YXRpYyBjaGtFeHRlbnNpb24obWltZVR5cGU6IHN0cmluZywgb3B0czogQXJyYXk8c3RyaW5nPiB8IG51bGwgPSBudWxsKTogW2Jvb2xlYW4sIHN0cmluZ10ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XHJcbiAgICAgICAgY29uc3QgdHlwZTogc3RyaW5nID0gbWltZVR5cGUuc3BsaXQoJy8nKVswXTtcclxuICAgICAgICBjb25zdCBleHRlbnNpb246IHN0cmluZyA9IG1pbWVUeXBlLnNwbGl0KCcvJylbMV07XHJcbiAgICAgICAgbGV0IGFsbG93RXh0ZW5zaW9uczogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgaWYob3B0cykge1xyXG4gICAgICAgICAgICBhbGxvd0V4dGVuc2lvbnMgPSBvcHRzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsbG93RXh0ZW5zaW9ucyA9IHRoaXMuYWxsb3dFeHRlbnNpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZSA9PT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAvLyDjg4Hjgqfjg4Pjgq/lr77osaHjgYxhbGxvd0V4dGVuc2lvbnPjg5fjg63jg5Hjg4bjgqPjgavlhaXjgaPjgabjgYTjgovjgYvmpJzoqLzjgZnjgotcclxuICAgICAgICAgICAgYWxsb3dFeHRlbnNpb25zLmZvckVhY2goKGFsbG93RXh0ZW5zaW9uOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGFsbG93RXh0ZW5zaW9uID09PSBleHRlbnNpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoICEgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBlcnJNc2cgPSB0aGlzLm1lc3NhZ2UoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlcnJNc2cgPSB0aGlzLm1lc3NhZ2UoMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBbcmVzdWx0LCBlcnJNc2ddO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOeUu+WDj+OCteOCpOOCuuOCkuWIpOWumlxyXG4gICAgc3RhdGljIGNoa1NpemUoc2l6ZTogbnVtYmVyLCBvcHRzOiB7bWluOiBudW1iZXIsIG1heDogbnVtYmVyfSB8IG51bGwgPSBudWxsKTogW2Jvb2xlYW4sIHN0cmluZ10ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmKG9wdHMpIHtcclxuICAgICAgICAgICAgdGhpcy5zaXplcyA9IG9wdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzaXplID4gdGhpcy5zaXplcy5tYXgpIHtcclxuICAgICAgICAgICAgZXJyTXNnID0gdGhpcy5tZXNzYWdlKDMpO1xyXG4gICAgICAgIH0gZWxzZSBpZihzaXplIDwgdGhpcy5zaXplcy5taW4pIHtcclxuICAgICAgICAgICAgZXJyTXNnID0gdGhpcy5tZXNzYWdlKDQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW3Jlc3VsdCwgZXJyTXNnXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDnlLvlg4/jga7nuKbmqKrmr5TjgpLliKTlrppcclxuICAgIHN0YXRpYyBjaGtSYXRpbyhzaXplczoge3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSwgb3B0cyA9IG51bGwpOiBbYm9vbGVhbiwgc3RyaW5nXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBlcnJNc2c6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYob3B0cykge1xyXG4gICAgICAgICAgICB0aGlzLmFsbG93UmF0aW9zID0gb3B0cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWxsb3dSYXRpb3MucmF0aW9zLmZvckVhY2goKGFsbG93UmF0aW86IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2VSYXRpbzogbnVtYmVyID0gYWxsb3dSYXRpb1snaGVpZ2h0J10gLyBhbGxvd1JhdGlvWyd3aWR0aCddO1xyXG4gICAgICAgICAgICBjb25zdCByYXRpbzogbnVtYmVyID0gc2l6ZXNbJ2hlaWdodCddIC8gc2l6ZXNbJ3dpZHRoJ107XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB0aGlzLmFsbG93UnRpb3Pjga7nuKbmqKrjgpLlibLjgaPjgZ/mlbDjgajlvJXmlbDjga7nuKbmqKrjgpLlibLjgaPjgZ/mlbDjgYzjg4vjgqLjgqTjgrPjg7zjg6soYnVmZmVy44Gn5oyH5a6a44GX44Gf56+E5ZuyKeOBoOOBo+OBn+WgtOWQiHRydWVcclxuICAgICAgICAgICAgaWYoKGJhc2VSYXRpbyA8IChyYXRpbyArIHRoaXMuYWxsb3dSYXRpb3MuYnVmZmVyKSkgJiYgKChiYXNlUmF0aW8gKyB0aGlzLmFsbG93UmF0aW9zLmJ1ZmZlcikgPiByYXRpbykpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVyck1zZyA9IHRoaXMubWVzc2FnZSg1LCB0aGlzLmFsbG93UmF0aW9zLnJhdGlvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtyZXN1bHQsIGVyck1zZ11cclxuICAgIH1cclxufSIsIi8vIHRzXHJcbmltcG9ydCAnLi90b3BwYWdlJztcclxuaW1wb3J0ICcuL3ZpZGVvc3BhZ2UnO1xyXG5cclxuLy8gc2Fzc1xyXG5pbXBvcnQgJy4uL3Nhc3MvYXBwLnNjc3MnOyIsImltcG9ydCB7IEltYWdlUHJldmlldyB9IGZyb20gJy4vQ2xhc3Nlcy9JbWFnZVByZXZpZXcnO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuICAgIGlmKHNlYXJjaFBhcmFtcy5nZXQoJ3BhZ2UnKSAhPT0gJ1RPUCcpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3IEltYWdlUHJldmlldyh7XHJcbiAgICAgICAgY2xhc3NOYW1lczoge1xyXG4gICAgICAgICAgICByb290OiAnLmpzLWltYWdlLXByZXZpZXcnLFxyXG4gICAgICAgICAgICBjaGlsZHM6IHtcclxuICAgICAgICAgICAgICAgIGZvcm06ICdfX2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgcHJldmlldzogJ19fcHJldmlldycsXHJcbiAgICAgICAgICAgICAgICBtZWRpYUZpbGVOYW1lOiAnX19pbWctbmFtZSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmFsaWRhdGlvbjoge1xyXG4gICAgICAgICAgICBzaXplczoge1xyXG4gICAgICAgICAgICAgICAgbWluOiAxLFxyXG4gICAgICAgICAgICAgICAgbWF4OiAxMDAwMDAwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHRlbnNpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAnanBnJyxcclxuICAgICAgICAgICAgICAgICdqcGVnJyxcclxuICAgICAgICAgICAgICAgICdnaWYnLFxyXG4gICAgICAgICAgICAgICAgJ3BuZydcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcmF0aW9Db25maWc6IHtcclxuICAgICAgICAgICAgICAgIHJhdGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgLy8g5beu5YiG6Kix5a65NSVcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcjogMC4wNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXZpZGVvLXByZXZpZXcnKTtcclxuICAgICAgICBjb25zdCBmb3JtRWxlbWVudDogSFRNTElucHV0RWxlbWVudCA9IHJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy12aWRlby1wcmV2aWV3X19mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgcHJldmlld0VsZW1lbnQ6IEhUTUxFbGVtZW50ID0gcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXZpZGVvLXByZXZpZXdfX3ByZXZpZXcnKTtcclxuICAgICAgICBjb25zdCBzd2l0Y2hlckVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXZpZGVvLXByZXZpZXdfX3N3aXRjaGVyJyk7XHJcbiAgICAgICAgbGV0IG9sZFVSTDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1VSTDogc3RyaW5nID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgaWYoICEgbmV3VVJMKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihuZXdVUkwgPT09IG9sZFVSTCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2hlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHByZXZpZXdFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgbmV3VVJMKTtcclxuICAgICAgICAgICAgb2xkVVJMID0gbmV3VVJMXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICBpZihzZWFyY2hQYXJhbXMuZ2V0KCdwYWdlJykgIT09ICd2aWRlb3MnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZWRpYS1wcmV2aWV3Jyk7XHJcbiAgICAgICAgY29uc3QgZm9ybUVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgPSByb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVkaWEtcHJldmlld19fZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IHByZXZpZXdFbGVtZW50OiBIVE1MRWxlbWVudCA9IHJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZWRpYS1wcmV2aWV3X19wcmV2aWV3Jyk7XHJcbiAgICAgICAgY29uc3Qgc3dpdGNoZXJFbGVtZW50OiBIVE1MRWxlbWVudCA9IHJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZWRpYS1wcmV2aWV3X19zd2l0Y2hlcicpO1xyXG4gICAgXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgaWYoICEgdXJsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBwcmV2aWV3RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59KSgpIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiBtb2R1bGVbJ2RlZmF1bHQnXSA6XG5cdFx0KCkgPT4gbW9kdWxlO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vcmVzb3VyY2UvdHMvYXBwLmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==