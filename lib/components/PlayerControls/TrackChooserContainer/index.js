"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _uiTruncateText = require("@instructure/ui-truncate-text");

var _uiA11yContent = require("@instructure/ui-a11y-content");

var _translations = require("../../../constants/translated/translations");

var _uiMenu = require("@instructure/ui-menu");

var _MediaContext = _interopRequireDefault(require("../../Player/MediaContext"));

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 - present Instructure, Inc.
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
---
private: true
---
@module TrackChooserContainer
**/
class TrackChooserContainer extends _react.Component {
  constructor() {
    super(...arguments);

    this.handleKeyDown = showControls => e => {
      e.preventDefault();
      showControls();
    };

    this.handleOnSelect = toggleTrack => (_, _ref) => {
      let _ref2 = (0, _slicedToArray2.default)(_ref, 1),
          track = _ref2[0];

      toggleTrack(track);
    };

    this.renderTurnOffCaptionLabel = actions => {
      return /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Item, {
        "data-test": "Captions-Off",
        value: null,
        onKeyDown: this.handleKeyDown(actions.showControls)
      }, (0, _translations.translate)('OFF'));
    };

    this.renderTrackOptionsLabels = (state, actions) => {
      const tracks = state.tracks;
      return tracks.map(track => {
        return /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Item, {
          "data-test": `Captions-${track.label}`,
          key: track.id,
          value: track.id,
          onKeyDown: this.handleKeyDown(actions.showControls)
        }, /*#__PURE__*/_react.default.createElement(_uiTruncateText.TruncateText, null, track.label));
      });
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_MediaContext.default.Consumer, null, _ref3 => {
      let state = _ref3.state,
          actions = _ref3.actions;
      const selectedTrackId = state.selectedTrackId;
      return /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Group, {
        label: /*#__PURE__*/_react.default.createElement(_uiA11yContent.ScreenReaderContent, null, this.props.name),
        selected: [selectedTrackId],
        onSelect: this.handleOnSelect(actions.toggleTrack)
      }, this.renderTurnOffCaptionLabel(actions), this.renderTrackOptionsLabels(state, actions));
    });
  }

}

exports.default = TrackChooserContainer;
TrackChooserContainer.displayName = _uiMenu.Menu.Item.displayName;