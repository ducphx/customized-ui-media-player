"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Generates the theme object for the component from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @return {Object} The final theme object with the overrides and component variables
 */
const generateComponentTheme = theme => {
  // the props of the theme you want to use
  const colors = theme.colors,
        borders = theme.borders,
        spacing = theme.spacing,
        typography = theme.typography,
        themeName = theme.key; // if you need different styling in specific themes,
  // add them here with the key of the theme

  const themeSpecificStyle = {
    'canvas-high-contrast': {
      progressSeparatorBorder: '1px solid black'
    },
    canvas: {}
  }; // map the theme variables to component specific style variables,
  // and use optional chaining (?.)

  const componentVariables = {
    backgroundColor: colors === null || colors === void 0 ? void 0 : colors.licorice,
    border: `1px solid ${colors === null || colors === void 0 ? void 0 : colors.licorice}`,
    bufferedBackgroundColor: colors === null || colors === void 0 ? void 0 : colors.oxford,
    progressBackgroundColor: '#54C0FF',
    progressSeparatorBorder: 'none',
    restBackgroundColor: 'transparent',
    focusOutlineColor: colors === null || colors === void 0 ? void 0 : colors.white,
    timestampFontWeight: typography === null || typography === void 0 ? void 0 : typography.fontWeightNormal,
    timestampColor: colors === null || colors === void 0 ? void 0 : colors.white,
    timestampBackgroundColor: colors === null || colors === void 0 ? void 0 : colors.oxford,
    timestampBorderRadius: '0.125rem',
    timestampFontSize: typography === null || typography === void 0 ? void 0 : typography.fontSizeXSmall,
    timestampPadding: `0 0.25rem`,
    timeStampMargin: `0 ${spacing === null || spacing === void 0 ? void 0 : spacing.small}`,
    timestampZIndex: 1,
    tooltipTop: '-2.15rem',
    tooltipPadding: `0.25rem 0.5rem`,
    tooltipFontWeight: typography === null || typography === void 0 ? void 0 : typography.fontWeightNormal,
    tooltipBackgroundColor: colors === null || colors === void 0 ? void 0 : colors.oxford,
    tooltipColor: colors === null || colors === void 0 ? void 0 : colors.white,
    tooltipCaretSize: spacing === null || spacing === void 0 ? void 0 : spacing.xxSmall,
    tooltipFontSize: typography === null || typography === void 0 ? void 0 : typography.fontSizeSmall,
    tooltipLineWidth: borders === null || borders === void 0 ? void 0 : borders.widthMedium,
    tooltipBorderRadius: '0.125rem',
    markerZIndex: 2,
    playheadButtonZIndex: 3
  }; // return with the final theme object of the component
  // with the added theme specific overrides

  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, componentVariables), themeSpecificStyle[themeName]);
};

var _default = generateComponentTheme;
exports.default = _default;