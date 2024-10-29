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
const generateStyle = (componentTheme, props) => {
  const { position } = props
  return {
    button: {
      label: 'button',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      backgroundColor: componentTheme.backgroundColor,
      color: componentTheme.color,
      cursor: 'pointer',
      height: '100%',
      width: componentTheme.width,

      ...(position === 'start' && {
        label: 'button-start',
        borderRadius: '0.25rem 0 0 0.25rem',
      }),

      ...(position === 'end' && {
        label: 'button-end',
        borderRadius: '0 0.25rem 0.25rem 0',
      }),

      '&:hover': {
        backgroundColor: componentTheme.hoverColor,
      },

      '&:active': {
        backgroundColor: componentTheme.activeColor,
      },

      '&:focus': {
        outline: 'none',
        border: `0.0625rem solid ${componentTheme.activeColor}`,
        boxShadow: `inset 0 0 0 0.125rem ${componentTheme.focusColor}`,
      },
    },
    divWrapper: {
      label: 'divWrapper',
      display: 'flex',
    },
    buttonWrapper: {
      label: 'buttonWrapper',
      height: '100%',
    },
  }
}

export default generateStyle
