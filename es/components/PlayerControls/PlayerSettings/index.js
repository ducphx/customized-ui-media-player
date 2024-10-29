import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

var _View, _IconArrowOpenEndSoli, _IconSettingsSolid;

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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InstUISettingsProvider } from '@instructure/emotion';
import { Popover } from '@instructure/ui-popover';
import { Flex } from '@instructure/ui-flex';
import { View } from '@instructure/ui-view';
import { Text } from '@instructure/ui-text';
import { Menu } from '@instructure/ui-menu';
import { ScreenReaderContent } from '@instructure/ui-a11y-content';
import { Responsive } from '@instructure/ui-responsive';
import { IconSettingsSolid, IconArrowOpenEndSolid, IconArrowOpenStartSolid } from '@instructure/ui-icons';
import { translate } from '../../../constants/translated/translations';
import { keyCodes } from '../../../constants/keyCodes';
import PlayerButton from '../../PlayerButton';
import MediaContext from '../../Player/MediaContext';
/**
---
private: true
---
**/

class PlayerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'SETTINGS',
      isShowingContent: false
    };

    this.handleKeyDown = (event, name) => {
      if (event.keyCode === keyCodes.RIGHT && this.state.activeMenu === 'SETTINGS') {
        this.setState({
          activeMenu: name
        });
        this.menuRef.current.focus();
      }

      if (event.keyCode === keyCodes.LEFT && this.state.activeMenu !== 'SETTINGS') {
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
      return /*#__PURE__*/React.createElement(Menu.Group, {
        label: /*#__PURE__*/React.createElement(ScreenReaderContent, null, item.props.name),
        onClick: () => this.handleClosePopover(actions)
      }, item);
    };

    this.handleSelectItem = (state, actions) => {
      return this.state.activeMenu === 'SETTINGS' ? this.renderMainMenu(state) : this.itemFinder(actions);
    };

    this.renderCustomControl = component => {
      var _Flex$Item;

      if (component.props.variant === 'button') {
        return /*#__PURE__*/React.createElement(Menu.Item, {
          onClick: component.props.onClick
        }, /*#__PURE__*/React.createElement(Flex, {
          justifyItems: "space-between"
        }, /*#__PURE__*/React.createElement(Flex.Item, null, component.props.name), _Flex$Item || (_Flex$Item = /*#__PURE__*/React.createElement(Flex.Item, null, component))));
      }
    };

    this.renderMenuHeader = () => {
      // fix to remove warning about MenuItemGroup expects MenuItem component
      // forwardRef is expected by InstUI even if it's not used in this case
      function MenuItemHeader(_ref2, _ref) {
        let activeMenu = _ref2.activeMenu;
        return /*#__PURE__*/React.createElement(Flex, {
          padding: "x-small small",
          justifyItems: "space-between"
        }, /*#__PURE__*/React.createElement(Flex.Item, null, /*#__PURE__*/React.createElement(Text, {
          weight: "bold"
        }, translate(activeMenu))));
      }

      const MenuHeader = /*#__PURE__*/React.forwardRef(MenuItemHeader);
      MenuHeader.displayName = Menu.Item.displayName;
      return /*#__PURE__*/React.createElement(Menu.Group, {
        label: /*#__PURE__*/React.createElement(ScreenReaderContent, null, this.state.activeMenu)
      }, /*#__PURE__*/React.createElement(MenuHeader, {
        activeMenu: this.state.activeMenu
      }));
    };

    this.renderBackNavigation = () => {
      if (this.state.activeMenu !== 'SETTINGS') {
        return /*#__PURE__*/React.createElement(Menu.Item, {
          as: "div",
          onClick: () => this.handleSelectSubMenu('SETTINGS'),
          onKeyDown: () => this.handleKeyDown(event, 'SETTINGS')
        }, /*#__PURE__*/React.createElement(Flex, {
          as: "div",
          justifyItems: "start"
        }, _View || (_View = /*#__PURE__*/React.createElement(View, {
          margin: "0 small 0 0"
        }, /*#__PURE__*/React.createElement(IconArrowOpenStartSolid, null))), translate('BACK')));
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
      // console.log(state);
      // const sourceFinder = state.sources.find(source => source.src == state.selectedSrc);
      const sourceFinder = translate('STANDARD');
      const trackFinder = state.tracks.find(track => track.id == state.selectedTrackId);
      let mapState = {
        QUALITY: sourceFinder ? sourceFinder.label : translate('STANDARD'),
        SPEED: `${state.playbackSpeed}x`,
        CAPTIONS: trackFinder ? trackFinder.label : translate('OFF')
      };
      const listItems = React.Children.map(this.props.children, child => {
        if (child.type.displayName === 'CustomControl') {
          return this.renderCustomControl(child);
        }

        return /*#__PURE__*/React.createElement(Menu.Item, {
          key: child.props.name,
          onClick: () => this.handleSelectSubMenu(child.props.name),
          onKeyDown: () => this.handleKeyDown(event, child.props.name)
        }, /*#__PURE__*/React.createElement(Flex, {
          justifyItems: "space-between"
        }, /*#__PURE__*/React.createElement(Flex.Item, null, translate(child.props.name)), /*#__PURE__*/React.createElement(Flex.Item, null, /*#__PURE__*/React.createElement(Flex, {
          alignItems: "center"
        }, /*#__PURE__*/React.createElement(View, {
          padding: "0 x-small",
          textAlign: "center"
        }, mapState[child.props.name]), _IconArrowOpenEndSoli || (_IconArrowOpenEndSoli = /*#__PURE__*/React.createElement(IconArrowOpenEndSolid, null))))));
      });
      return listItems;
    };

    this.menuRef = /*#__PURE__*/React.createRef();
  }

  generateMenuScrollableContainerComponent() {
    const isActiveSpeedMenu = this.state.activeMenu === 'SPEED';
    const MenuContainer = isActiveSpeedMenu ? View : React.Fragment;
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
          _this$generateMenuScr2 = _slicedToArray(_this$generateMenuScr, 2),
          MenuContainer = _this$generateMenuScr2[0],
          menuContainerProps = _this$generateMenuScr2[1];

    return /*#__PURE__*/React.createElement(MediaContext.Consumer, null, _ref3 => {
      let state = _ref3.state,
          fullScreenContainerRef = _ref3.fullScreenContainerRef,
          actions = _ref3.actions;
      return /*#__PURE__*/React.createElement(Responsive, {
        match: "media",
        query: {
          small: {
            maxWidth: '20.813rem'
          }
        }
      }, (props, matches) => /*#__PURE__*/React.createElement(Popover, {
        color: "primary-inverse",
        mountNode: fullScreenContainerRef,
        constrain: "parent",
        withArrow: false,
        offsetX: -38,
        offsetY: 8,
        renderTrigger: /*#__PURE__*/React.createElement(PlayerButton, {
          videoId: state.videoId,
          tooltipLabel: translate('SETTINGS')
        }, /*#__PURE__*/React.createElement(ScreenReaderContent, null, translate('SETTINGS')), _IconSettingsSolid || (_IconSettingsSolid = /*#__PURE__*/React.createElement(IconSettingsSolid, {
          size: "x-small"
        }))),
        screenReaderLabel: translate('SETTINGS'),
        on: "click",
        isShowingContent: this.state.isShowingContent,
        onShowContent: () => this.handleOpenPopover(actions),
        onHideContent: () => this.handleClosePopover(actions)
      }, /*#__PURE__*/React.createElement(MenuContainer, menuContainerProps, /*#__PURE__*/React.createElement(InstUISettingsProvider, {
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
      }, /*#__PURE__*/React.createElement(Menu, {
        label: translate('PLAYER_SETTINGS'),
        menuRef: ref => {
          this.menuRef.current = ref;
        }
      }, this.renderBackNavigation(), this.renderMenuHeader(), this.handleSelectItem(state, actions))))));
    });
  }

}

PlayerSettings.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node
};
PlayerSettings.defaultProps = {
  name: 'SETTINGS',
  children: null
};
export default PlayerSettings;