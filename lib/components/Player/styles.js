"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _constants = require("../../constants");

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
const generateLabel = base => function () {
  let suffix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
  return base + suffix;
};

const generateStyle = (componentTheme, props, state) => {
  const fullScreenContainerLabelGenerator = generateLabel('fullScreenContainer');
  const mediaPlayerContainerLabelGenerator = generateLabel('mediaPlayerContainer');
  const fullScreenContainerWindow = {
    label: fullScreenContainerLabelGenerator('-window'),
    height: 'auto',
    width: 'auto',
    minHeight: 'inherit',
    minWidth: 'inherit',
    maxWidth: 'inherit',
    maxHeight: 'inherit'
  };
  const fluidWidth = {
    width: '100%'
  };
  const fluidHeight = {
    height: '100%'
  };
  return {
    fullScreenContainer: (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({
      label: fullScreenContainerLabelGenerator(),
      height: '100%',
      width: '100%'
    }, state.screenState === _constants.WINDOWED_SCREEN && fullScreenContainerWindow), props.fluidWidth && (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fluidWidth), {}, {
      label: fullScreenContainerLabelGenerator('-fluidWidth')
    })), props.fluidHeight && (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fluidHeight), {}, {
      label: fullScreenContainerLabelGenerator('-fluidHeight')
    })), props.fluidWidth && props.fluidHeight && {
      label: fullScreenContainerLabelGenerator('-fluidWidth-fluidHeight')
    }), {}, {
      '&:fullscreen video': {
        height: '100%'
      }
    }),
    mediaPlayerContainer: (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({
      label: mediaPlayerContainerLabelGenerator(),
      position: 'relative',
      transition: 'height 0.1s ease-in-out',
      height: '100%',
      minHeight: 'inherit',
      minWidth: 'inherit',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
      backgroundColor: 'rgb(0, 0, 0)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }, props.fluidWidth && (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fluidWidth), {}, {
      label: mediaPlayerContainerLabelGenerator('-fluidWidth')
    })), props.fluidHeight && (0, _objectSpread2.default)((0, _objectSpread2.default)({}, fluidHeight), {}, {
      label: mediaPlayerContainerLabelGenerator('-fluidHeight')
    })), props.fluidWidth && props.fluidHeight && {
      label: mediaPlayerContainerLabelGenerator('-fluidWidth-fluidHeight')
    }), {}, {
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 ${componentTheme.focusOutlineWeight} ${componentTheme.focusOutlineColor}`
      }
    }),
    playerRendererContainer: {
      label: 'playerRendererContainer',
      height: '100%',
      width: '100%',
      minHeight: 'inherit',
      minWidth: 'inherit',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };
};

var _default = generateStyle;
exports.default = _default;