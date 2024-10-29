"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emotion = require("@instructure/emotion");

var _uiPopover = require("@instructure/ui-popover");

var _uiFlex = require("@instructure/ui-flex");

var _uiView = require("@instructure/ui-view");

var _uiText = require("@instructure/ui-text");

var _uiMenu = require("@instructure/ui-menu");

var _uiA11yContent = require("@instructure/ui-a11y-content");

var _uiResponsive = require("@instructure/ui-responsive");

var _uiIcons = require("@instructure/ui-icons");

var _translations = require("../../../constants/translated/translations");

var _keyCodes = require("../../../constants/keyCodes");

var _PlayerButton = _interopRequireDefault(require("../../PlayerButton"));

var _MediaContext = _interopRequireDefault(require("../../Player/MediaContext"));

var _View, _IconArrowOpenEndSoli, _IconSettingsSolid;

/**
---
private: true
---
**/
class PlayerSettings extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'SETTINGS',
      isShowingContent: false
    };

    this.handleKeyDown = (event, name) => {
      if (event.keyCode === _keyCodes.keyCodes.RIGHT && this.state.activeMenu === 'SETTINGS') {
        this.setState({
          activeMenu: name
        });
        this.menuRef.current.focus();
      }

      if (event.keyCode === _keyCodes.keyCodes.LEFT && this.state.activeMenu !== 'SETTINGS') {
        this.setState({
          activeMenu: name
        });
        this.menuRef.current.focus();
      }
    };

    this.handleSelectSubMenu = subMenu => {
      this.setState({
        activeMenu: subMenu
      });
      this.menuRef.current.focus();
    };

    this.itemFinder = actions => {
      const item = this.props.children.find(obj => obj.props.name === this.state.activeMenu);
      return /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Group, {
        label: /*#__PURE__*/_react.default.createElement(_uiA11yContent.ScreenReaderContent, null, item.props.name),
        onClick: () => this.handleClosePopover(actions)
      }, item);
    };

    this.handleSelectItem = (state, actions) => {
      return this.state.activeMenu === 'SETTINGS' ? this.renderMainMenu(state) : this.itemFinder(actions);
    };

    this.renderCustomControl = component => {
      var _Flex$Item;

      if (component.props.variant === 'button') {
        return /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Item, {
          onClick: component.props.onClick
        }, /*#__PURE__*/_react.default.createElement(_uiFlex.Flex, {
          justifyItems: "space-between"
        }, /*#__PURE__*/_react.default.createElement(_uiFlex.Flex.Item, null, component.props.name), _Flex$Item || (_Flex$Item = /*#__PURE__*/_react.default.createElement(_uiFlex.Flex.Item, null, component))));
      }
    };

    this.renderMenuHeader = () => {
      // fix to remove warning about MenuItemGroup expects MenuItem component
      // forwardRef is expected by InstUI even if it's not used in this case
      function MenuItemHeader(_ref2, _ref) {
        let activeMenu = _ref2.activeMenu;
        return /*#__PURE__*/_react.default.createElement(_uiFlex.Flex, {
          padding: "x-small small",
          justifyItems: "space-between"
        }, /*#__PURE__*/_react.default.createElement(_uiFlex.Flex.Item, null, /*#__PURE__*/_react.default.createElement(_uiText.Text, {
          weight: "bold"
        }, (0, _translations.translate)(activeMenu))));
      }

      const MenuHeader = /*#__PURE__*/_react.default.forwardRef(MenuItemHeader);

      MenuHeader.displayName = _uiMenu.Menu.Item.displayName;
      return /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Group, {
        label: /*#__PURE__*/_react.default.createElement(_uiA11yContent.ScreenReaderContent, null, this.state.activeMenu)
      }, /*#__PURE__*/_react.default.createElement(MenuHeader, {
        activeMenu: this.state.activeMenu
      }));
    };

    this.renderBackNavigation = () => {
      if (this.state.activeMenu !== 'SETTINGS') {
        return /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Item, {
          as: "div",
          onClick: () => this.handleSelectSubMenu('SETTINGS'),
          onKeyDown: () => this.handleKeyDown(event, 'SETTINGS')
        }, /*#__PURE__*/_react.default.createElement(_uiFlex.Flex, {
          as: "div",
          justifyItems: "start"
        }, _View || (_View = /*#__PURE__*/_react.default.createElement(_uiView.View, {
          margin: "0 small 0 0"
        }, /*#__PURE__*/_react.default.createElement(_uiIcons.IconArrowOpenStartSolid, null))), (0, _translations.translate)('BACK')));
      }
    };

    this.handleOpenPopover = actions => {
      actions.activateControl('PlayerSettings');
      this.setState({
        isShowingContent: true
      });
    };

    this.handleClosePopover = actions => {
      actions.deactivateControl('PlayerSettings');
      this.setState({
        activeMenu: 'SETTINGS',
        isShowingContent: false
      });
    };

    this.renderMainMenu = state => {
      // There are different sources and we need to compare the
      // selected source with the sources and extract the label
      // to show it up in main Menu as the current selection
      const sourceFinder = state.sources.find(source => source.src == state.selectedSrc);
      const trackFinder = state.tracks.find(track => track.id == state.selectedTrackId);
      let mapState = {
        QUALITY: sourceFinder ? sourceFinder.label : (0, _translations.translate)('STANDARD'),
        SPEED: `${state.playbackSpeed}x`,
        CAPTIONS: trackFinder ? trackFinder.label : (0, _translations.translate)('OFF')
      };

      const listItems = _react.default.Children.map(this.props.children, child => {
        if (child.type.displayName === 'CustomControl') {
          return this.renderCustomControl(child);
        }

        return /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Item, {
          key: child.props.name,
          onClick: () => this.handleSelectSubMenu(child.props.name),
          onKeyDown: () => this.handleKeyDown(event, child.props.name)
        }, /*#__PURE__*/_react.default.createElement(_uiFlex.Flex, {
          justifyItems: "space-between"
        }, /*#__PURE__*/_react.default.createElement(_uiFlex.Flex.Item, null, (0, _translations.translate)(child.props.name)), /*#__PURE__*/_react.default.createElement(_uiFlex.Flex.Item, null, /*#__PURE__*/_react.default.createElement(_uiFlex.Flex, {
          alignItems: "center"
        }, /*#__PURE__*/_react.default.createElement(_uiView.View, {
          padding: "0 x-small",
          textAlign: "center"
        }, mapState[child.props.name]), _IconArrowOpenEndSoli || (_IconArrowOpenEndSoli = /*#__PURE__*/_react.default.createElement(_uiIcons.IconArrowOpenEndSolid, null))))));
      });

      return listItems;
    };

    this.menuRef = /*#__PURE__*/_react.default.createRef();
  }

  generateMenuScrollableContainerComponent() {
    const isActiveSpeedMenu = this.state.activeMenu === 'SPEED';
    const MenuContainer = isActiveSpeedMenu ? _uiView.View : _react.default.Fragment;
    const menuContainerProps = isActiveSpeedMenu ? {
      as: 'div',
      maxHeight: '14.875rem',
      overflowY: 'auto',
      overflowX: 'hidden'
    } : {};
    return [MenuContainer, menuContainerProps];
  }

  render() {
    const licorice = '#2D3B45';

    const _this$generateMenuScr = this.generateMenuScrollableContainerComponent(),
          _this$generateMenuScr2 = (0, _slicedToArray2.default)(_this$generateMenuScr, 2),
          MenuContainer = _this$generateMenuScr2[0],
          menuContainerProps = _this$generateMenuScr2[1];

    return /*#__PURE__*/_react.default.createElement(_MediaContext.default.Consumer, null, _ref3 => {
      let state = _ref3.state,
          fullScreenContainerRef = _ref3.fullScreenContainerRef,
          actions = _ref3.actions;
      return /*#__PURE__*/_react.default.createElement(_uiResponsive.Responsive, {
        match: "media",
        query: {
          small: {
            maxWidth: '20.813rem'
          }
        }
      }, (props, matches) => /*#__PURE__*/_react.default.createElement(_uiPopover.Popover, {
        color: "primary-inverse",
        mountNode: fullScreenContainerRef,
        constrain: "parent",
        withArrow: false,
        offsetX: -38,
        offsetY: 8,
        renderTrigger: /*#__PURE__*/_react.default.createElement(_PlayerButton.default, {
          videoId: state.videoId,
          tooltipLabel: (0, _translations.translate)('SETTINGS')
        }, /*#__PURE__*/_react.default.createElement(_uiA11yContent.ScreenReaderContent, null, (0, _translations.translate)('SETTINGS')), _IconSettingsSolid || (_IconSettingsSolid = /*#__PURE__*/_react.default.createElement(_uiIcons.IconSettingsSolid, {
          size: "x-small"
        }))),
        screenReaderLabel: (0, _translations.translate)('SETTINGS'),
        on: "click",
        isShowingContent: this.state.isShowingContent,
        onShowContent: () => this.handleOpenPopover(actions),
        onHideContent: () => this.handleClosePopover(actions)
      }, /*#__PURE__*/_react.default.createElement(MenuContainer, menuContainerProps, /*#__PURE__*/_react.default.createElement(_emotion.InstUISettingsProvider, {
        theme: {
          componentOverrides: {
            Menu: {
              background: licorice,
              minWidth: matches.includes('small') ? '16rem' : '18.5rem'
            },
            'Menu.Item': {
              background: licorice,
              labelColor: 'white',
              iconColor: 'white',
              activeIconColor: licorice,
              activeBackground: 'white',
              activeLabelColor: licorice
            }
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_uiMenu.Menu, {
        label: (0, _translations.translate)('PLAYER_SETTINGS'),
        menuRef: ref => {
          this.menuRef.current = ref;
        }
      }, this.renderBackNavigation(), this.renderMenuHeader(), this.handleSelectItem(state, actions))))));
    });
  }

}

PlayerSettings.propTypes = {
  name: _propTypes.default.string,
  children: _propTypes.default.node
};
PlayerSettings.defaultProps = {
  name: 'SETTINGS',
  children: null
};
var _default = PlayerSettings;
exports.default = _default;