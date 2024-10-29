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
const generateStyle = () => {
  return {
    container: {
      label: 'container',
      width: '100%',
      height: '100%',
      minHeight: 'inherit',
      minWidth: 'inherit',
      maxHeight: 'inherit',
      maxWidth: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      label: 'video',
      width: '100%',
      minHeight: 'inherit',
      minWidth: 'inherit',
      maxWidth: 'inherit',
      maxHeight: 'inherit',
      display: 'block',
      /*
        Mobile safari has an issue where the video will appear over the controls once
        played, due to how iOS renders it. This CSS works around the issue.

        https://stackoverflow.com/questions/3683211/ipad-safari-mobile-seems-to-ignore-z-indexing-position-for-html5-video-elements
      */
      WebkitTransformStyle: 'preserve-3d',
    },
  }
}

export default generateStyle
