/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
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

    _defineProperty(this, "childElementMembersArray", {});

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
        var childElementMembers = _this.childElementMembersArray[i];

        _this.registerImage(rootElement, childElementMembers);

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
      this.rootElements = document.querySelectorAll('.' + this.rootClassName);

      try {
        if (this.rootElements.length === 0) {
          throw new Error(this.message(1, this.rootClassName));
        } else {
          var _loop = function _loop(i) {
            // interfaceのkeyがないため型エラー。後で治す
            _this2.childElementMembersArray[i] = {}; // this.childClassNamesからメンバー名を参照

            Object.keys(_this2.childClassNames).forEach(function (key) {
              var childElement = _this2.rootElements[i].querySelector('.' + _this2.rootClassName + _this2.childClassNames[key]);

              if (childElement) {
                _this2.childElementMembersArray[i][key] = childElement;
              } else {
                throw new Error(_this2.message(2, _this2.rootClassName + _this2.childClassNames[key]));
              }
            });
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
    value: function registerImage(rootElement, childElementMembers) {
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
              childElementMembers.preview.setAttribute('src', dataURL);
              childElementMembers.mediaFileName.innerHTML = fileObj.name;
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

/***/ "./resource/ts/Classes/VideoPreview.ts":
/*!*********************************************!*\
  !*** ./resource/ts/Classes/VideoPreview.ts ***!
  \*********************************************/
/*! namespace exports */
/*! export VideoPreview [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoPreview": () => /* binding */ VideoPreview
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// コンストラクタの引数
var VideoPreview = /*#__PURE__*/function () {
  // interfaceのkeyがないため型エラー。後で治す
  function VideoPreview(args) {
    var _this = this;

    _classCallCheck(this, VideoPreview);

    _defineProperty(this, "rootElement", void 0);

    _defineProperty(this, "childElementMembers", {});

    _defineProperty(this, "rootClassName", void 0);

    _defineProperty(this, "childClassNames", void 0);

    _defineProperty(this, "previewElement", void 0);

    this.rootClassName = args.classNames.root;
    this.childClassNames = {
      add: args.classNames.childs.add,
      preview: args.classNames.childs.preview,
      form: args.classNames.childs.form,
      moves: args.classNames.childs.moves
    };
    window.addEventListener('load', function () {
      _this.getRequireElements();

      _this.previewURL();

      _this.addPreview();
    });
  }

  _createClass(VideoPreview, [{
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

        case 3:
          msg = 'previewを表示するHTMLにプレビュークラスを追加してください';
          break;

        case 4:
          msg = 'プレビューを増やすときはすべて埋めてからにしてください';
          break;
      }

      return msg;
    }
  }, {
    key: "getRequireElements",
    value: function getRequireElements() {
      var _this2 = this;

      // ルート要素のHTMLを取得
      this.rootElement = document.querySelector('.' + this.rootClassName);

      try {
        if (!this.rootElement) {
          throw new Error(this.message(1, this.rootClassName));
        } else {
          // その配下に必要な子要素がいるか検証し、いなかったらエラー、いたらthis.childElementMembersに追加する
          // this.childClassNamesからメンバー名を参照
          Object.keys(this.childClassNames).forEach(function (key) {
            var childElement;

            if (key === 'moves') {
              childElement = _this2.rootElement.getElementsByClassName(_this2.rootClassName + _this2.childClassNames[key]);
            } else {
              childElement = _this2.rootElement.querySelector('.' + _this2.rootClassName + _this2.childClassNames[key]);
            }

            if (childElement) {
              _this2.childElementMembers[key] = childElement;
            } else {
              throw new Error(_this2.message(2, _this2.rootClassName + _this2.childClassNames[key]));
            }
          });
        }
      } catch (e) {
        console.error("name:", e.name);
        console.error("message:", e.message);
        console.error("stack:", e.stack);
      }
    }
  }, {
    key: "previewURL",
    value: function previewURL() {
      var _this3 = this;

      this.childElementMembers['form'].addEventListener('blur', function (e) {
        var url = _this3.childElementMembers['form'].value;

        if (!url) {
          return false;
        }

        Array.prototype.forEach.call(_this3.childElementMembers['moves'], function (moveElement) {
          if (!moveElement.classList.contains('is-active')) {
            var previewElement = moveElement.querySelector('.' + _this3.rootClassName + _this3.childClassNames['preview']);

            if (previewElement) {
              previewElement.setAttribute('src', url);
              moveElement.classList.add('is-active');
            } else {
              console.error(_this3.message(3));
            }
          }
        });
      });
    }
  }, {
    key: "addPreview",
    value: function addPreview() {
      var _this4 = this;

      var moveElements = this.childElementMembers['moves'];
      var addElement = this.childElementMembers['add']; // plusボタンを押したら対象を追加する処理

      addElement.addEventListener('click', function (e) {
        var isAddEnable = true; // srcに何も入っていない状態のものを何個も増やすのを防ぐため

        Array.prototype.forEach.call(moveElements, function (moveElement) {
          if (!moveElement.classList.contains('is-active')) {
            isAddEnable = false;
            return;
          }
        });

        if (!isAddEnable) {
          alert(_this4.message(4));
          return false;
        }

        var addTarget = moveElements[0].cloneNode(true);
        var lastMoveElement = moveElements[moveElements.length - 1];
        var index = parseInt(lastMoveElement.getAttribute('data-index'));
        lastMoveElement.parentNode.insertBefore(addTarget, lastMoveElement.nextElementSibling);
        addTarget.setAttribute('data-index', String(index + 1));
        addTarget.classList.add('u-mt-5');

        if (addTarget.classList.contains('is-active')) {
          addTarget.classList.remove('is-active');
          addTarget.querySelector('.js-media-preview__preview').removeAttribute('src');
        }
      });
    }
  }]);

  return VideoPreview;
}();

/***/ }),

/***/ "./resource/ts/app.js":
/*!****************************!*\
  !*** ./resource/ts/app.js ***!
  \****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toppage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toppage */ "./resource/ts/toppage.ts");
/* harmony import */ var _videospage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./videospage */ "./resource/ts/videospage.ts");
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
      root: 'js-image-preview',
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
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Classes_VideoPreview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/VideoPreview */ "./resource/ts/Classes/VideoPreview.ts");
;

(function () {
  var searchParams = new URLSearchParams(window.location.search);

  if (searchParams.get('page') !== 'videos') {
    return false;
  }

  new _Classes_VideoPreview__WEBPACK_IMPORTED_MODULE_0__.VideoPreview({
    classNames: {
      root: 'js-media-preview',
      childs: {
        add: '__add',
        preview: '__preview',
        form: '__form',
        moves: '__move-able'
      }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvLi9yZXNvdXJjZS90cy9DbGFzc2VzL0ltYWdlUHJldmlldy50cyIsIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvLi9yZXNvdXJjZS90cy9DbGFzc2VzL0ltYWdlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvLi9yZXNvdXJjZS90cy9DbGFzc2VzL1ZpZGVvUHJldmlldy50cyIsIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvLi9yZXNvdXJjZS90cy9hcHAuanMiLCJ3ZWJwYWNrOi8vbWFuYWdlX21lZGlhX2NvbnRlbnRzLy4vcmVzb3VyY2UvdHMvdG9wcGFnZS50cyIsIndlYnBhY2s6Ly9tYW5hZ2VfbWVkaWFfY29udGVudHMvLi9yZXNvdXJjZS90cy92aWRlb3NwYWdlLnRzIiwid2VicGFjazovL21hbmFnZV9tZWRpYV9jb250ZW50cy8uL3Jlc291cmNlL3Nhc3MvYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vbWFuYWdlX21lZGlhX2NvbnRlbnRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21hbmFnZV9tZWRpYV9jb250ZW50cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFuYWdlX21lZGlhX2NvbnRlbnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFuYWdlX21lZGlhX2NvbnRlbnRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFuYWdlX21lZGlhX2NvbnRlbnRzL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6WyJJbWFnZVByZXZpZXciLCJhcmdzIiwicm9vdENsYXNzTmFtZSIsImNsYXNzTmFtZXMiLCJyb290IiwiY2hpbGRDbGFzc05hbWVzIiwicHJldmlldyIsImNoaWxkcyIsImZvcm0iLCJtZWRpYUZpbGVOYW1lIiwidmFsaWRPcHRzIiwidmFsaWRhdGlvbiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRSZXF1aXJlRWxlbWVudHMiLCJpIiwicm9vdEVsZW1lbnRzIiwibGVuZ3RoIiwicm9vdEVsZW1lbnQiLCJjaGlsZEVsZW1lbnRNZW1iZXJzIiwiY2hpbGRFbGVtZW50TWVtYmVyc0FycmF5IiwicmVnaXN0ZXJJbWFnZSIsImRyYWdvdmVyIiwiZHJhZ2xlYXZlIiwibXNnTnVtIiwiYWRkSW5mbyIsIm1zZyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIkVycm9yIiwibWVzc2FnZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY2hpbGRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJuYW1lIiwic3RhY2siLCJmaWxlT2JqIiwidGFyZ2V0IiwiZmlsZXMiLCJleHRlbnNpb25SZXN1bHQiLCJJbWFnZVZhbGlkYXRpb24iLCJ0eXBlIiwiZXh0ZW5zaW9ucyIsInNpemVSZXN1bHQiLCJzaXplIiwic2l6ZXMiLCJlcnIiLCJhbGVydCIsImltYWdlT2JqIiwiSW1hZ2UiLCJkYXRhVVJMIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiaW1hZ2VTaXplcyIsIndpZHRoIiwibmF0dXJhbFdpZHRoIiwiaGVpZ2h0IiwibmF0dXJhbEhlaWdodCIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInRoZW4iLCJyYXRpb1Jlc3VsdCIsInJhdGlvQ29uZmlnIiwic2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZXJyb3JOdW0iLCJtYXgiLCJtaW4iLCJyYXRpb3MiLCJhbGxvd1JhdGlvcyIsImFsbG93UmF0aW8iLCJtaW1lVHlwZSIsIm9wdHMiLCJyZXN1bHQiLCJlcnJNc2ciLCJzcGxpdCIsImV4dGVuc2lvbiIsImFsbG93RXh0ZW5zaW9ucyIsImFsbG93RXh0ZW5zaW9uIiwiYmFzZVJhdGlvIiwicmF0aW8iLCJidWZmZXIiLCJWaWRlb1ByZXZpZXciLCJtb3ZlcyIsInByZXZpZXdVUkwiLCJhZGRQcmV2aWV3IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInVybCIsInZhbHVlIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwibW92ZUVsZW1lbnQiLCJjb250YWlucyIsInByZXZpZXdFbGVtZW50IiwibW92ZUVsZW1lbnRzIiwiYWRkRWxlbWVudCIsImlzQWRkRW5hYmxlIiwiYWRkVGFyZ2V0IiwiY2xvbmVOb2RlIiwibGFzdE1vdmVFbGVtZW50IiwiaW5kZXgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJTdHJpbmciLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZWFyY2hQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJsb2NhdGlvbiIsInNlYXJjaCIsImdldCIsImZvcm1FbGVtZW50Iiwic3dpdGNoZXJFbGVtZW50Iiwib2xkVVJMIiwibmV3VVJMIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0NBS0E7O0FBZ0NPLElBQU1BLFlBQWI7QUFRSSx3QkFB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QUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5cclxuICAgIOeUu+WDj+ODl+ODrOODk+ODpeODvOODqeOCpOODluODqeODqijjga7jgaTjgoLjgoopXHJcbiAgICDkvb/nlKjjgZnjgovpmpvjga/jgYrlpb3jgY3jgap0c+ODleOCoeOCpOODq+OBq+S4i+iomOOBrueUqOOBq+aMh+WumuOBmeOCi1xyXG5cclxuICAgIG5ldyBJbWFnZVByZXZpZXcoe1xyXG4gICAgICAgIC8vIOWFqOmgheebruW/hemgiOOBk+OBk+OBi+OCiVxyXG4gICAgICAgIC8vIOOCr+ODqeOCueWQjeOCkuaMh+WumuOBmeOCi1xyXG4gICAgICAgIGNsYXNzTmFtZXM6IHtcclxuICAgICAgICAgICAgcm9vdDogLy8g55S75YOP44OX44Os44OT44Ol44O844Gu5a++6LGh44Gu44Or44O844OISFRNTOimgee0oCxcclxuICAgICAgICAgICAgLy8g44Kv44Op44K55ZCN44Gv44CMKHJvb3TopoHntKDjga7jgq/jg6njgrnlkI0pX194eOOAjeOCkuaDs+WumlxyXG4gICAgICAgICAgICBjaGlsZHM6IHtcclxuICAgICAgICAgICAgICAgIGZvcm06IOODieODreODg+ODl+OCqOODquOCoihpbnB1dFt0eXBlPVwiZmlsZVwiXeOCkuaDs+Wuminjgq/jg6njgrnjga7jgrXjg5XjgqPjg4Pjgq/jgrksXHJcbiAgICAgICAgICAgICAgICBwcmV2aWV3OiDnlLvlg4/jgr/jgrAoaW1nKeOCr+ODqeOCueOBruOCteODleOCo+ODg+OCr+OCuSxcclxuICAgICAgICAgICAgICAgIG1lZGlhRmlsZU5hbWU6IOaMv+WFpeOBl+OBn+eUu+WDj+OBruWQjeWJjeOCkuihqOekuuOBmeOCi+OCr+ODqeOCueOBruOCteODleOCo+ODg+OCr+OCuVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDlhajpoIXnm67lv4XpoIjjgZPjgZPjgb7jgadcclxuXHJcbiAgICAgICAgLy8g5Lu75oSP6aCF55uu44GT44GT44GL44KJXHJcbiAgICAgICAgLy8g5qSc6Ki86Kit5a6aKOaMh+WumuOBl+OBquOBhOWgtOWQiOOBr+iHquWLlSlcclxuICAgICAgICB2YWxpZGF0aW9uIHtcclxuICAgICAgICAgICAgLy8g6YWN5YiX44Gr44GX44Gm6KSH5pWw5oyH5a6a5Y+v6IO9KOikh+aVsOaMh+WumuOBp+OBquOBj+OBpuOCgumFjeWIl+OBp+aMh+WumilcclxuICAgICAgICAgICAgcmF0aW9zOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IOaoquavlOeOhyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IOe4puavlOeOhyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IC4uLixcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IC4uLlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAvLyDoqLHlj6/jgZnjgovnuKbmqKrmr5Tjga7oqqTlt65cclxuICAgICAgICAgICAgcmF0aW9CdWZmZXI6IG51bWJlciA9IDAuMDUsXHJcblxyXG4gICAgICAgICAgICAvLyDphY3liJfjgafoqLHlj6/jgZnjgovmi6HlvLXlrZDjgpLmjIflrppcclxuICAgICAgICAgICAgZXh0ZW5zaW9uczogW1xyXG4gICAgICAgICAgICAgICAganBnLFxyXG4gICAgICAgICAgICAgICAgcG5nLFxyXG4gICAgICAgICAgICAgICAgZ2lmLi4uXHJcbiAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAvLyDnlLvlg4/jga7mnIDkvY7lrrnph4/jgpLmjIflrppcclxuICAgICAgICAgICAgbWluU2l6ZSA9IDEsXHJcbiAgICAgICAgICAgIC8vIOeUu+WDj+OBruacgOmrmOWuuemHj+OCkuaMh+WumlxyXG4gICAgICAgICAgICBtYXhTaXplID0gMTAwMDAwLFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgKOS+iylcclxuICAgIG5ldyBJbWFnZVByZXZpZXcoe1xyXG4gICAgICAgIGNsYXNzTmFtZXM6IHtcclxuICAgICAgICAgICAgcm9vdDogJy5qcy1pbWFnZS1wcmV2aWV3JyxcclxuICAgICAgICAgICAgY2hpbGRzOiB7XHJcbiAgICAgICAgICAgICAgICBkcm9wQXJlYTogJ19fZHJvcGFyZWEnLFxyXG4gICAgICAgICAgICAgICAgaW1nVGFnOiAnX19pbWcnLFxyXG4gICAgICAgICAgICAgICAgaW1nTmFtZTogJ19faW1nLW5hbWUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfSlcclxuKi9cclxuXHJcbmltcG9ydCB7IEhUTUxFbGVtZW50RXZlbnQgfSBmcm9tICcuL0ludGVyZmFjZXMvSFRNTEVsZW1lbnRFdmVudCc7XHJcbmltcG9ydCB7IEltYWdlVmFsaWRhdGlvbiB9IGZyb20gJy4vSW1hZ2VWYWxpZGF0aW9uJztcclxuXHJcbi8vIOWtkOimgee0oOOBruOCr+ODqeOCueWQjeOBi0hUTUxFbGVtZW5044KS5oy/5YWl44GZ44KLXHJcbmludGVyZmFjZSBDaGlsZEhUTUxDbGFzc01lbWJlcjxUPiB7XHJcbiAgICBwcmV2aWV3OiBULFxyXG4gICAgZm9ybTogVCxcclxuICAgIG1lZGlhRmlsZU5hbWU6IFQgXHJcbn1cclxuXHJcbi8vIOOCs+ODs+OCueODiOODqeOCr+OCv+OBruW8leaVsFxyXG5pbnRlcmZhY2UgQXJnUHJvcGF0aWVzIHtcclxuICAgIGNsYXNzTmFtZXM6IHtcclxuICAgICAgICByb290OiBzdHJpbmcsXHJcbiAgICAgICAgY2hpbGRzOiBDaGlsZEhUTUxDbGFzc01lbWJlcjxzdHJpbmc+LFxyXG4gICAgICAgIHN3aXRjaGVyPzogc3RyaW5nLFxyXG4gICAgfSxcclxuICAgIHZhbGlkYXRpb246IEltYWdlVmFsaWRhdGlvblByb3BhdGllc1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW1hZ2VWYWxpZGF0aW9uUHJvcGF0aWVzIHtcclxuICAgIHJhdGlvQ29uZmlnPzoge1xyXG4gICAgICAgIHJhdGlvczogQXJyYXk8e1xyXG4gICAgICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IG51bWJlclxyXG4gICAgICAgIH0+LFxyXG4gICAgICAgIGJ1ZmZlcj86IG51bWJlclxyXG4gICAgfSxcclxuICAgIHNpemVzPzoge1xyXG4gICAgICAgIG1pbjogbnVtYmVyLFxyXG4gICAgICAgIG1heDogbnVtYmVyXHJcbiAgICB9XHJcbiAgICBleHRlbnNpb25zOiBBcnJheTxzdHJpbmc+LFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VQcmV2aWV3IHtcclxuICAgIHByaXZhdGUgcm9vdEVsZW1lbnRzOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PjtcclxuICAgIHByaXZhdGUgY2hpbGRFbGVtZW50TWVtYmVyc0FycmF5OiB7W2tleTogbnVtYmVyXTogQ2hpbGRIVE1MQ2xhc3NNZW1iZXI8SFRNTEVsZW1lbnQ+fSA9IHt9O1xyXG4gICAgcHJpdmF0ZSByb290Q2xhc3NOYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGNoaWxkQ2xhc3NOYW1lczogQ2hpbGRIVE1MQ2xhc3NNZW1iZXI8c3RyaW5nPjtcclxuICAgIHByaXZhdGUgdmFsaWRPcHRzOiBJbWFnZVZhbGlkYXRpb25Qcm9wYXRpZXM7XHJcbiAgICBwcml2YXRlIHN3aXRjaGVySFRNTENsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFyZ3M6IEFyZ1Byb3BhdGllcykge1xyXG4gICAgICAgIHRoaXMucm9vdENsYXNzTmFtZSA9IGFyZ3MuY2xhc3NOYW1lcy5yb290O1xyXG4gICAgICAgIHRoaXMuY2hpbGRDbGFzc05hbWVzID0ge1xyXG4gICAgICAgICAgICBwcmV2aWV3OiBhcmdzLmNsYXNzTmFtZXMuY2hpbGRzLnByZXZpZXcsXHJcbiAgICAgICAgICAgIGZvcm06IGFyZ3MuY2xhc3NOYW1lcy5jaGlsZHMuZm9ybSxcclxuICAgICAgICAgICAgbWVkaWFGaWxlTmFtZTogYXJncy5jbGFzc05hbWVzLmNoaWxkcy5tZWRpYUZpbGVOYW1lLFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkT3B0cyA9IGFyZ3MudmFsaWRhdGlvbjtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVxdWlyZUVsZW1lbnRzKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yb290RWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCByb290RWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLnJvb3RFbGVtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBjaGlsZEVsZW1lbnRNZW1iZXJzOiBDaGlsZEhUTUxDbGFzc01lbWJlcjxIVE1MRWxlbWVudD4gPSB0aGlzLmNoaWxkRWxlbWVudE1lbWJlcnNBcnJheVtpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJJbWFnZShyb290RWxlbWVudCwgY2hpbGRFbGVtZW50TWVtYmVycyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdvdmVyKHJvb3RFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2xlYXZlKHJvb3RFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlKG1zZ051bTogbnVtYmVyLCBhZGRJbmZvID0gbnVsbCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IG1zZzogc3RyaW5nO1xyXG4gICAgICAgIHN3aXRjaChtc2dOdW0pIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gcm9vdOOBrkhUTUzjgq/jg6njgrnjgYzjgarjgYTmmYLjgavkvb/nlKhcclxuICAgICAgICAgICAgICAgIG1zZyA9ICfjgq/jg6njgrnlkI3jgIwnICsgYWRkSW5mbyArICfjgI3jgYzlrZjlnKjjgZfjgb7jgZvjgpMnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8g5a2Q6KaB57Sg44Gu44Kv44Op44K544GM6Laz44KK44Gq44GE44Go44GN44Gr5L2/55SoXHJcbiAgICAgICAgICAgICAgICBtc2cgPSAn44Kv44Op44K55ZCN44CMJyArIGFkZEluZm8gKyAn44CN44GM5a2Y5Zyo44GX44Gq44GE566H5omA44GM44GC44KK44G+44GZ44CC44GU56K66KqN44Gu5LiK6L+95Yqg44KS6aGY44GE44G+44GZ44CCJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbXNnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSZXF1aXJlRWxlbWVudHMoKSB7XHJcbiAgICAgICAgLy8g44Or44O844OI6KaB57Sg44GuSFRNTOOCkuWPluW+l1xyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyB0aGlzLnJvb3RDbGFzc05hbWUpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnJvb3RFbGVtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLm1lc3NhZ2UoMSwgdGhpcy5yb290Q2xhc3NOYW1lKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIOOBneOBrumFjeS4i+OBq+W/heimgeOBquWtkOimgee0oOOBjOOBhOOCi+OBi+aknOiovOOBl+OAgeOBhOOBquOBi+OBo+OBn+OCieOCqOODqeODvOOAgeOBhOOBn+OCiXRoaXMuY2hpbGRFbGVtZW50TWVtYmVyc+OBq+i/veWKoOOBmeOCi1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucm9vdEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW50ZXJmYWNl44Gua2V544GM44Gq44GE44Gf44KB5Z6L44Ko44Op44O844CC5b6M44Gn5rK744GZXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZEVsZW1lbnRNZW1iZXJzQXJyYXlbaV0gPSB7fVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY2hpbGRDbGFzc05hbWVz44GL44KJ44Oh44Oz44OQ44O85ZCN44KS5Y+C54WnXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5jaGlsZENsYXNzTmFtZXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLnJvb3RFbGVtZW50c1tpXS5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMucm9vdENsYXNzTmFtZSArIHRoaXMuY2hpbGRDbGFzc05hbWVzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjaGlsZEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRFbGVtZW50TWVtYmVyc0FycmF5W2ldW2tleV0gPSBjaGlsZEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5tZXNzYWdlKDIsIHRoaXMucm9vdENsYXNzTmFtZSArIHRoaXMuY2hpbGRDbGFzc05hbWVzW2tleV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJuYW1lOlwiLCBlLm5hbWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibWVzc2FnZTpcIiwgZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInN0YWNrOlwiLCBlLnN0YWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVySW1hZ2Uocm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjaGlsZEVsZW1lbnRNZW1iZXJzOiBDaGlsZEhUTUxDbGFzc01lbWJlcjxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICByb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZTogSFRNTEVsZW1lbnRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU9iajogYW55ID0gZS50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmi6HlvLXlrZDjga7mpJzoqLxcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvblJlc3VsdDogW2Jvb2xlYW4sIHN0cmluZ10gPSBJbWFnZVZhbGlkYXRpb24uY2hrRXh0ZW5zaW9uKGZpbGVPYmoudHlwZSwgdGhpcy52YWxpZE9wdHMuZXh0ZW5zaW9ucyk7XHJcbiAgICAgICAgICAgICAgICBpZiggISBleHRlbnNpb25SZXN1bHRbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXh0ZW5zaW9uUmVzdWx0WzFdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOeUu+WDj+OCteOCpOOCuuOBruaknOiovFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2l6ZVJlc3VsdDogW2Jvb2xlYW4sIHN0cmluZ10gPSBJbWFnZVZhbGlkYXRpb24uY2hrU2l6ZShmaWxlT2JqLnNpemUsIHRoaXMudmFsaWRPcHRzLnNpemVzKTtcclxuICAgICAgICAgICAgICAgIGlmKCAhIHNpemVSZXN1bHRbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2l6ZVJlc3VsdFsxXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJuYW1lOlwiLCBlcnIubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibWVzc2FnZTpcIiwgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInN0YWNrOlwiLCBlcnIuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbWFnZU9iaiA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YVVSTDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNyY+OBq+a4oeOBo+OBpuOBjeOBn+ODh+ODvOOCv+OCkuWHpueQhlxyXG4gICAgICAgICAgICAgICAgaW1hZ2VPYmouYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmuKHjgaPjgabjgY3jgZ/nlLvlg4/jga53aWR0aOOAgWhlaWdodOOCkuS/neWtmFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlU2l6ZXM6IHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBpbWFnZU9iai5uYXR1cmFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaW1hZ2VPYmoubmF0dXJhbEhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBCbG9iVVJM44Gv44OH44O844K/VVJM44Go44GX44Gm5L+d5a2YKFByZXZpZXcp6KGo56S644Gu6Zqb44Gr5L2/55SoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVVSTCA9IGltYWdlT2JqLnNyYztcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGltYWdlU2l6ZXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEZpbGXjgqrjg5bjgrjjgqfjgq/jg4jjgpJCbG9iVVJM44Gr5aSJ5o+b44GX44CBSW1hZ2Xjgqrjg5bjgrjjgqfjgq/jg4jjga5zcmPjgavmuKHjgZlcclxuICAgICAgICAgICAgICAgIGltYWdlT2JqLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZU9iaik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKChpbWFnZVNpemVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g55S75YOP5q+U546H44Gu5qSc6Ki8XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmF0aW9SZXN1bHQ6IFtib29sZWFuLCBzdHJpbmddID0gSW1hZ2VWYWxpZGF0aW9uLmNoa1JhdGlvKGltYWdlU2l6ZXMsIHRoaXMudmFsaWRPcHRzLnJhdGlvQ29uZmlnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihyYXRpb1Jlc3VsdFswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnRNZW1iZXJzLnByZXZpZXcuc2V0QXR0cmlidXRlKCdzcmMnLCBkYXRhVVJMKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50TWVtYmVycy5tZWRpYUZpbGVOYW1lLmlubmVySFRNTCA9IGZpbGVPYmoubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJhdGlvUmVzdWx0WzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibmFtZTpcIiwgZS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibWVzc2FnZTpcIiwgZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic3RhY2s6XCIsIGUuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhZ292ZXIocm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBmdW5jdGlvbihlOiBIVE1MRWxlbWVudEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnaXMtZHJhZy1vdmVyJyk7XHJcbiAgICAgICAgfSwgZmFsc2UpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYWdsZWF2ZShyb290RWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICByb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBmdW5jdGlvbihlOiBIVE1MRWxlbWVudEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnaXMtZHJhZy1vdmVyJyk7XHJcbiAgICAgICAgfSwgZmFsc2UpXHJcbiAgICB9XHJcblxyXG59IiwiLypcclxuXHJcbueUu+WDj+OBq+mWouOBmeOCi+ODkOODquODh+ODvOOCt+ODp+ODs+OCkuihjOOBhlxyXG5cclxuKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBJbWFnZVZhbGlkYXRpb24ge1xyXG4gICAgc3RhdGljIHNpemVzID0ge1xyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAgICBtYXg6IDEwMDAwMDAwXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgYWxsb3dFeHRlbnNpb25zOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAnanBnJyxcclxuICAgICAgICAnanBlZycsXHJcbiAgICAgICAgJ2dpZicsXHJcbiAgICAgICAgJ3BuZydcclxuICAgIF07XHJcbiAgICBzdGF0aWMgYWxsb3dSYXRpb3MgPSB7XHJcbiAgICAgICAgcmF0aW9zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNixcclxuICAgICAgICAgICAgICAgIGhlaWdodDogOVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogM1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICAvLyDlt67liIboqLHlrrk1JVxyXG4gICAgICAgIGJ1ZmZlcjogMC4wNVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyDjgqjjg6njg7zjgIHjgZ3jga7ku5bjg6Hjg4Pjgrvjg7zjgrjjgavjgabkvb/nlKhcclxuICAgIHN0YXRpYyBtZXNzYWdlKGVycm9yTnVtOiBudW1iZXIsIGFkZEluZm8gPSBudWxsKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIHN3aXRjaChlcnJvck51bSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ2pwZ+OAgWpwZWfjgIFwbmfjgIFnaWbku6XlpJbjga7jg5Xjgqnjg7zjg57jg4Pjg4jjga7jgoLjga7jgpLmjIflrprjgZfjgarjgYTjgafjgY/jgaDjgZXjgYQnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICfnlLvlg4/jgpLmjIflrprjgZfjgabjgY/jgaDjgZXjgYQnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICfnlLvlg4/jgrXjgqTjgrrjga8nICsgdGhpcy5zaXplcy5tYXggKyAn44KI44KK5bCP44GV44GE44KC44Gu44KS5oyH5a6a44GX44Gm44GP44Gg44GV44GEJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAn55S75YOP44K144Kk44K644GvJyArIHRoaXMuc2l6ZXMubWluICsgJ+OCiOOCiuWkp+OBjeOBhOOCguOBruOCkuaMh+WumuOBl+OBpuOBj+OBoOOBleOBhCc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBsZXQgcmF0aW9zOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvd1JhdGlvcy5yYXRpb3MuZm9yRWFjaCgoYWxsb3dSYXRpbzoge1trZXk6IHN0cmluZ106IG51bWJlcn0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihhbGxvd1JhdGlvLndpZHRoICYmIGFsbG93UmF0aW8uaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGlvcyArPSBgJHthbGxvd1JhdGlvLndpZHRofToke2FsbG93UmF0aW8uaGVpZ2h0feOAgWBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBg57im5qiq5q+U44GvJHtyYXRpb3N944Gu44Gp44KM44GL44Gn5oyH5a6a44GX44Gm44GP44Gg44GV44GEYFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5ouh5by15a2Q44CB44OH44O844K/6KaP5qC8KGltYWdl44Gu44G/KeOCkuWIpOWumlxyXG4gICAgc3RhdGljIGNoa0V4dGVuc2lvbihtaW1lVHlwZTogc3RyaW5nLCBvcHRzOiBBcnJheTxzdHJpbmc+IHwgbnVsbCA9IG51bGwpOiBbYm9vbGVhbiwgc3RyaW5nXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBlcnJNc2c6IHN0cmluZztcclxuICAgICAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSBtaW1lVHlwZS5zcGxpdCgnLycpWzBdO1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbjogc3RyaW5nID0gbWltZVR5cGUuc3BsaXQoJy8nKVsxXTtcclxuICAgICAgICBsZXQgYWxsb3dFeHRlbnNpb25zOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBpZihvcHRzKSB7XHJcbiAgICAgICAgICAgIGFsbG93RXh0ZW5zaW9ucyA9IG9wdHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxsb3dFeHRlbnNpb25zID0gdGhpcy5hbGxvd0V4dGVuc2lvbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgICAgIC8vIOODgeOCp+ODg+OCr+WvvuixoeOBjGFsbG93RXh0ZW5zaW9uc+ODl+ODreODkeODhuOCo+OBq+WFpeOBo+OBpuOBhOOCi+OBi+aknOiovOOBmeOCi1xyXG4gICAgICAgICAgICBhbGxvd0V4dGVuc2lvbnMuZm9yRWFjaCgoYWxsb3dFeHRlbnNpb246IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoYWxsb3dFeHRlbnNpb24gPT09IGV4dGVuc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiggISByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGVyck1zZyA9IHRoaXMubWVzc2FnZSgxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVyck1zZyA9IHRoaXMubWVzc2FnZSgyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFtyZXN1bHQsIGVyck1zZ107XHJcbiAgICB9XHJcblxyXG4gICAgLy8g55S75YOP44K144Kk44K644KS5Yik5a6aXHJcbiAgICBzdGF0aWMgY2hrU2l6ZShzaXplOiBudW1iZXIsIG9wdHM6IHttaW46IG51bWJlciwgbWF4OiBudW1iZXJ9IHwgbnVsbCA9IG51bGwpOiBbYm9vbGVhbiwgc3RyaW5nXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBlcnJNc2c6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYob3B0cykge1xyXG4gICAgICAgICAgICB0aGlzLnNpemVzID0gb3B0cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHNpemUgPiB0aGlzLnNpemVzLm1heCkge1xyXG4gICAgICAgICAgICBlcnJNc2cgPSB0aGlzLm1lc3NhZ2UoMyk7XHJcbiAgICAgICAgfSBlbHNlIGlmKHNpemUgPCB0aGlzLnNpemVzLm1pbikge1xyXG4gICAgICAgICAgICBlcnJNc2cgPSB0aGlzLm1lc3NhZ2UoNCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbcmVzdWx0LCBlcnJNc2ddO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOeUu+WDj+OBrue4puaoquavlOOCkuWIpOWumlxyXG4gICAgc3RhdGljIGNoa1JhdGlvKHNpemVzOiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9LCBvcHRzID0gbnVsbCk6IFtib29sZWFuLCBzdHJpbmddIHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGVyck1zZzogc3RyaW5nO1xyXG5cclxuICAgICAgICBpZihvcHRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsb3dSYXRpb3MgPSBvcHRzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbGxvd1JhdGlvcy5yYXRpb3MuZm9yRWFjaCgoYWxsb3dSYXRpbzoge1trZXk6IHN0cmluZ106IG51bWJlcn0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYmFzZVJhdGlvOiBudW1iZXIgPSBhbGxvd1JhdGlvWydoZWlnaHQnXSAvIGFsbG93UmF0aW9bJ3dpZHRoJ107XHJcbiAgICAgICAgICAgIGNvbnN0IHJhdGlvOiBudW1iZXIgPSBzaXplc1snaGVpZ2h0J10gLyBzaXplc1snd2lkdGgnXTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHRoaXMuYWxsb3dSdGlvc+OBrue4puaoquOCkuWJsuOBo+OBn+aVsOOBqOW8leaVsOOBrue4puaoquOCkuWJsuOBo+OBn+aVsOOBjOODi+OCouOCpOOCs+ODvOODqyhidWZmZXLjgafmjIflrprjgZfjgZ/nr4Tlm7Ip44Gg44Gj44Gf5aC05ZCIdHJ1ZVxyXG4gICAgICAgICAgICBpZigoYmFzZVJhdGlvIDwgKHJhdGlvICsgdGhpcy5hbGxvd1JhdGlvcy5idWZmZXIpKSAmJiAoKGJhc2VSYXRpbyArIHRoaXMuYWxsb3dSYXRpb3MuYnVmZmVyKSA+IHJhdGlvKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXJyTXNnID0gdGhpcy5tZXNzYWdlKDUsIHRoaXMuYWxsb3dSYXRpb3MucmF0aW9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gW3Jlc3VsdCwgZXJyTXNnXVxyXG4gICAgfVxyXG59IiwiaW50ZXJmYWNlIENoaWxkSFRNTENsYXNzTWVtYmVyPFQsIFUgPSBULCBWID0gVD4ge1xyXG4gICAgYWRkOiBULFxyXG4gICAgcHJldmlldzogVFxyXG4gICAgZm9ybTogVSxcclxuICAgIG1vdmVzOiBWLFxyXG59XHJcblxyXG4vLyDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jga7lvJXmlbBcclxuaW50ZXJmYWNlIEFyZ1Byb3BhdGllcyB7XHJcbiAgICBjbGFzc05hbWVzOiB7XHJcbiAgICAgICAgcm9vdDogc3RyaW5nLFxyXG4gICAgICAgIGNoaWxkczogQ2hpbGRIVE1MQ2xhc3NNZW1iZXI8c3RyaW5nPixcclxuICAgICAgICBzd2l0Y2hlcj86IHN0cmluZyxcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFZpZGVvUHJldmlldyB7XHJcbiAgICBwcml2YXRlIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIC8vIGludGVyZmFjZeOBrmtleeOBjOOBquOBhOOBn+OCgeWei+OCqOODqeODvOOAguW+jOOBp+ayu+OBmVxyXG4gICAgcHJpdmF0ZSBjaGlsZEVsZW1lbnRNZW1iZXJzOiBDaGlsZEhUTUxDbGFzc01lbWJlcjxIVE1MRWxlbWVudCwgSFRNTElucHV0RWxlbWVudCwgSFRNTENvbGxlY3Rpb24+ID0ge307XHJcbiAgICBwcml2YXRlIHJvb3RDbGFzc05hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgY2hpbGRDbGFzc05hbWVzOiBDaGlsZEhUTUxDbGFzc01lbWJlcjxzdHJpbmc+O1xyXG4gICAgcHJpdmF0ZSBwcmV2aWV3RWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGFyZ3M6IEFyZ1Byb3BhdGllcykge1xyXG4gICAgICAgIHRoaXMucm9vdENsYXNzTmFtZSA9IGFyZ3MuY2xhc3NOYW1lcy5yb290O1xyXG4gICAgICAgIHRoaXMuY2hpbGRDbGFzc05hbWVzID0ge1xyXG4gICAgICAgICAgICBhZGQ6IGFyZ3MuY2xhc3NOYW1lcy5jaGlsZHMuYWRkLFxyXG4gICAgICAgICAgICBwcmV2aWV3OiBhcmdzLmNsYXNzTmFtZXMuY2hpbGRzLnByZXZpZXcsXHJcbiAgICAgICAgICAgIGZvcm06IGFyZ3MuY2xhc3NOYW1lcy5jaGlsZHMuZm9ybSxcclxuICAgICAgICAgICAgbW92ZXM6IGFyZ3MuY2xhc3NOYW1lcy5jaGlsZHMubW92ZXNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldFJlcXVpcmVFbGVtZW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdVUkwoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRQcmV2aWV3KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2UobXNnTnVtOiBudW1iZXIsIGFkZEluZm8gPSBudWxsKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgbXNnOiBzdHJpbmc7XHJcbiAgICAgICAgc3dpdGNoKG1zZ051bSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyByb29044GuSFRNTOOCr+ODqeOCueOBjOOBquOBhOaZguOBq+S9v+eUqFxyXG4gICAgICAgICAgICAgICAgbXNnID0gJ+OCr+ODqeOCueWQjeOAjCcgKyBhZGRJbmZvICsgJ+OAjeOBjOWtmOWcqOOBl+OBvuOBm+OCkyc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyDlrZDopoHntKDjga7jgq/jg6njgrnjgYzotrPjgorjgarjgYTjgajjgY3jgavkvb/nlKhcclxuICAgICAgICAgICAgICAgIG1zZyA9ICfjgq/jg6njgrnlkI3jgIwnICsgYWRkSW5mbyArICfjgI3jgYzlrZjlnKjjgZfjgarjgYTnrofmiYDjgYzjgYLjgorjgb7jgZnjgILjgZTnorroqo3jga7kuIrov73liqDjgpLpoZjjgYTjgb7jgZnjgIInO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgbXNnID0gJ3ByZXZpZXfjgpLooajnpLrjgZnjgotIVE1M44Gr44OX44Os44OT44Ol44O844Kv44Op44K544KS6L+95Yqg44GX44Gm44GP44Gg44GV44GEJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIG1zZyA9ICfjg5fjg6zjg5Pjg6Xjg7zjgpLlopfjgoTjgZnjgajjgY3jga/jgZnjgbnjgabln4vjgoHjgabjgYvjgonjgavjgZfjgabjgY/jgaDjgZXjgYQnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtc2c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJlcXVpcmVFbGVtZW50cygpIHtcclxuICAgICAgICAvLyDjg6vjg7zjg4jopoHntKDjga5IVE1M44KS5Y+W5b6XXHJcbiAgICAgICAgdGhpcy5yb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5yb290Q2xhc3NOYW1lKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYoICEgdGhpcy5yb290RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMubWVzc2FnZSgxLCB0aGlzLnJvb3RDbGFzc05hbWUpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIOOBneOBrumFjeS4i+OBq+W/heimgeOBquWtkOimgee0oOOBjOOBhOOCi+OBi+aknOiovOOBl+OAgeOBhOOBquOBi+OBo+OBn+OCieOCqOODqeODvOOAgeOBhOOBn+OCiXRoaXMuY2hpbGRFbGVtZW50TWVtYmVyc+OBq+i/veWKoOOBmeOCi1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jaGlsZENsYXNzTmFtZXPjgYvjgonjg6Hjg7Pjg5Djg7zlkI3jgpLlj4LnhadcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2hpbGRDbGFzc05hbWVzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoa2V5ID09PSAnbW92ZXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudCA9IHRoaXMucm9vdEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnJvb3RDbGFzc05hbWUgKyB0aGlzLmNoaWxkQ2xhc3NOYW1lc1trZXldKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQgPSB0aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5yb290Q2xhc3NOYW1lICsgdGhpcy5jaGlsZENsYXNzTmFtZXNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNoaWxkRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkRWxlbWVudE1lbWJlcnNba2V5XSA9IGNoaWxkRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5tZXNzYWdlKDIsIHRoaXMucm9vdENsYXNzTmFtZSArIHRoaXMuY2hpbGRDbGFzc05hbWVzW2tleV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibmFtZTpcIiwgZS5uYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm1lc3NhZ2U6XCIsIGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdGFjazpcIiwgZS5zdGFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcHJldmlld1VSTCgpIHtcclxuICAgICAgICB0aGlzLmNoaWxkRWxlbWVudE1lbWJlcnNbJ2Zvcm0nXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gdGhpcy5jaGlsZEVsZW1lbnRNZW1iZXJzWydmb3JtJ10udmFsdWU7XHJcbiAgICAgICAgICAgIGlmKCAhIHVybCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRoaXMuY2hpbGRFbGVtZW50TWVtYmVyc1snbW92ZXMnXSwgKG1vdmVFbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoICEgbW92ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpZXdFbGVtZW50OiBIVE1MRWxlbWVudCA9IG1vdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5yb290Q2xhc3NOYW1lICsgdGhpcy5jaGlsZENsYXNzTmFtZXNbJ3ByZXZpZXcnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocHJldmlld0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlld0VsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5tZXNzYWdlKDMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFByZXZpZXcoKSB7XHJcbiAgICAgICAgY29uc3QgbW92ZUVsZW1lbnRzOiBIVE1MQ29sbGVjdGlvbiA9IHRoaXMuY2hpbGRFbGVtZW50TWVtYmVyc1snbW92ZXMnXTtcclxuICAgICAgICBjb25zdCBhZGRFbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuY2hpbGRFbGVtZW50TWVtYmVyc1snYWRkJ107XHJcblxyXG4gICAgICAgIC8vIHBsdXPjg5zjgr/jg7PjgpLmirzjgZfjgZ/jgonlr77osaHjgpLov73liqDjgZnjgovlh6bnkIZcclxuICAgICAgICBhZGRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpc0FkZEVuYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBzcmPjgavkvZXjgoLlhaXjgaPjgabjgYTjgarjgYTnirbmhYvjga7jgoLjga7jgpLkvZXlgIvjgoLlopfjgoTjgZnjga7jgpLpmLLjgZDjgZ/jgoFcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChtb3ZlRWxlbWVudHMsIChtb3ZlRWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKCAhIG1vdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnaXMtYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0FkZEVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGlmKCAhIGlzQWRkRW5hYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCh0aGlzLm1lc3NhZ2UoNCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZFRhcmdldDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+bW92ZUVsZW1lbnRzWzBdLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdE1vdmVFbGVtZW50OiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5tb3ZlRWxlbWVudHNbbW92ZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gcGFyc2VJbnQobGFzdE1vdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGFzdE1vdmVFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGFkZFRhcmdldCwgbGFzdE1vdmVFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyk7XHJcbiAgICAgICAgICAgIGFkZFRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBTdHJpbmcoaW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIGFkZFRhcmdldC5jbGFzc0xpc3QuYWRkKCd1LW10LTUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGFkZFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWFjdGl2ZScpKSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgYWRkVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgYWRkVGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tZWRpYS1wcmV2aWV3X19wcmV2aWV3JykucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCIvLyB0c1xyXG5pbXBvcnQgJy4vdG9wcGFnZSc7XHJcbmltcG9ydCAnLi92aWRlb3NwYWdlJztcclxuXHJcbi8vIHNhc3NcclxuaW1wb3J0ICcuLi9zYXNzL2FwcC5zY3NzJzsiLCJpbXBvcnQgeyBJbWFnZVByZXZpZXcgfSBmcm9tICcuL0NsYXNzZXMvSW1hZ2VQcmV2aWV3JztcclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICBpZihzZWFyY2hQYXJhbXMuZ2V0KCdwYWdlJykgIT09ICdUT1AnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5ldyBJbWFnZVByZXZpZXcoe1xyXG4gICAgICAgIGNsYXNzTmFtZXM6IHtcclxuICAgICAgICAgICAgcm9vdDogJ2pzLWltYWdlLXByZXZpZXcnLFxyXG4gICAgICAgICAgICBjaGlsZHM6IHtcclxuICAgICAgICAgICAgICAgIGZvcm06ICdfX2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgcHJldmlldzogJ19fcHJldmlldycsXHJcbiAgICAgICAgICAgICAgICBtZWRpYUZpbGVOYW1lOiAnX19pbWctbmFtZSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmFsaWRhdGlvbjoge1xyXG4gICAgICAgICAgICBzaXplczoge1xyXG4gICAgICAgICAgICAgICAgbWluOiAxLFxyXG4gICAgICAgICAgICAgICAgbWF4OiAxMDAwMDAwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHRlbnNpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAnanBnJyxcclxuICAgICAgICAgICAgICAgICdqcGVnJyxcclxuICAgICAgICAgICAgICAgICdnaWYnLFxyXG4gICAgICAgICAgICAgICAgJ3BuZydcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcmF0aW9Db25maWc6IHtcclxuICAgICAgICAgICAgICAgIHJhdGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgLy8g5beu5YiG6Kix5a65NSVcclxuICAgICAgICAgICAgICAgIGJ1ZmZlcjogMC4wNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXZpZGVvLXByZXZpZXcnKTtcclxuICAgICAgICBjb25zdCBmb3JtRWxlbWVudDogSFRNTElucHV0RWxlbWVudCA9IHJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy12aWRlby1wcmV2aWV3X19mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgcHJldmlld0VsZW1lbnQ6IEhUTUxFbGVtZW50ID0gcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXZpZGVvLXByZXZpZXdfX3ByZXZpZXcnKTtcclxuICAgICAgICBjb25zdCBzd2l0Y2hlckVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gcm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXZpZGVvLXByZXZpZXdfX3N3aXRjaGVyJyk7XHJcbiAgICAgICAgbGV0IG9sZFVSTDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICAgICAgZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1VSTDogc3RyaW5nID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgaWYoICEgbmV3VVJMKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihuZXdVUkwgPT09IG9sZFVSTCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2hlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHByZXZpZXdFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgbmV3VVJMKTtcclxuICAgICAgICAgICAgb2xkVVJMID0gbmV3VVJMXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59KSgpOyIsImltcG9ydCB7IFZpZGVvUHJldmlldyB9IGZyb20gJy4vQ2xhc3Nlcy9WaWRlb1ByZXZpZXcnO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuICAgIGlmKHNlYXJjaFBhcmFtcy5nZXQoJ3BhZ2UnKSAhPT0gJ3ZpZGVvcycpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3IFZpZGVvUHJldmlldyh7XHJcbiAgICAgICAgY2xhc3NOYW1lczoge1xyXG4gICAgICAgICAgICByb290OiAnanMtbWVkaWEtcHJldmlldycsXHJcbiAgICAgICAgICAgIGNoaWxkczoge1xyXG4gICAgICAgICAgICAgICAgYWRkOiAnX19hZGQnLFxyXG4gICAgICAgICAgICAgICAgcHJldmlldzogJ19fcHJldmlldycsXHJcbiAgICAgICAgICAgICAgICBmb3JtOiAnX19mb3JtJyxcclxuICAgICAgICAgICAgICAgIG1vdmVzOiAnX19tb3ZlLWFibGUnLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCkiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3Jlc291cmNlL3RzL2FwcC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=