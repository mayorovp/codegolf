/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://mayorovp.github.io/codegolf/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var questionUrl = document.getElementById("question-url");
	questionUrl.onchange = function () {
	    var m = questionUrl.value.match(/\/questions\/(\d+)\//);
	    var id = m && m[1] || "{{QUESTION_ID}}";
	    snippetText.value = template.join(id);
	    snippetExecute.contentWindow.execute(id);
	};

	var template = __webpack_require__(1).split("{{QUESTION_ID}}");
	var snippetText = document.getElementById("snippet-text");
	snippetText.value = template.join("{{QUESTION_ID}}");

	var snippetExecute = document.getElementById("snippet-execute");
	snippetExecute.onload = function () {
	    var snippetExecuteScript = snippetExecute.contentDocument.createElement("script");
	    snippetExecuteScript.src = __webpack_require__(2).table.localPath;
	    snippetExecute.contentDocument.head.appendChild(snippetExecuteScript);
	    snippetExecute.contentDocument.body.innerHTML = __webpack_require__(6);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<!-- begin snippet: js hide: true console: true babel: false -->\n\n<!-- language: lang-html -->\n\n    <script src=\"" + __webpack_require__(2).table.publicPath + "\"></script>\n    " + __webpack_require__(3).split("\n").join("    \n") + "\n\n<!-- language: lang-css -->\n\n    " + __webpack_require__(4).toString().split("\n").join("    \n") + "\n\n<!-- language: lang-js -->\n\n    execute({{QUESTION_ID}});\n\n<!-- end snippet -->\n";

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = assetsByChunkName;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<div class=cssload-container><div class=cssload-cube><div class=cssload-half1><div class=\"cssload-side cssload-s1\"></div><div class=\"cssload-side cssload-s2\"></div><div class=\"cssload-side cssload-s5\"></div></div><div class=cssload-half2><div class=\"cssload-side cssload-s3\"></div><div class=\"cssload-side cssload-s4\"></div><div class=\"cssload-side cssload-s6\"></div></div></div></div>"

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".cssload-container,.cssload-cube{width:97px;height:97px;transform-style:preserve-3d}.cssload-container,.cssload-cube,.cssload-half1,.cssload-half2{transform-style:preserve-3d}.cssload-container{position:relative;margin:23px 84px;perspective:292px}.cssload-cube{animation:cube 11.5s forwards infinite;transform-origin:center 49px}.cssload-half1,.cssload-s1{top:0;transform-origin:50% 100%}.cssload-half1{height:39px;position:absolute;animation:half-fold 11.5s forwards infinite}.cssload-side{width:19px;height:19px;background:#ddd;position:absolute}.cssload-s1{left:39px;animation:s1ani 11.5s forwards infinite}.cssload-s2,.cssload-s3,.cssload-s4{left:39px;transform-origin:50% 0}.cssload-s2{top:19px;animation:s2ani 11.5s forwards infinite}.cssload-s3{top:39px;animation:s3ani 11.5s forwards infinite}.cssload-s4{top:58px;animation:s4ani 11.5s forwards infinite}.cssload-s5{left:19px;top:19px;transform-origin:100% 50%;animation:s5ani 11.5s forwards infinite}.cssload-s6{left:58px;top:39px;transform-origin:0 50%;animation:s6ani 11.5s forwards infinite}@keyframes cube{0%,30%{transform:rotateX(0)}40%{transform:rotateX(45deg) rotateY(0) rotate(45deg)}60%{transform:rotateX(60deg) rotateY(0) rotate(45deg)}65%,70%{transform:rotateX(60deg) rotate(45deg) rotate(180deg)}75%,80%{transform:rotateX(60deg) rotate(45deg) rotate(1turn)}90%{transform:rotateX(0) rotate(0) rotate(0)}}@keyframes s1ani{0%{opacity:1;transform:translateY(0);background:#ddd}40%{transform:rotateX(0);background:#ddd}50%{transform:rotateX(-90deg);background:#ddd}90%{transform:rotateX(-90deg)}}@keyframes s2ani{0%{opacity:0;transform:rotateX(-179deg)}10%{opacity:1;transform:rotateX(0)}40%{background:#ddd}45%,80%{background:#b4b4b4}65%{opacity:1;background:#b4b4b4}90%{opacity:1}to{opacity:0}}@keyframes s3ani{0%,10%{opacity:0;transform:rotateX(-179deg)}20%,90%{opacity:1;transform:rotateX(0)}40%{background:#ddd}45%{background:#969696}to{opacity:0}}@keyframes s4ani{0%,20%{opacity:0;transform:rotateX(-179deg)}10%,to{opacity:0}30%{opacity:1;transform:rotateX(0)}40%{transform:rotateX(0);background:#ddd}50%{transform:rotateX(90deg);background:#b4b4b4}80%{background:#b4b4b4}90%{opacity:1;transform:rotateX(90deg)}}@keyframes s5ani{0%,10%{opacity:0;transform:rotateY(-179deg)}20%{opacity:1;background:#ddd;transform:rotateY(0)}40%{transform:rotateY(0)}50%{transform:rotateY(90deg)}55%{background:#ddd}60%{background:#c8c8c8}90%{transform:rotateY(90deg);opacity:1}to{opacity:0}}@keyframes s6ani{0%,20%{opacity:0;transform:rotateY(179deg)}30%{opacity:1;transform:rotateY(0)}40%{transform:rotateY(0)}50%{transform:rotateY(-90deg);background:#ddd}60%,80%{background:#c8c8c8}90%{opacity:1;transform:rotateY(-90deg)}to{opacity:0}}@keyframes half-fold{0%,50%{transform:rotateX(0)}60%,90%{transform:rotateX(-90deg)}}", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "" + __webpack_require__(3) + "\n\n<style>\n" + __webpack_require__(4) + "\n</style>\n";

/***/ }
/******/ ]);