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
export const START_POSITION = 1;
export const CONTROLS_SHOWN_OFFSET = 4;

const getCaptionPosition = _ref => {
  let captionPosition = _ref.captionPosition,
      showControls = _ref.showControls,
      captionOffset = _ref.captionOffset;

  if (typeof captionOffset === 'string') {
    return captionOffset;
  } else if (typeof captionOffset === 'number') {
    const startingPosition = captionPosition === 'bottom' && showControls ? CONTROLS_SHOWN_OFFSET + START_POSITION : START_POSITION;
    return `${startingPosition + captionOffset}rem`;
  }
};

const generateStyle = (componentTheme, props) => {
  const captionPosition = props.captionPosition;
  return {
    subtitleContainer: {
      label: 'subtitleContainer',
      lineHeight: 1.5,
      position: 'absolute',
      textAlign: 'center',
      pointerEvents: 'none',
      [captionPosition]: getCaptionPosition(props),
      transition: `${captionPosition} 0.25s ease-in-out`
    },
    subtitle: {
      label: 'subtitle',
      backgroundColor: componentTheme.captionBackgroundColor,
      color: componentTheme.captionTextColor,
      padding: '0.375rem'
    }
  };
};

export default generateStyle;