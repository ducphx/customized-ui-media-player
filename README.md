---
category: packages
---

# @instructure/ui-media-player

A cross-browser HTML5 media player built from the ground up using React. UI-Media-Player supports many custom options and views with opportunities to provide custom content via <MediaPlayer.Overlay>.

### Features

- Compatible with Instructure-UI ([https://instructure.design/](https://instructure.design/))
- Accessible out of the box
- Themeable by design

## Getting Started

### Requirements

In order to utilize `ui-media-player` you must have the following packages present in your library...

- React `15 || 16`
- ReactDOM `15 || 16`

### Browser Support

- Chrome, Safari, Firefox, Edge (last two versions)

### Installation

Add the package to your project using either `npm` or `yarn`.

#### NPM

```
npm i @instructure/ui-media-player
```

#### Yarn

```
yarn add @instructure/ui-media-player
```

## Versioning

The UI-Media-Player uses [SemVer](https://semver.org/) for versioning.

## MediaPlayer Components

### `<MediaPlayer>`

#### Usage

```
<MediaPlayer
  disableRightClick
  poster="image/bigBuckBunnyPoster.png"
  sources={[
    {
      label: "1080p",
      src: "big_buck_bunny_1080p.mp4",
      defaultSelected: true
    },
    {
      label: "360p",
      src: "big_buck_bunny_360p.mp4"
    }
  ]}
  tracks={[
    {
      src: "big_buck_bunny_captions.srt",
      label: "English",
      type: "subtitles",
      language: "en"
    }
  ]}
/>
```

#### PropTypes

| Prop               | Type               | Default   | Description                                                                                                                                                     |
| ------------------ | ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| actionsRef         | func               |           | Function to be run on the ref of the actions component that returns functionality such as playVideo, pauseVideo, seekTo, and others.                            |
| alwaysShowControls | bool               | `false`   | If set to true, the controls will never dismiss                                                                                                                 |
| captionOffset      | number \|\| string | `0`       | Indicates the caption offset measurement for captions. Providing a number simply adds to the current measurement while a string will override the entire value. |
| captionPosition    | string             | `'top'`   | Indicates the named position of the captions. `'top'`, `'bottom'`, `'left'`, or `'right'`                                                                       |
| children           | children           |           | Only accepts <MediaPlayer.Overlay> as a child to display information overtop of the video player                                                                |
| customControls     | func               |           | Additional controls to be added to the control bar that utilizes <MediaPlayer.Control>                                                                          |
| disableRightClick  | bool               | `false`   | Disable right click on the player container                                                                                                                     |
| hideFullScreen     | bool               | `false`   | If set to true, FullScreenButton is hidden                                                                                                                      |
| label              | string             | `''`      | Give the player a label to be read by screen readers                                                                                                            |
| markers            | array              | `[]`      | Accepts <MediaPlayer.Marker> components in an array                                                                                                             |
| playhead           | node               |           | Accepts <MediaPlayer.Playhead> component                                                                                                                        |
| poster             | string             |           | The poster image to use before the media is played                                                                                                              |
| sources            | string \|\| array  | `[]`      | URL(s) of video to play. Each object in a provided array must contain values for both `src`,`label`, and optionally `defaultSelected`.                                                                            |
| tracks             | array              | `[]`      | Tracks of the video to play. Each object must contain values for `src`, `label`, `type`, and `language`                                                         |
| translations       | object             | `{}`      | Label overrides for i18n. Defaults to english.                                                                                                                  |
| type               | string             | `'video'` | One of type `'video'` or `'youtube'`                                                                                                                            |
| _fluidHeight_      | bool               | `false`   | _DEPRECATED_ Indicates the player should fill the height of its container                                                                                       |
| _fluidWidth_       | bool               | `true`    | _DEPRECATED_ Indicates the player should fill the width of its container                                                                                        |

#### Translations

Translations are supported in `<MediaPlayer>` and allow the following labels to be overridden from their defaults of English.

- `ARIA_TIMEBAR_LABEL`
- `ARIA_VIDEO_LABEL`
- `PLAYBACK_PAUSE`
- `PLAYBACK_PLAY`
- `FULL_SCREEN`
- `WINDOWED_SCREEN`
- `VOLUME_UNMUTED`
- `VOLUME_MUTED`
- `PLAYBACK_SPEED`
- `SOURCE_CHOOSER`
- `VIDEO_TRACK`
- `CAPTIONS_OFF`

##### Example

```
<MediaPlayer
  {...otherProps}
  translations={{
    VOLUME_UNMUTED: "Volume",
    VOLUME_MUTED: i18n.t('muted') // Functions that return a string are also valid
  }}
/>
```

### `<MediaPlayer.Control>`

#### Usage

##### Button Variant

```
<MediaPlayer.Control
  variant="button"
  tooltipLabel="Optional Tooltip Label"
  label="Sample Button Custom Control"
  onClick={() => alert('custom control clicked')}
  icon={<IconAlertsLine  size="x-small" />}
/>
```

##### Menu Variant

```
<MediaPlayer.Control
  menuItems={(
    <MediaPlayer.Menu.Group
      label="Item List Group"
      onSelect={(e, value) => alert(`${value} selected`)}
      selectedValue="Item 1">
      <MediaPlayer.Menu.Item value={"Item 1"}>
        Item 1
      </MediaPlayer.Menu.Item>
    </MediaPlayer.Menu.Group>
  )} />
```

#### PropTypes

| Prop          | Type            | Default    | Description                                                                                  |
| ------------- | --------------- | ---------- | -------------------------------------------------------------------------------------------- |
| variant       | string          | `'button'` | One of `button` or `menu`                                                                    |
| label         | string          | Required   | Label used for custom control                                                                |
| tooltipLabel  | node \|\| func  | undefined  | The content to render in the tooltip
| icon          | node            | Required   | Icon used to represent custom control                                                        |
| onClick       | func            | `() => {}` | Function which is called upon click of the control                                           |
| menuItem      | none            |            | Prop which accepts `<MediaPlayer.Menu.Group>` with a collection of `<MediaPlayer.Menu.Item>` |
| forwardRef    | func            |            | Function which returns a ref of the `<button>` as an argument upon mounting the component    |

### `<MediaPlayer.Marker>`

#### Usage

```
<MediaPlayer
  {...otherProps}
  markers={[
    <MediaPlayer.Marker
      active
      hoverIcon={<HoverIcon />}
      icon={<TimerIcon />}
      label="A Marker"
      onClick={() => {}}
      onReached={() => {}}
      time={someTime}
      variant="circle"
    />
  ]}
/>
```

#### PropTypes

| Prop      | Type   | Default    | Description                                                                                   |
| --------- | ------ | ---------- | --------------------------------------------------------------------------------------------- |
| active    | bool   | false      | Describes if the Player Marker is active                                                      |
| hoverIcon | node   |            | A component that is displayed when the user hovers over the marker                            |
| icon      | node   |            | Icon used to represent the marker inside the Timebar                                          |
| id        | string | Required   | Id value must be unique in order for focus management to work properly inside the MediaPlayer |
| label     | string | ''         | Label for the Marker                                                                          |
| onClick   | func   | `() => {}` | Function that is called on click of the marker                                                |
| onReached | func   |            | Function that is called upon reaching the marker location                                     |
| time      | number | 0          | Represents the time at which the marker will be triggered and fired `onReached`               |
| variant   | string | `'hidden'` | One of type `'circle'` or `'hidden'`                                                          |

### `<MediaPlayer.Overlay>`

#### Usage

```
<MediaPlayer
  {...props}>
  <MediaPlayer.Overlay
    >
    () => (
      <div>Content for the overlay</div>
    )
  </MediaPlayer.Overlay>
</MediaPlayer>
```

#### PropTypes

| Prop        | Type     | Default | Description                                                                     |
| ----------- | -------- | ------- | ------------------------------------------------------------------------------- |
| children    | function |         | Function that renders content to be displayed in the Overlay of the MediaPlayer |
| hideControls| bool     | `false` | Hide the control bar completely                                                 |


### `<MediaPlayer.Playhead>`

#### Usage

```
<MediaPlayer
  playhead={
    <MediaPlayer.Playhead
      label="A Playhead"
      onClick={() => {}}
      variant="button"
      >
  } />
```

#### PropTypes

| Prop      | Type   | Default    | Description                                                                             |
| --------- | ------ | ---------- | --------------------------------------------------------------------------------------- |
| icon      | node   |            | Represents the icon to be displayed on the Playhead                                     |
| label     | string | Required   | Label prop for the playhead                                                             |
| onClick   | func   | `() => {}` | Callback that is triggered onClick of the playhead                                      |
| menuItems | array  |            | Array of Menu Components which can be used with the playhead and Variant must be `menu` |
| variant   | string | Required   | Describes is the playhead is one of `button` or `menu`                                  |

### `<MediaPlayer.Menu.Group>`

UI-Media-Player utilizes Instructure-UI's Menu, MenuItem, and MenuGroup component for Menu. For more detailed information please see the documentation [here (InstUI v6 and above)](https://instructure.design/#Menu)

#### Usage

```
<MediaPlayer
  customControls={() => (
    <MediaPlayer.Control
      variant="menu"
      menuItems={(
        <MediaPlayer.Menu.Group
          label="Item List Group"
          onSelect={(e, value) => alert(`${value} selected`)}
          selectedValue="Item 1"
        >
          <MediaPlayer.Menu.Item value={"Item 1"}>
            Item 1
          </MediaPlayer.Menu.Item>
          <MediaPlayer.Menu.Separator />
          <MediaPlayer.Menu.Item value={"Item 2"}>
            Item 2
          </MediaPlayer.Menu.Item>
        </MediaPlayer.Menu.Group>
      )} />
  )}
/>
```

#### PropTypes

| Prop            | Type   | Default                                | Description                                                                             |
| --------------- | ------ | -------------------------------------- | --------------------------------------------------------------------------------------- |
| allowMultiple   | bool   | false                                  | Allows selection of multiple items inside a Menu Group                                  |
| children        | custom | null                                   | Children of type Menu.Item, or Menu.Separator                                           |
| controls        | string |                                        | The id of the element that the menu items will act upon                                 |
| defaultSelected | array  |                                        | An array of the values (or indices by default) for the selected items on initial render |
| disabled        | bool   | false                                  | Disabled the Menu Group                                                                 |
| isTabbable      | bool   | false                                  | Should the group appear in the tab order (the first item will have a tabIndex of 0)     |
| itemRef         | func   | function (item) {}                     | Returns a reference to the MenuItem                                                     |
| label           | node   | Required                               | Label used to describe the menu group                                                   |
| onKeyDown       | func   | `() => {}`                             | Function that is called when the menu group fires an onKeyDown event                    |
| onMouseOver     | func   | `() => {}`                             | Function that is called when the menu group fires a mouseOver event                     |
| onSelect        | func   | function (e, value, selected, item) {} | Call this function when a menu item is selected                                         |
| selected        | custom |                                        | An array of the values (or indices by default) for the selected items                   |

### `<MediaPlayer.Menu.Item>`

#### Example

See `<MediaPlayer.Menu.Group>` for a complete example.

#### PropTypes

| Prop            | Type        | Default                            | Description                                                                              |
| --------------- | ----------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| as              | elementType |                                    | Element type to render as (will default to <a> if href is provided)                      |
| children        | node        | Required                           | Content of the Menu Item                                                                 |
| controls        | string      |                                    | The id of the element that the menu item will act upon                                   |
| defaultSelected | bool        |                                    | The item which is initially selected                                                     |
| disabled        | bool        | `false`                            | Disables the item from being selected                                                    |
| href            | string      |                                    | Href attribute that redirects the user to a given URL                                    |
| onClick         | func        | `() => {}`                         | Function that is called when the menu item is clicked                                    |
| onKeyDown       | func        | `() => {}`                         | Function that is called when the menu item fires a keydown event                         |
| onKeyUp         | func        | `() => {}`                         | Function that is called when the menu item fires a keyup event                           |
| onMouseOver     | func        | `() => {}`                         | Function that is called when the menu item fires a mouseOver event                       |
| onSelect        | func        | `(e, value, selected, item) => {}` | Used with the selected prop, the component will not control its own state                |
| selected        | custom      |                                    | Determines if the menu item is selected or not (must be accompanied by an onSelect prop) |
| type            | enum        | `'button'`                         | One of: `button`, `checkbox`, `radio`, or `flyout`                                       |
| value           | union       |                                    | One of type: string or number                                                            |

### `<MediaPlayer.Menu.Separator>`

#### Example

See `<MediaPlayer.Menu.Group>` for a complete example.

#### PropTypes

No props available for `MediaPlayer.Menu.Separator`.
