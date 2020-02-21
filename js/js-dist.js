/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_InputController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

window.InputController = _src_InputController_js__WEBPACK_IMPORTED_MODULE_0__["default"];

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class InputController {
  constructor(actions_to_bind, target) {
    //this.actions_to_bind = Object.assign({},_actions_to_bind);
    this.bindedActions = {};
    this.keys = {};
    this.enabled = false;
    this.focused = false;
    this.ACTION_ACTIVATED = "input-controller:action-activated";
    this.ACTION_DEACTIVATED = "input-controller:action-deactivated";
    this.bindActions(actions_to_bind);
    this.attach(target);
  }

  bindActions(actions_to_bind) {
    if (!actions_to_bind) return false;

    for (var newActionName in actions_to_bind) {
      let newAction = actions_to_bind[newActionName]; // Action

      let action = this.bindedActions[newActionName];
      if (!action) action = this.bindedActions[newActionName] = {};
      action.enabled = newAction.enabled;
      action.keys = newAction.keys;
      action.isActive = false; // Keys

      action.keys.forEach(keyCode => {
        let key = this.keys[keyCode];
        if (!key) key = this.keys[keyCode] = {
          isPressed: false,
          actions: {}
        };
        key.actions[newActionName] = action;
      });
    }

    console.log("bindedActions", this.bindedActions);
    console.log("keys", this.keys);
    return true;
  }

  enableAction(actions_name) {
    if (this.isActionActive(actions_name)) {
      return true;
    }

    return false;
  }

  disableAction(action_name) {
    if (this.isActionActive(action_name)) {
      for (let i = 0; i < this.actions_to_bind.length; i++) {
        if (this.actions_to_bind[i].action_name == action_name) {
          this.actions_to_bind[i].enabled = false;
        }
      }
    }
  }

  attach(target, dont_enable = false) {
    if (!target) return false;
    if (this.target) this.detach();
    this.target = target;
    this.target.addEventListener("keydown", e => {
      // console.log("keydown",e.keyCode);
      this._setKeyValue(e.keyCode, true);
    });
    this.target.addEventListener("keyup", e => {
      // console.log("keyup",e.keyCode);
      this._setKeyValue(e.keyCode, false);
    });
  }

  _setKeyValue(keyCode, value) {
    var key = this.keys[keyCode];
    if (!key) key = this.keys[keyCode] = {};
    key.isPressed = value;

    for (var actionName in key.actions) {
      key.actions[actionName].isActive = value;
    }
  }

  detach() {
    if (!this.target) return false;
    this.target = null;
  }

  isActionActive(actionName) {
    var action = this.bindedActions[actionName];
    if (!action) return false;
    return action.isActive;
  }

  isKeyPressed(keyCode) {
    return this.keys[keyCode].isPressed;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (InputController);

/***/ })
/******/ ]);
//# sourceMappingURL=js-dist.js.map