"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkDXchart"] = self["webpackChunkDXchart"] || []).push([["src_chart_components_yAxis-settings_yaxis-configurator-popover_component_tsx"],{

/***/ "./src/chart/components/yAxis-settings/yaxis-configurator-popover.component.tsx":
/*!**************************************************************************************!*\
  !*** ./src/chart/components/yAxis-settings/yaxis-configurator-popover.component.tsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   YAxisConfiguratorPopover: () => (/* binding */ YAxisConfiguratorPopover),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _yaxis_main_popover_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./yaxis-main-popover.component */ \"./src/chart/components/yAxis-settings/yaxis-main-popover.component.tsx\");\n\n\n\nconst YAxisConfiguratorPopover = react__WEBPACK_IMPORTED_MODULE_0___default().memo((props) => {\n  const {\n    onClose,\n    popoverCoordinates,\n    isOpened: isMainPopoverOpened,\n    config,\n    setFitType,\n    setAutoScale,\n    setAxisType,\n    labelsConfig,\n    setLabelMode,\n    selectDescription,\n    selectCountDownBarClose,\n    yAxisDict,\n    toggleLockPriceToBarRatio,\n    togglePriceScaleInverse,\n    setAxisAlign\n  } = props;\n  const [labelPopoverOpen, setLabelPopupOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const labelsAndLinesRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n  const toggleLabelAndLine = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => setLabelPopupOpen(!labelPopoverOpen), [labelPopoverOpen]);\n  const onLabelClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {\n    setLabelPopupOpen(false);\n    onClose();\n  }, [setLabelPopupOpen, onClose]);\n  const isRightAlign = config.chartCore.components.yAxis.align === \"right\";\n  const labelsPopoverPosition = isRightAlign ? \"left\" : \"right\";\n  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\n    _yaxis_main_popover_component__WEBPACK_IMPORTED_MODULE_1__.YAxisMainPopover,\n    {\n      setAxisAlign,\n      isOpened: isMainPopoverOpened,\n      onClose,\n      config,\n      popoverCoordinates,\n      changeFitType: setFitType,\n      toggleAutoScale: setAutoScale,\n      toggleLockPriceToBarRatio,\n      toggleAxisType: setAxisType,\n      labelPopoverOpen,\n      toggleLabelsPopup: toggleLabelAndLine,\n      yAxisDict,\n      togglePriceScaleInverse,\n      labelsAndLinesRef,\n      position: labelsPopoverPosition,\n      onLabelClose,\n      labelsConfig,\n      setLabelMode,\n      selectCountDownBarClose,\n      selectDescription,\n      labelsPopoverPosition\n    }\n  ));\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (YAxisConfiguratorPopover);\n\n\n//# sourceURL=webpack://DXchart/./src/chart/components/yAxis-settings/yaxis-configurator-popover.component.tsx?");

/***/ })

}]);