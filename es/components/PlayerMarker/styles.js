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
const generateStyle = (componentTheme, props, state) => {
  const active = props.active,
        onClick = props.onClick;
  const isFocused = state.isFocused,
        isHovered = state.isHovered;
  const isHoveredCompound = onClick && (active || isFocused || isHovered);
  const circleHovered = {
    label: 'circle-hovered',
    width: `calc(${componentTheme.radius} * 2)`,
    height: `calc(${componentTheme.radius} * 2)`,
    transitionProperty: 'width, height, top, left',
    transitionDuration: '0.2s'
  };
  const visibleIcon = {
    display: 'flex',
    opacity: 1
  };
  const hiddenIcon = {
    display: 'none',
    opacity: 0
  };
  return {
    container: {
      label: 'container',
      position: 'absolute',
      top: 0
    },
    circle: _objectSpread(_objectSpread({
      label: 'circle',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      pointerEvents: 'auto',
      width: componentTheme.radius,
      height: componentTheme.radius,
      left: 0,
      top: 0,
      transform: "translate(-50%, -50%)",
      padding: 0,
      outline: 0,
      backgroundColor: componentTheme.backgroundColor,
      border: `${componentTheme.borderWidth} solid ${componentTheme.borderColor}`,
      borderRadius: '100%',
      color: componentTheme.borderColor,
      transitionProperty: 'width, height, top, left',
      transitionDuration: '0.2s'
    }, isHoveredCompound && circleHovered), {}, {
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 1px 4px ${componentTheme.shadowColor}`
      },
      '&:focus::before': {
        content: '""',
        position: 'absolute',
        top: '-0.3125rem',
        left: '-0.3125rem',
        right: '-0.3125rem',
        bottom: '-0.3125rem',
        border: `0.125rem solid ${componentTheme.focusBorderColor}`,
        borderRadius: '100%',
        pointerEvents: 'none',
        boxSizing: 'border-box'
      }
    }),
    icon: _objectSpread(_objectSpread({
      label: 'icon',
      transitionProperty: 'opacity',
      transitionDuration: '0.4s'
    }, visibleIcon), isHoveredCompound && hiddenIcon),
    hoverIcon: _objectSpread(_objectSpread({
      label: 'hoverIcon',
      transitionProperty: 'opacity',
      transitionDuration: '0.4s'
    }, hiddenIcon), isHoveredCompound && visibleIcon)
  };
};

export default generateStyle;