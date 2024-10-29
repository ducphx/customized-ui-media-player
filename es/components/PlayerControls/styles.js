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
const generateStyle = componentTheme => {
  return {
    container: {
      label: 'player-control-container',
      position: 'absolute',
      bottom: componentTheme.controlsMargin,
      left: componentTheme.controlsMargin,
      right: componentTheme.controlsMargin,
      display: 'flex',
      height: '2.375rem',
      opacity: 1,
      cursor: 'pointer',
      transition: 'height 0.25s ease-in-out, opacity 0.25s linear',

      /*
        Mobile Chrome on Android has an issue where the player controls show a blue highlight
        upon user tap. This CSS works around the issue.
         https://stackoverflow.com/questions/25704650/disable-blue-highlight-when-touch-press-object-with-cursorpointer
      */
      WebkitTapHighlightColor: 'transparent'
    },
    hidden: {
      label: 'player-control-hidden',
      height: 0,
      opacity: 0
    }
  };
};

export default generateStyle;