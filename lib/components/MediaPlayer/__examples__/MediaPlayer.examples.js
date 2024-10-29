"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _react = _interopRequireDefault(require("react"));

var _en = _interopRequireDefault(require("./static/en1.srt"));

var _en2 = _interopRequireDefault(require("./static/en1.vtt"));

var _en3 = _interopRequireDefault(require("./static/en2.vtt"));

var _index = require("../index");

var _uiIcons = require("@instructure/ui-icons");

var _IconAlertsLine, _IconHamburgerLine;

function getSource(type) {
  switch (type) {
    case 'video':
      return [{
        src: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
        label: '1080p',
        defaultSelected: false
      }, {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        label: '360p',
        defaultSelected: true
      }];

    case 'youtube':
      return [{
        src: 'https://www.youtube.com/watch?v=lyRPyRKHO8M',
        label: 'youtube',
        defaultSelected: false
      }];

    case 'vimeo':
      return [{
        src: 'https://vimeo.com/189789787',
        label: 'vimeo',
        defaultSelected: false
      }];
  }
}

function getVimeoProps(type) {
  if (type === 'vimeo') {
    return {
      onCanPlay: () => {},
      onEnded: () => {},
      onLoadedData: () => {},
      onLoadedMetadata: () => {},
      onPause: () => {},
      onPlay: () => {},
      onProgress: () => {},
      onRateChange: () => {},
      onSeeked: () => {},
      onTimeUpdate: () => {},
      onVolumeChange: () => {}
    };
  }

  return {};
}

var _default = {
  propValues: {},
  getComponentProps: props => {
    return (0, _objectSpread2.default)({
      tracks: props.type === 'video' ? [{
        id: 'en1SRT',
        src: _en.default,
        label: 'en1SRT',
        type: 'subtitles',
        language: 'en'
      }, {
        id: 'en1VTT',
        src: _en2.default,
        label: 'en1VTT',
        type: 'subtitles',
        language: 'en'
      }, {
        id: 'en2VTT',
        src: _en3.default,
        label: 'en2VTT',
        type: 'subtitles',
        language: 'en'
      }] : [],
      sources: getSource(props.type),
      // eslint-disable-next-line react/display-name
      customControls: () => [/*#__PURE__*/_react.default.createElement(_index.MediaPlayer.Control, {
        variant: "button",
        key: "SampleButtonCustomControl",
        tooltipLabel: "Sample Button Custom Control",
        onClick: () => alert('custom control clicked'),
        icon: _IconAlertsLine || (_IconAlertsLine = /*#__PURE__*/_react.default.createElement(_uiIcons.IconAlertsLine, {
          size: "x-small"
        }))
      }), /*#__PURE__*/_react.default.createElement(_index.MediaPlayer.Control, {
        variant: "menu",
        key: "SampleMenuCustomControl",
        tooltipLabel: "Sample Menu Custom Control",
        icon: _IconHamburgerLine || (_IconHamburgerLine = /*#__PURE__*/_react.default.createElement(_uiIcons.IconHamburgerLine, {
          size: "x-small"
        })),
        menuItems: () => /*#__PURE__*/_react.default.createElement(_index.MediaPlayer.Menu.Group, {
          label: "Item List Group",
          onSelect: (e, value) => alert(`${value} selected`),
          selectedValue: "Item 1"
        }, [1, 2, 3, 4, 5].map(item => /*#__PURE__*/_react.default.createElement(_index.MediaPlayer.Menu.Item, {
          key: item.toString(),
          value: `Item ${item}`
        }, `Item ${item}`)))
      }, "Menu")]
    }, getVimeoProps(props.type));
  }
};
exports.default = _default;