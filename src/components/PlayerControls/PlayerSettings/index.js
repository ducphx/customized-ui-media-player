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
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InstUISettingsProvider } from '@instructure/emotion'
import { Popover } from '@instructure/ui-popover'
import { Flex } from '@instructure/ui-flex'
import { View } from '@instructure/ui-view'
import { Text } from '@instructure/ui-text'
import { Menu } from '@instructure/ui-menu'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { Responsive } from '@instructure/ui-responsive'
import {
  IconSettingsSolid,
  IconArrowOpenEndSolid,
  IconArrowOpenStartSolid,
} from '@instructure/ui-icons'
import { translate } from '../../../constants/translated/translations'
import { keyCodes } from '../../../constants/keyCodes'

import PlayerButton from '../../PlayerButton'
import MediaContext from '../../Player/MediaContext'

/**
---
private: true
---
**/
class PlayerSettings extends Component {
  constructor(props) {
    super(props)
    this.menuRef = React.createRef()
  }

  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    name: 'SETTINGS',
    children: null,
  }

  state = {
    activeMenu: 'SETTINGS',
    isShowingContent: false,
  }

  handleKeyDown = (event, name) => {
    if (
      event.keyCode === keyCodes.RIGHT &&
      this.state.activeMenu === 'SETTINGS'
    ) {
      this.setState({ activeMenu: name })
      this.menuRef.current.focus()
    }

    if (
      event.keyCode === keyCodes.LEFT &&
      this.state.activeMenu !== 'SETTINGS'
    ) {
      this.setState({ activeMenu: name })
      this.menuRef.current.focus()
    }
  }

  handleSelectSubMenu = (subMenu) => {
    this.setState({ activeMenu: subMenu })

    this.menuRef.current.focus()
  }

  itemFinder = (actions) => {
    const item = this.props.children.find(
      (obj) => obj.props.name === this.state.activeMenu
    )
    return (
      <Menu.Group
        label={<ScreenReaderContent>{item.props.name}</ScreenReaderContent>}
        onClick={() => this.handleClosePopover(actions)}
      >
        {item}
      </Menu.Group>
    )
  }

  handleSelectItem = (state, actions) => {
    return this.state.activeMenu === 'SETTINGS'
      ? this.renderMainMenu(state)
      : this.itemFinder(actions)
  }

  renderCustomControl = (component) => {
    if (component.props.variant === 'button') {
      return (
        <Menu.Item onClick={component.props.onClick}>
          <Flex justifyItems="space-between">
            <Flex.Item>{component.props.name}</Flex.Item>
            <Flex.Item>{component}</Flex.Item>
          </Flex>
        </Menu.Item>
      )
    }
  }

  renderMenuHeader = () => {
    // fix to remove warning about MenuItemGroup expects MenuItem component
    // forwardRef is expected by InstUI even if it's not used in this case
    function MenuItemHeader({ activeMenu }, _ref) {
      return (
        <Flex padding="x-small small" justifyItems="space-between">
          <Flex.Item>
            <Text weight="bold">{translate(activeMenu)}</Text>
          </Flex.Item>
        </Flex>
      )
    }
    const MenuHeader = React.forwardRef(MenuItemHeader)
    MenuHeader.displayName = Menu.Item.displayName

    return (
      <Menu.Group
        label={
          <ScreenReaderContent>{this.state.activeMenu}</ScreenReaderContent>
        }
      >
        <MenuHeader activeMenu={this.state.activeMenu} />
      </Menu.Group>
    )
  }

  renderBackNavigation = () => {
    if (this.state.activeMenu !== 'SETTINGS') {
      return (
        <Menu.Item
          as="div"
          onClick={() => this.handleSelectSubMenu('SETTINGS')}
          onKeyDown={() => this.handleKeyDown(event, 'SETTINGS')}
        >
          <Flex as="div" justifyItems="start">
            <View margin="0 small 0 0">
              <IconArrowOpenStartSolid />
            </View>
            {translate('BACK')}
          </Flex>
        </Menu.Item>
      )
    }
  }

  handleOpenPopover = (actions) => {
    actions.activateControl('PlayerSettings')
    this.setState({ isShowingContent: true })
  }

  handleClosePopover = (actions) => {
    actions.deactivateControl('PlayerSettings')
    this.setState({
      activeMenu: 'SETTINGS',
      isShowingContent: false,
    })
  }

  renderMainMenu = (state) => {
    // There are different sources and we need to compare the
    // selected source with the sources and extract the label
    // to show it up in main Menu as the current selection
    const sourceFinder = state.sources.find(
      (source) => source.src == state.selectedSrc
    )

    const trackFinder = state.tracks.find(
      (track) => track.id == state.selectedTrackId
    )

    let mapState = {
      QUALITY: sourceFinder ? sourceFinder.label : translate('STANDARD'),
      SPEED: `${state.playbackSpeed}x`,
      CAPTIONS: trackFinder ? trackFinder.label : translate('OFF'),
    }

    const listItems = React.Children.map(this.props.children, (child) => {
      if (child.type.displayName === 'CustomControl') {
        return this.renderCustomControl(child)
      }

      return (
        <Menu.Item
          key={child.props.name}
          onClick={() => this.handleSelectSubMenu(child.props.name)}
          onKeyDown={() => this.handleKeyDown(event, child.props.name)}
        >
          <Flex justifyItems="space-between">
            <Flex.Item>{translate(child.props.name)}</Flex.Item>
            <Flex.Item>
              <Flex alignItems="center">
                <View padding="0 x-small" textAlign="center">
                  {mapState[child.props.name]}
                </View>
                <IconArrowOpenEndSolid />
              </Flex>
            </Flex.Item>
          </Flex>
        </Menu.Item>
      )
    })
    return listItems
  }

  generateMenuScrollableContainerComponent() {
    const isActiveSpeedMenu = this.state.activeMenu === 'SPEED'
    const MenuContainer = isActiveSpeedMenu ? View : React.Fragment
    const menuContainerProps = isActiveSpeedMenu
      ? {
          as: 'div',
          maxHeight: '14.875rem',
          overflowY: 'auto',
          overflowX: 'hidden',
        }
      : {}

    return [MenuContainer, menuContainerProps]
  }

  render() {
    const licorice = '#2D3B45'
    const [MenuContainer, menuContainerProps] =
      this.generateMenuScrollableContainerComponent()

    return (
      <MediaContext.Consumer>
        {({ state, fullScreenContainerRef, actions }) => (
          <Responsive
            match="media"
            query={{
              small: { maxWidth: '20.813rem' },
            }}
          >
            {(props, matches) => (
              <Popover
                color="primary-inverse"
                mountNode={fullScreenContainerRef}
                constrain="parent"
                withArrow={false}
                offsetX={-38}
                offsetY={8}
                renderTrigger={
                  <PlayerButton
                    videoId={state.videoId}
                    tooltipLabel={translate('SETTINGS')}
                  >
                    <ScreenReaderContent>
                      {translate('SETTINGS')}
                    </ScreenReaderContent>
                    <IconSettingsSolid size="x-small" />
                  </PlayerButton>
                }
                screenReaderLabel={translate('SETTINGS')}
                on="click"
                isShowingContent={this.state.isShowingContent}
                onShowContent={() => this.handleOpenPopover(actions)}
                onHideContent={() => this.handleClosePopover(actions)}
              >
                <MenuContainer {...menuContainerProps}>
                  <InstUISettingsProvider
                    theme={{
                      componentOverrides: {
                        Menu: {
                          background: licorice,
                          minWidth: matches.includes('small')
                            ? '16rem'
                            : '18.5rem',
                        },
                        'Menu.Item': {
                          background: licorice,
                          labelColor: 'white',
                          iconColor: 'white',
                          activeIconColor: licorice,
                          activeBackground: 'white',
                          activeLabelColor: licorice,
                        },
                      },
                    }}
                  >
                    <Menu
                      label={translate('PLAYER_SETTINGS')}
                      menuRef={(ref) => {
                        this.menuRef.current = ref
                      }}
                    >
                      {this.renderBackNavigation()}
                      {this.renderMenuHeader()}
                      {this.handleSelectItem(state, actions)}
                    </Menu>
                  </InstUISettingsProvider>
                </MenuContainer>
              </Popover>
            )}
          </Responsive>
        )}
      </MediaContext.Consumer>
    )
  }
}

export default PlayerSettings
