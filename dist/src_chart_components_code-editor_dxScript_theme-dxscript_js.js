"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkDXchart"] = self["webpackChunkDXchart"] || []).push([["src_chart_components_code-editor_dxScript_theme-dxscript_js"],{

/***/ "./src/chart/components/code-editor/dxScript/theme-dxscript.js":
/*!*********************************************************************!*\
  !*** ./src/chart/components/code-editor/dxScript/theme-dxscript.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initDxScriptTheme: () => (/* binding */ initDxScriptTheme)\n/* harmony export */ });\nfunction initDxScriptTheme() {\n  ace.define(\n    \"ace/theme/dxscript\",\n    [\"require\", \"exports\", \"module\", \"ace/lib/dom\"],\n    function(acequire, exports, module) {\n      exports.isDark = false;\n      exports.cssClass = \"ace-dxscript\";\n      exports.cssText = `.ace-dxscript .ace_gutter {background: transparent;color: #70706F;}.ace_gutter-cell {font-weight: 700;}.ace_content {}.ace-dxscript .ace_gutter-cell {padding-left: 6px;}.ace-dxscript .ace_folding-enabled > .ace_gutter-cell {padding-right: 11px;}.ace-dxscript .ace_scroller.ace_content {font-family: 'IBM Plex Mono SemiBold', monospace;}.ace-dxscript .ace_marker-layer .ace_selection {background: #FFAA002B !important;}.ace-dxscript {background: transparent;color: #DFDEDF;}.ace-dxscript .ace_keyword {font-weight: bold;color: #4890EA;}.ace-dxscript .ace_keyword.ace_operator.ace_logic {color: #A926FB;}.ace-dxscript .ace_keyword.ace_operator.ace_math {color: #42D5D2;}.ace-dxscript .ace_string {color: #B5DC25;}.ace-dxscript .ace_name.ace_function {color: #5BCCEA;}.ace-dxscript .ace_variable.ace_parameter {font-style: italic;}.ace-dxscript .ace_constant.ace_numeric {color: #F89749;}.ace-dxscript .ace_constant.ace_buildin {color: #000;}.ace-dxscript .ace_support.ace_function {color: #EAE48C;}.ace-dxscript .ace_support.ace_function.ace_editorenv {color: #047;font-style: italic;}.ace-dxscript .ace_support.ace_attribute {font-style: italic;}.ace-dxscript .ace_comment {color: #70706F;font-style: normal;}.ace-dxscript .ace_variable.ace_language  {color: #0086B3;}.ace-dxscript .ace_paren {font-weight: bold;}.ace-dxscript .ace_boolean {color: #e6411d;font-weight: normal;}.ace-dxscript .ace_string.ace_regexp {color: #009926;font-weight: normal;}.ace-dxscript .ace_variable.ace_instance {color: teal;}.ace-dxscript .ace_constant.ace_language {font-weight: normal;color: #00FF82;}.ace-dxscript .ace_cursor {color: #DFDEDF;}.ace-dxscript.ace_focus .ace_marker-layer .ace_active-line {background: #555555;}.ace-dxscript .ace_marker-layer .ace_active-line {background: #555555;}.ace-dxscript .ace_marker-layer .ace_selection {background: #b5d5ff;}.ace-dxscript.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-dxscript.ace_nobold .ace_line > span {font-weight: normal !important;}.ace-dxscript .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-dxscript .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-dxscript .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-dxscript .ace_gutter-active-line {background-color : rgba(0, 0, 0, 0.07);}.ace-dxscript .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-dxscript .ace_invisible {color: #BFBFBF}.ace_scrollbar {display: none !important;}.ace_gutter-cell.ace_error {background-image: none !important;background-position: unset;background-repeat: no-repeat;background-color: #D92C40;border-radius: 3px;color: #DFDEDF;}.dxScriptError {position: absolute !important;z-index: 3 !important;}.ace_tooltip {display: none !important;}.ace-dxscript.ace_editor.ace_autocomplete {font-weight: 600 !important;color: #DFDEDF !important;background: #262625 !important;border-radius: 6px !important;width: 200px !important;border: none !important;}.ace-dxscript .ace_completion-meta {color: #70706F !important;font-weight: 600 !important;}.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {background-color: #FFAA00 !important;opacity: 0.1 !important;}.ace-dxscript.ace_editor.ace_autocomplete .ace_scroller {width: 100% !important;}.ace-dxscript.ace_editor.ace_autocomplete .ace_line-hover {border: 1px solid #FFAA00 !important;background: transparent !important;opacity: 0.3 !important;}.ace-dxscript.ace_editor.ace_autocomplete .ace_completion-highlight {color: #FFAA00 !important;}.ace-dxscript .ace_indent-guide {background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;}`;\n      var dom = acequire(\"../lib/dom\");\n      dom.importCssString(exports.cssText, exports.cssClass);\n    }\n  );\n}\n\n\n//# sourceURL=webpack://DXchart/./src/chart/components/code-editor/dxScript/theme-dxscript.js?");

/***/ })

}]);