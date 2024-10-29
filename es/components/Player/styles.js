import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";

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
import { WINDOWED_SCREEN } from '../../constants';

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
    fullScreenContainer: _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
      label: fullScreenContainerLabelGenerator(),
      height: '100%',
      width: '100%'
    }, state.screenState === WINDOWED_SCREEN && fullScreenContainerWindow), props.fluidWidth && _objectSpread(_objectSpread({}, fluidWidth), {}, {
      label: fullScreenContainerLabelGenerator('-fluidWidth')
    })), props.fluidHeight && _objectSpread(_objectSpread({}, fluidHeight), {}, {
      label: fullScreenContainerLabelGenerator('-fluidHeight')
    })), props.fluidWidth && props.fluidHeight && {
      label: fullScreenContainerLabelGenerator('-fluidWidth-fluidHeight')
    }), {}, {
      '&:fullscreen video': {
        height: '100%'
      }
    }),
    mediaPlayerContainer: _objectSpread(_objectSpread(_objectSpread(_objectSpread({
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
    }, props.fluidWidth && _objectSpread(_objectSpread({}, fluidWidth), {}, {
      label: mediaPlayerContainerLabelGenerator('-fluidWidth')
    })), props.fluidHeight && _objectSpread(_objectSpread({}, fluidHeight), {}, {
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

export default generateStyle;