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
import { parse } from 'subtitle';
export const seekedBackwards = (prevTime, currentTime) => currentTime < prevTime;
export const captionsChanged = (prevCaptions, currentCaptions) => prevCaptions !== currentCaptions;
export const checkForOverlappingCaptions = (captions, currentTime, idx) => {
  let i = idx;

  for (; i >= 0; i--) {
    const _captions$i = captions[i],
          start = _captions$i.start,
          end = _captions$i.end;
    const withinTimeRange = start <= currentTime && currentTime <= end;

    if (!withinTimeRange) {
      break;
    }
  }

  return i + 1;
}; // findNearestTimeRange is a search function for finding the nearest index to start looking for
// the current/nearest active cues. It's supposed to be an optimized version of:
// `captions.findIndex(({ start, end }) => (start <= currentTime && currentTime <= end))`.
//
// Assumption: `captions` is a sorted array of captions that at least has the shape of `{ start: number, end: number }`

export const findNearestTimeRange = (captions, currentTime, start, end) => {
  if (!Array.isArray(captions) || captions.length === 0) {
    return -1;
  } // Normally, in a binary search, we check whether the condition `start <= end` is true
  // for preventing infinite recursion. Since we're looking for nearest time range,
  // we don't want to return -1 when we're at the left corner (`end < 0`), because
  // it implies that we have captions to read.


  if (end < 0) {
    return 0;
  } else if (start > end) {
    return -1;
  }

  const middle = (start + end) / 2 | 0; // (x | 0) === (Math.floor(x))

  if (captions[middle].start <= currentTime && currentTime <= captions[middle].end) {
    return checkForOverlappingCaptions(captions, currentTime, middle);
  } else if (currentTime < captions[middle].start) {
    return findNearestTimeRange(captions, currentTime, start, middle - 1);
  } else {
    // currentTime > captions[middle].end
    return findNearestTimeRange(captions, currentTime, middle + 1, end);
  }
};
export const activeCuesChanged = (oldActiveCues, newActiveCues) => oldActiveCues.length !== newActiveCues.length || oldActiveCues[0] !== newActiveCues[0] && oldActiveCues[oldActiveCues.length - 1] !== newActiveCues[newActiveCues.length - 1];
export const getActiveCues = function (_ref, prevProps) {
  let currentTime = _ref.currentTime,
      captions = _ref.captions;
  let context = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    lookupIdx: 0
  };

  if (seekedBackwards(prevProps.currentTime, currentTime) || captionsChanged(prevProps.captions, captions)) {
    const lastCaption = captions[captions.length - 1];
    context.lookupIdx = // eslint-disable-line no-param-reassign
    lastCaption && lastCaption.end && currentTime > lastCaption.end ? -1 : findNearestTimeRange(captions, currentTime, 0, captions.length - 1);
  }

  const activeCues = [];

  if (context.lookupIdx === -1) {
    return activeCues;
  }

  let i = context.lookupIdx;

  for (; i < captions.length; i++) {
    const caption = captions[i];
    const start = caption.start,
          end = caption.end;

    if (start <= currentTime && currentTime <= end || start === currentTime || end === currentTime) {
      if (caption.text) {
        activeCues.push(caption);
      }
    } else if (currentTime > end) {
      context.lookupIdx = i + 1; // eslint-disable-line no-param-reassign
    } else {
      // currentTime < start
      break;
    }
  }

  return activeCues;
};
export function sortByTime(captionData) {
  if (!Array.isArray(captionData)) {
    return null;
  }

  return captionData.sort((_ref2, _ref3) => {
    let startA = _ref2.start,
        endA = _ref2.end;
    let startB = _ref3.start,
        endB = _ref3.end;

    if (startA !== startB) {
      return startA < startB ? -1 : 1;
    }

    if (endA !== endB) {
      return endA < endB ? -1 : 1;
    }

    return 0;
  });
}
export function fetchFile(src) {
  if (!window.fetch) {
    return Promise.reject('failed to load track because window.fetch is not available');
  } // eslint-disable-next-line compat/compat


  return window.fetch(src).then(response => {
    if (response.ok) {
      return response.text();
    } else {
      return Promise.reject(response.statusText);
    }
  });
}
export function msToSeconds(ms) {
  return ms / 1000;
}
export function getCaptionsFromFile(src) {
  return fetchFile(src).then(text => parse(text).map(captionCue => _objectSpread(_objectSpread({}, captionCue), {}, {
    start: msToSeconds(captionCue.start),
    end: msToSeconds(captionCue.end)
  })));
}
export default {
  seekedBackwards,
  captionsChanged,
  checkForOverlappingCaptions,
  findNearestTimeRange,
  activeCuesChanged,
  getActiveCues,
  sortByTime,
  fetchFile,
  msToSeconds,
  getCaptionsFromFile
};