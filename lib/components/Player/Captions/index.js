"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CaptionsPres = exports.Captions = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emotion = require("@instructure/emotion");

var _caption = _interopRequireDefault(require("../../../utils/caption"));

var _PropTypes = require("../PropTypes");

var _styles = _interopRequireDefault(require("./styles"));

var _theme = _interopRequireDefault(require("./theme"));

var _dec, _class, _class2, _temp;

const ENTER = /[\r\n]/g;
let CaptionsPres = (_dec = (0, _emotion.withStyle)(_styles.default, _theme.default), _dec(_class = (_temp = _class2 = class CaptionsPres extends _react.Component {
  constructor() {
    super(...arguments);
    this.state = {
      activeCues: []
    };
    this.lookupIdx = 0;
  }

  componentDidMount() {
    this.props.makeStyles();
  }

  componentDidUpdate(prevProps, prevState) {
    const activeCues = _caption.default.getActiveCues(this.props, prevProps, this);

    if (_caption.default.activeCuesChanged(prevState.activeCues, activeCues)) {
      this.setState({
        activeCues
      });
    }

    this.props.makeStyles();
  }

  render() {
    const _this$props = this.props,
          captions = _this$props.captions,
          styles = _this$props.styles;

    if (!Array.isArray(captions) || captions.length === 0) {
      return null;
    }

    return (0, _emotion.jsx)("div", {
      css: styles.subtitleContainer
    }, this.state.activeCues.map(_ref => {
      let text = _ref.text;
      return text.split(ENTER).map(lineContent => {
        // Caption files can provide multiple entries for a single time slot.
        // Display each entry separated by a single line to emulate native behaviour.
        return (0, _emotion.jsx)("div", {
          key: lineContent
        }, (0, _emotion.jsx)("span", {
          css: styles.subtitle
        }, lineContent));
      });
    }));
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,
  currentTime: _propTypes.default.number.isRequired,
  captions: _propTypes.default.arrayOf(_propTypes.default.shape({
    start: _propTypes.default.number,
    end: _propTypes.default.number,
    text: _propTypes.default.string
  })),
  captionPosition: _propTypes.default.oneOf(['top', 'bottom', 'left', 'right']),
  captionOffset: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  showControls: _propTypes.default.bool
}, _class2.defaultProps = {
  captions: [],
  captionPosition: 'top',
  captionOffset: 0,
  showControls: false
}, _temp)) || _class);
exports.CaptionsPres = CaptionsPres;

class Captions extends _react.Component {
  constructor(props) {
    var _this;

    super(props);
    _this = this;
    this.state = {
      captions: [],
      convertedTracks: {}
    };

    this.clearUnneededConvertedTracks = function (tracks, staleTracks) {
      let callback = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : () => {};

      _this.setState(prevState => {
        const tracksToKeep = staleTracks.filter(_ref2 => {
          let staleId = _ref2.id;
          return tracks.some(track => staleId === track.id);
        });
        const convertedTracks = tracksToKeep.reduce((result, _ref3) => {
          let id = _ref3.id;
          const convertedTrack = prevState.convertedTracks[id];

          if (!convertedTrack) {
            return result;
          }

          return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, result), {}, {
            [id]: convertedTrack
          });
        }, {});
        return {
          convertedTracks
        };
      }, callback);
    };

    this.maybeDefaultToOff = () => {
      const _this$state = this.state,
            convertedTracks = _this$state.convertedTracks,
            captions = _this$state.captions;
      const currentCaptions = Object.values(convertedTracks).find(cachedCaptions => cachedCaptions === captions);

      if (!currentCaptions) {
        this.toggleTrack(null);
      }
    };

    this.findSelectedTrack = (tracks, trackId) => tracks.find(track => track.id === trackId);

    this.toggleTrack = trackId => {
      const selectedTrack = this.findSelectedTrack(this.props.tracks, trackId);
      const selectedTrackSrc = selectedTrack && selectedTrack.src;
      const selectedTrackId = selectedTrack && selectedTrack.id;

      const applyTrack = () => {
        this.setState({
          captions: selectedTrackId ? this.state.convertedTracks[selectedTrackId] : []
        }, () => this.props.onTrackChange(trackId));
      };

      if (selectedTrack && !this.state.convertedTracks[selectedTrackId]) {
        return _caption.default.getCaptionsFromFile(selectedTrackSrc).then(captionData => {
          const sortedCaptionData = _caption.default.sortByTime(captionData);

          this.setState(prevState => ({
            convertedTracks: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, prevState.convertedTracks), {}, {
              [selectedTrackId]: sortedCaptionData
            })
          }), applyTrack);
        }).catch(message => {
          window.console.warn(message);
          applyTrack();
          return Promise.reject(message);
        });
      } else {
        applyTrack();
      }

      return Promise.resolve();
    };

    this.props.setActions({
      toggleTrack: this.toggleTrack
    });

    if (this.props.autoShowCaption) {
      var _this$props$tracks;

      const cap = (_this$props$tracks = this.props.tracks) === null || _this$props$tracks === void 0 ? void 0 : _this$props$tracks.find(t => t.language === this.props.autoShowCaption);

      if (cap) {
        this.toggleTrack(cap.id);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tracks !== this.props.tracks) {
      this.clearUnneededConvertedTracks(this.props.tracks, prevProps.tracks, this.maybeDefaultToOff);
    }
  }

  render() {
    return (0, _emotion.jsx)(CaptionsPres, Object.assign({}, this.props, this.state));
  }

}

exports.Captions = exports.default = Captions;
Captions.propTypes = (0, _objectSpread2.default)({
  tracks: _PropTypes.tracksType,
  setActions: _propTypes.default.func,
  onTrackChange: _propTypes.default.func,
  autoShowCaption: _propTypes.default.string
}, CaptionsPres.propTypes);
Captions.defaultProps = (0, _objectSpread2.default)({
  tracks: [],
  setActions: () => {},
  onTrackChange: () => {}
}, CaptionsPres.defaultProps);