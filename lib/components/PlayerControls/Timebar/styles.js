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
const generateStyle = (componentTheme, props, state) => {
  const hoverTime = state.hoverTime;
  return {
    focusIndicator: {
      label: 'focusIndicator',
      display: 'none',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      pointerEvents: 'none',
      boxShadow: `inset 0 0 0 0.0625rem ${componentTheme.backgroundColor}`,
      border: `0.125rem solid ${componentTheme.focusOutlineColor}`
    },
    timebar: {
      label: 'timebar',
      flex: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      '&:focus': {
        outline: 'none'
      },
      '&:focus .focusIndicator': {
        display: 'block'
      }
    },
    buffered: {
      label: 'buffered',
      height: '100%',
      backgroundColor: componentTheme.bufferedBackgroundColor
    },
    viewed: {
      label: 'viewed',
      height: '100%',
      backgroundColor: componentTheme.progressBackgroundColor,
      borderRight: componentTheme.progressSeparatorBorder
    },
    rest: {
      label: 'rest',
      height: '100%',
      flex: 1,
      backgroundColor: componentTheme.restBackgroundColor
    },
    timebarWrapper: {
      label: 'timebarWrapper',
      display: 'flex',
      flexGrow: 1,
      position: 'relative',
      backgroundColor: componentTheme.backgroundColor,
      border: componentTheme.border
    },
    timebarContent: {
      label: 'timebarContent',
      backgroundColor: componentTheme.timestampBackgroundColor,
      borderRadius: componentTheme.timestampBorderRadius,
      color: componentTheme.timestampColor,
      fontWeight: componentTheme.timestampFontWeight,
      fontSize: componentTheme.timestampFontSize,
      padding: componentTheme.timestampPadding,
      margin: componentTheme.timeStampMargin,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: componentTheme.timestampZIndex
    },
    tooltipContainer: (0, _objectSpread2.default)((0, _objectSpread2.default)({
      label: 'tooltipContainer',
      backgroundColor: componentTheme.tooltipBackgroundColor,
      width: componentTheme.tooltipLineWidth,
      top: 0,
      bottom: 0,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none'
    }, !hoverTime && {
      label: 'tooltipContainer-hidden',
      visibility: 'hidden'
    }), {}, {
      '&:focus': {
        outline: 'none'
      }
    }),
    tooltipContent: {
      label: 'tooltipContent',
      marginTop: componentTheme.tooltipTop,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    tooltip: {
      label: 'tooltip',
      color: componentTheme.tooltipColor,
      fontWeight: componentTheme.tooltipFontWeight,
      fontSize: componentTheme.tooltipFontSize,
      backgroundColor: componentTheme.tooltipBackgroundColor,
      padding: componentTheme.tooltipPadding,
      borderRadius: componentTheme.tooltipBorderRadius
    },
    tooltipCaret: {
      label: 'tooltipCaret',
      width: 0,
      height: 0,
      borderTop: `${componentTheme.tooltipCaretSize} solid ${componentTheme.tooltipBackgroundColor}`,
      borderLeft: `${componentTheme.tooltipCaretSize} solid transparent`,
      borderRight: `${componentTheme.tooltipCaretSize} solid transparent`
    },
    tooltipLine: {
      label: 'tooltipLine',
      backgroundColor: componentTheme.tooltipBackgroundColor,
      width: componentTheme.tooltipLineWidth,
      height: componentTheme.tooltipLineHeight
    },
    playhead: {
      label: 'playhead',
      position: 'absolute',
      top: 0,
      '& button': {
        zIndex: componentTheme.playheadButtonZIndex
      }
    },
    markers: {
      label: 'markers',
      zIndex: componentTheme.markerZIndex
    }
  };
};

var _default = generateStyle;
exports.default = _default;