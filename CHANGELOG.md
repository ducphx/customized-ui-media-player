# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.2.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v8.1.0...v8.2.0) (2022-02-22)


### Bug Fixes

* **ui-media-player:** destroy vimeo player on error refs: ARC-7999 ([68c81ee](http://gerrit.instructure.com:29418/29418/media-ui/commits/68c81eeb75e7868bf634a7443ff62a777d6e32d0))
* **ui-media-player:** fix playerhead iconbutton focus indicator refs: ARC-7951 ([23a8133](http://gerrit.instructure.com:29418/29418/media-ui/commits/23a813375130fee6668047f85e9ebc5ff021da1f))
* **ui-media-player:** player controls contrast fix, refs: ARC-7952 ([fa01080](http://gerrit.instructure.com:29418/29418/media-ui/commits/fa01080909d848c6c818b08652641bde74027ce0))





# [8.1.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v8.0.0...v8.1.0) (2021-12-22)


### Bug Fixes

* **comments-toggle:** comments toggle component refs: ARC-6411 ([155c727](http://gerrit.instructure.com:29418/29418/media-ui/commits/155c72752cda5d7f75b557bbf79fb600516dfedd))
* **media-capture,ui-media-player:** screen reader flow fix for playhead and markers ([b8c2ecb](http://gerrit.instructure.com:29418/29418/media-ui/commits/b8c2ecb99d145ec9d7f4f4440e5485c0d487db5b))
* **screen-capture:** Adjusted paddings and styles for small screens; refs: ARC-7547 ([724a41c](http://gerrit.instructure.com:29418/29418/media-ui/commits/724a41c76b895d0a6adba5672f444883d3614623))
* **ui-media-player:** Bugfix for captions settings not showing below 480px, refs: ARC-7733 ([31c3ce9](http://gerrit.instructure.com:29418/29418/media-ui/commits/31c3ce9a7ae46059abb1f287078ae4eca0310024))
* **ui-media-player:** correct focus disabling on video container, refs: ARC-7707 ([65ce332](http://gerrit.instructure.com:29418/29418/media-ui/commits/65ce3327021bd7007e3de82399834bd67c6c8ce6))
* **ui-media-player:** fix scrollable container on the main settings menu list, refs: ARC-7860 ([1288ada](http://gerrit.instructure.com:29418/29418/media-ui/commits/1288ada18d27e57a34d5f38db1fcc9a5ed1b912b))
* **ui-media-player:** implemented scrollable video settings menu, refs: ARC-7860 ([f7a678d](http://gerrit.instructure.com:29418/29418/media-ui/commits/f7a678dce7d1ee356718a6ecf6f210719d486226))
* **ui-media-player:** play videos inline on iPhones to display captions ([41e25d3](http://gerrit.instructure.com:29418/29418/media-ui/commits/41e25d3ddb1ad85bf1191d884a45ab7e56c03dc2))
* **ui-media-player:** play videos inline on iPhones to display captions, refs: ARC-7655 ([1aa4875](http://gerrit.instructure.com:29418/29418/media-ui/commits/1aa4875066f053e4d2978b425e27f5ac4a824205))
* **ui-media-player:** play youtube videos inline on iPhones ([1362735](http://gerrit.instructure.com:29418/29418/media-ui/commits/1362735b32cfa07ef4cdd7ef5535b2fffa4d93f0))
* **ui-media-player:** revert "play studio and youtube videos inline on iPhones" ([31bb67d](http://gerrit.instructure.com:29418/29418/media-ui/commits/31bb67d85f9ef8acd8e6529adb6c0c370d4d36fb))
* **ui-media-player:** Set default currentTime to have it during vimeo onPlay refs: ARC-7846 ([88f6015](http://gerrit.instructure.com:29418/29418/media-ui/commits/88f6015d7074ef004bd8fcd39ba3d7963285749d))
* **vimeo:** Error handling added to Vimeo player refs: ARC-7776 ([5fe237e](http://gerrit.instructure.com:29418/29418/media-ui/commits/5fe237e7c33902bc3d847fb3854f68c41702c048))


### Features

* **media-capture,ui-media-player:** added captions toggle, refs: ARC-7733 ([1a6829b](http://gerrit.instructure.com:29418/29418/media-ui/commits/1a6829b918d5ea73d142351e19e5641a366fa1b2))
* **ui-media-player:** add new player type: Vimeo ([5354755](http://gerrit.instructure.com:29418/29418/media-ui/commits/53547556aff867a295eb81a5c94711eae5a4399b))
* **ui-media-player:** implement new settings menu in the video player ([d84d47f](http://gerrit.instructure.com:29418/29418/media-ui/commits/d84d47f4d50967cd616752cfbd741a5e3d7dc8fd))


### Reverts

* **ui-media-player:** revert disableIframeFocus renaming ([7132f7f](http://gerrit.instructure.com:29418/29418/media-ui/commits/7132f7fe4dec76c50536d2df3ed85fb89035f999))





## [8.0.1-rc.1](http://gerrit.instructure.com:29418/29418/media-ui/compare/v8.0.0...v8.0.1-rc.1) (2021-06-15)


### Bug Fixes

* **screen-capture:** Adjusted paddings and styles for small screens; refs: ARC-7547 ([724a41c](http://gerrit.instructure.com:29418/29418/media-ui/commits/724a41c76b895d0a6adba5672f444883d3614623))





# [8.0.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v7.2.2...v8.0.0) (2021-05-13)


### Bug Fixes

* **ui-media-player:** Changing MediaPlayer properties refs: ARC-7491 ([cda74d1](http://gerrit.instructure.com:29418/29418/media-ui/commits/cda74d1dbba33283289508ea6eb122153f16833f))
* **ui-media-player:** fix showing confirm modal/edit tray with full screen ([279582c](http://gerrit.instructure.com:29418/29418/media-ui/commits/279582ca568f60fbff7a3ae19ea92c25b26c40f4))
* **ui-media-player:** fixing Youtube video receives focus when notecard is displayed! ([0ab1b4c](http://gerrit.instructure.com:29418/29418/media-ui/commits/0ab1b4cc5f6ad7243c381b481c2faecb0e2df786))
* **ui-media-player:** Return commonjs build back after upgrade to inst-ui@7. refs: ARC-7263 ([a9846fc](http://gerrit.instructure.com:29418/29418/media-ui/commits/a9846fcf2b3c398c040d0ce768202df15a7fdce7))
* **ui-media-player:** Upgrade playhead Button to IconButton. refs: ARC-7409 ([26fdcf1](http://gerrit.instructure.com:29418/29418/media-ui/commits/26fdcf1cee876aa20d8a31cede0f3bacc6aa507b))


### Features

* **ui-media-player:** Upgrade inst-ui to ^7.5.0. refs: ARC-7263 ([322b21a](http://gerrit.instructure.com:29418/29418/media-ui/commits/322b21a16e7a2544b118044f968bea4facba314b))





## [7.2.2](http://gerrit.instructure.com:29418/29418/media-ui/compare/v7.2.1...v7.2.2) (2021-03-29)

**Note:** Version bump only for package @instructure/ui-media-player





## [7.2.1](https://gerrit.instructure.com/a/media-ui/compare/v7.2.0...v7.2.1) (2021-03-23)


### Bug Fixes

* **ui-media-player:** Cleanup for PropTypes warnings. refs: ARC-7409 ([c3de8a7](https://gerrit.instructure.com/a/media-ui/commits/c3de8a79dd39d9c47793e01243b461d695f7eb0f))





# [7.2.0](https://gerrit.instructure.com/a/media-ui/compare/v7.2.0-beta.1...v7.2.0) (2021-03-19)


### Features

* **ui-media-player:** support auto-show closed captions ([2d8eea6](https://gerrit.instructure.com/a/media-ui/commits/2d8eea6e99689bd85ce296ea5d31200105e44178))





# [7.2.0-beta.1](http://gerrit.instructure.com:29418/29418/media-ui/compare/v7.1.0...v7.2.0-beta.1) (2021-02-08)


### Bug Fixes

* **media-capture:** WCAG 2.1 update to support reflow of Media-Capture fixes VICE-390 ([fe4e689](http://gerrit.instructure.com:29418/29418/media-ui/commits/fe4e68980f28f898109d681640ff0c220be465a0))
* **ui-media-player:** add keyboard focus trap to fullscreen player, fixes LS-1699 ([a3361b7](http://gerrit.instructure.com:29418/29418/media-ui/commits/a3361b776de288b63a0b9d5eee3aac950ffaa3d2))
* **ui-media-player:** add loading spinner to youtube player, refs ARC-6804 ([6f94aa7](http://gerrit.instructure.com:29418/29418/media-ui/commits/6f94aa75667d9b55156a49b3b0781c42ba0ea95c))
* **ui-media-player:** fix focus jump on controls and visual regression, refs ARC-6607 ([a946ddb](http://gerrit.instructure.com:29418/29418/media-ui/commits/a946ddbd83eeefb1679ebe3f6c831d4ef1050f62))
* **ui-media-player:** prevent tooltips from appearing when a control is active, refs ARC-6607 ([c02fccb](http://gerrit.instructure.com:29418/29418/media-ui/commits/c02fccb957e1829327b89c8d6d9d9245e1659136))


### Features

* **ui-media-player:** stop exposing onWarning callback from <MediaPlayer />, refs ARC-6963 ([48288d0](http://gerrit.instructure.com:29418/29418/media-ui/commits/48288d0958c4d6a9bfe29096bdd552adb85d7e0c))





# [7.1.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v7.0.0...v7.1.0) (2020-04-13)


### Bug Fixes

* **media-capture,ui-media-player:** truncate long caption labels, refs ARC-6370 ([934a2a8](http://gerrit.instructure.com:29418/29418/media-ui/commits/934a2a83abcdb4def3f8b23dd0c11e3d79976978))
* **ui-media-player:** don't trigger PlayerMarker's onReached when seeking, refs ARC-6431 ([c7533e0](http://gerrit.instructure.com:29418/29418/media-ui/commits/c7533e0f7c77b255286f877dfb7a9e9e4354f536))
* **ui-media-player:** don't trigger PlayerMarker's onReached when seeking, refs ARC-6431 ([f6fcaf4](http://gerrit.instructure.com:29418/29418/media-ui/commits/f6fcaf491280916446e4f9b1ef10ea565f68ce63))
* **ui-media-player:** fix PlayerButton's Popover/Menu not being centered, refs ARC-6062 ([07b41f6](http://gerrit.instructure.com:29418/29418/media-ui/commits/07b41f6b35a9287914c442af109e1a88d9814d97))
* **ui-media-player:** invoke onWarning if YT hasn't loaded for 20s, refs ARC-6463 ([3ef9268](http://gerrit.instructure.com:29418/29418/media-ui/commits/3ef926825ab48173beec745967d362f9c3439d64))
* **ui-media-player:** make YT elements interactable again, refs ARC-6373 ([6017004](http://gerrit.instructure.com:29418/29418/media-ui/commits/601700418497ea4a6cf8d44b672e4c58e7804c48))
* **ui-media-player:** prevent captions without text from being included in activeCues, refs ARC-6426 ([53879b0](http://gerrit.instructure.com:29418/29418/media-ui/commits/53879b02a104160d84da91bc39222f5093ac612f))
* **ui-media-player:** prevent marker.onReached to pop up twice on YT, refs ARC-6487 ([954ff54](http://gerrit.instructure.com:29418/29418/media-ui/commits/954ff5481e64e890f0824d0f89de8b0f4c07c7af))
* **ui-media-player,media-capture:** Update Inst UI to 6.22.0 refs ARC-6474 ([3afa4e4](http://gerrit.instructure.com:29418/29418/media-ui/commits/3afa4e484d6fc5b642fca4243509f192d6fbe0c5))


### Features

* **ui-media-player:** add Tooltip to all Player Controls, refs ARC-6062 ([efaa0cf](http://gerrit.instructure.com:29418/29418/media-ui/commits/efaa0cf8a8377972b83297df4bf46b30d9d9097a))
* **ui-media-player:** support duplicate caption labels, refs ARC-6370 ([abcfa1e](http://gerrit.instructure.com:29418/29418/media-ui/commits/abcfa1e7c476e31ba753b2c67c8ac099a5794b89))


### Reverts

* **ui-media-player:** don't trigger PlayerMarker's onReached when seeking, refs ARC-6431 ([045547d](http://gerrit.instructure.com:29418/29418/media-ui/commits/045547dcce5377017db41ed9b7256281200ba858))





# [7.0.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v6.4.0...v7.0.0) (2020-02-25)


### Bug Fixes

* **ui-media-player:** ARC-6035's hotfix, refs ARC-6035 ([91636ce](http://gerrit.instructure.com:29418/29418/media-ui/commits/91636ce256d8a4ee86f3f0d4c7bb9f9f24fcaa2f))
* **ui-media-player:** ARC-6212 hotfix, refs: ARC-6212 ([db6df7d](http://gerrit.instructure.com:29418/29418/media-ui/commits/db6df7de99497d1d89b5a8d421cf72d916015f91))
* **ui-media-player:** automatically turn off captions when user deletes current active captions ([2908b41](http://gerrit.instructure.com:29418/29418/media-ui/commits/2908b41610c003e818ef441b7652f92d6da9a901))
* **ui-media-player:** clear stale converted tracks, refs: ARC-6212 ([c551ba5](http://gerrit.instructure.com:29418/29418/media-ui/commits/c551ba521fc869197c0b2f933b867adacfb5d4ae))
* Updating InstUI warnings in MediaUI ([10103bc](http://gerrit.instructure.com:29418/29418/media-ui/commits/10103bc5548eed37e5e1f41c899c4419e6f40c13))
* **ui-media-player:** disable right click only on renderer, refs ARC-6299 ([b0e9b15](http://gerrit.instructure.com:29418/29418/media-ui/commits/b0e9b156df897101e96863355519f1fe1e9885ea))
* **ui-media-player:** disambiguate "Unmuted", refs ARC-6091 ([574d37d](http://gerrit.instructure.com:29418/29418/media-ui/commits/574d37d6c47c0ebff38f5531482234098dc49541))
* **ui-media-player:** focusMarker is not a function, refs ARC-6348 ([a02b612](http://gerrit.instructure.com:29418/29418/media-ui/commits/a02b612d160b2d9f33be2a1de3603897938dd8ef))
* **ui-media-player:** for translations: OFF -> CAPTIONS_OFF, refs ARC-6124 ([c92199a](http://gerrit.instructure.com:29418/29418/media-ui/commits/c92199ad95287a8fdf079038c77679b0c1e55de9))
* **ui-media-player:** make marker's focus state a11y-compliant, refs ARC-6316 ([9953250](http://gerrit.instructure.com:29418/29418/media-ui/commits/9953250fd4fb196a76b044d8d65532dc37ff6735))
* **ui-media-player:** make playback speed text fit inside its focus ring, refs ARC-6045 ([4781c1c](http://gerrit.instructure.com:29418/29418/media-ui/commits/4781c1c0dd9f4b622dad37b5df61f56e76f8c93a))
* **ui-media-player:** persist focus after clicking PlayerButton, refs ARC-6056 ([2832741](http://gerrit.instructure.com:29418/29418/media-ui/commits/28327410fcd5727cff6402ed1801771e6fa5a1f5))
* **ui-media-player:** stop moving time text when hovering over playhead & marker, refs ARC-6015 ([628e526](http://gerrit.instructure.com:29418/29418/media-ui/commits/628e5264a2e46852f002262f224e93f2df5148e9))
* **ui-media-player:** stop player from jumping back to 0 when changing b/w sources, refs ARC-6112 ([34d43fb](http://gerrit.instructure.com:29418/29418/media-ui/commits/34d43fba0a84ea6bec2183144300f76cbd9880c4))


### Features

* **media-capture,ui-media-player:** upgrading from UI-Testbed to use Enzyme ([bfbb5c5](http://gerrit.instructure.com:29418/29418/media-ui/commits/bfbb5c5dfb2e82d1abdd90f0cc93a20dcd2b4c4f))
* **ui-media-player:** add muted state, refs ARC-6035 ([b043c16](http://gerrit.instructure.com:29418/29418/media-ui/commits/b043c1634732158dc26caee8e32c7e1bf02a1139))
* **ui-media-player:** show captions independent of Renderer type, refs: ARC-6185 ([47318df](http://gerrit.instructure.com:29418/29418/media-ui/commits/47318dfa94c56209b7a2749df620a8aad2fb3619))
* **ui-media-player:** update controls colors to licorice ([565238e](http://gerrit.instructure.com:29418/29418/media-ui/commits/565238e9cdc3a4449d36a5b4fe065118121dab90))


### Performance Improvements

* **ui-media-player:** optimize handling big caption files, refs: ARC-6220 ([fdff256](http://gerrit.instructure.com:29418/29418/media-ui/commits/fdff2565e2bfb6c1a5566e298d06069e7707e609))





# [6.4.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v6.3.0...v6.4.0) (2020-01-07)


### Bug Fixes

* **ui-media-player:** always position last control correctly ([894565f](http://gerrit.instructure.com:29418/29418/media-ui/commits/894565f))
* **ui-media-player:** restore ability for custom controls to receive single node ([ad77fa1](http://gerrit.instructure.com:29418/29418/media-ui/commits/ad77fa1))


### Features

* **ui-media-player:** introduce captionPosition and captionOffset, refs: ARC-6014 ([b5e5981](http://gerrit.instructure.com:29418/29418/media-ui/commits/b5e5981))





# [6.3.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v6.2.0...v6.3.0) (2020-01-02)


### Bug Fixes

* **ui-media-player:** active / focus states should also display the hoverIcon ([c2c55ea](http://gerrit.instructure.com:29418/29418/media-ui/commits/c2c55ea))
* **ui-media-player:** add hidden variant to PlayerMarker ([a4ff6a9](http://gerrit.instructure.com:29418/29418/media-ui/commits/a4ff6a9))
* **ui-media-player:** add padding around captions text ([91efc4e](http://gerrit.instructure.com:29418/29418/media-ui/commits/91efc4e))
* **ui-media-player:** align video source change behaviour with mediaelement ([5adc9e5](http://gerrit.instructure.com:29418/29418/media-ui/commits/5adc9e5))
* **ui-media-player:** align youtube renderer videoId with player controls ([5c19b85](http://gerrit.instructure.com:29418/29418/media-ui/commits/5c19b85))
* **ui-media-player:** allow timebar to show durations of over an hour ([06fcd14](http://gerrit.instructure.com:29418/29418/media-ui/commits/06fcd14))
* **ui-media-player:** disable full screen button if screenful does not support it ([ff8fa4a](http://gerrit.instructure.com:29418/29418/media-ui/commits/ff8fa4a))
* **ui-media-player:** disable touch press highlight on Android ([5a301f4](http://gerrit.instructure.com:29418/29418/media-ui/commits/5a301f4))
* **ui-media-player:** ensure buffered is always larger than currentTime ([c0c2243](http://gerrit.instructure.com:29418/29418/media-ui/commits/c0c2243))
* **ui-media-player:** ensure focus indicator doesn't overlap playhead ([ca06a1c](http://gerrit.instructure.com:29418/29418/media-ui/commits/ca06a1c))
* **ui-media-player:** fix current time inconsistent state representation after seek on youtube ([3b6d860](http://gerrit.instructure.com:29418/29418/media-ui/commits/3b6d860))
* **ui-media-player:** fix full screen mode in Safari / IE11 ([2f76bb6](http://gerrit.instructure.com:29418/29418/media-ui/commits/2f76bb6))
* **ui-media-player:** fix IE11 controls / overlay positioning ([11f2b0e](http://gerrit.instructure.com:29418/29418/media-ui/commits/11f2b0e))
* **ui-media-player:** fix Overlay's and PlayerControls' DOM order ([65b37e2](http://gerrit.instructure.com:29418/29418/media-ui/commits/65b37e2))
* **ui-media-player:** fix playhead / marker keyboard accessibility ([fae90fc](http://gerrit.instructure.com:29418/29418/media-ui/commits/fae90fc))
* **ui-media-player:** fix sizing of player buttons on iOS ([3823851](http://gerrit.instructure.com:29418/29418/media-ui/commits/3823851))
* **ui-media-player:** fix video overlaying controls in iOS Mobile Safari ([bfc4257](http://gerrit.instructure.com:29418/29418/media-ui/commits/bfc4257))
* **ui-media-player:** make 'Off' the selected default caption ([504521f](http://gerrit.instructure.com:29418/29418/media-ui/commits/504521f))
* **ui-media-player:** make focus on Timebar's onClick more persistent ([36137ba](http://gerrit.instructure.com:29418/29418/media-ui/commits/36137ba))
* **ui-media-player:** make YouTube elements uninteractable ([47ff905](http://gerrit.instructure.com:29418/29418/media-ui/commits/47ff905))
* **ui-media-player:** only call onControlsShown() when controls were not already visible ([bd582e7](http://gerrit.instructure.com:29418/29418/media-ui/commits/bd582e7))
* **ui-media-player:** prevent focusing of elements within an aria-hidden parent ([672c2dd](http://gerrit.instructure.com:29418/29418/media-ui/commits/672c2dd))
* **ui-media-player:** prevent left / right arrow keys from seeking when a control is activated ([bfc2d3d](http://gerrit.instructure.com:29418/29418/media-ui/commits/bfc2d3d))
* **ui-media-player:** prevent seeking to 0:00 when changing media source ([16a7497](http://gerrit.instructure.com:29418/29418/media-ui/commits/16a7497))
* **ui-media-player:** prevent tabbing to buttons when non-passthrough overlay is displayed ([97c3940](http://gerrit.instructure.com:29418/29418/media-ui/commits/97c3940))
* **ui-media-player:** prevent timebar from seeking when playhead / markers are clicked ([a2a7327](http://gerrit.instructure.com:29418/29418/media-ui/commits/a2a7327))
* **ui-media-player:** reset focus enabled state when an overlay is unmounted ([0e6b4ef](http://gerrit.instructure.com:29418/29418/media-ui/commits/0e6b4ef))
* **ui-media-player:** restrict Height for Native Video in Fullscreen ([4660f6f](http://gerrit.instructure.com:29418/29418/media-ui/commits/4660f6f))
* **ui-media-player:** show spinner when <video /> is buffering ([48cce9b](http://gerrit.instructure.com:29418/29418/media-ui/commits/48cce9b))
* **ui-media-player:** support SRT => VTT translation in IE11 ([e1e79fb](http://gerrit.instructure.com:29418/29418/media-ui/commits/e1e79fb))
* **ui-media-player:** update marker instance when id changes ([94b46dd](http://gerrit.instructure.com:29418/29418/media-ui/commits/94b46dd))
* **ui-media-player:** update tracks state when props update ([9d5ab25](http://gerrit.instructure.com:29418/29418/media-ui/commits/9d5ab25))


### Features

* **ui-media-player:** add support for hoverIcon / onclick / onReached to PlayerMarker ([16dc48f](http://gerrit.instructure.com:29418/29418/media-ui/commits/16dc48f))
* **ui-media-player:** add support for playhead to MediaPlayer ([e0835b6](http://gerrit.instructure.com:29418/29418/media-ui/commits/e0835b6))
* **ui-media-player:** Added Custom Controls ([077f311](http://gerrit.instructure.com:29418/29418/media-ui/commits/077f311))
* **ui-media-player:** Added fluidWidth/Height props ([5f1bf3d](http://gerrit.instructure.com:29418/29418/media-ui/commits/5f1bf3d))
* **ui-media-player:** align RMP captions UX with MEJS' ([ca5ed0b](http://gerrit.instructure.com:29418/29418/media-ui/commits/ca5ed0b))
* **ui-media-player:** allow full screen to be explicitly toggled on / off ([d20cc40](http://gerrit.instructure.com:29418/29418/media-ui/commits/d20cc40))
* **ui-media-player:** circle marker support ([5d05302](http://gerrit.instructure.com:29418/29418/media-ui/commits/5d05302))
* **ui-media-player:** emulated track support for cross-browser styling consistency ([9835857](http://gerrit.instructure.com:29418/29418/media-ui/commits/9835857))
* **ui-media-player:** expose actionsRef on MediaPlayer ([2af291e](http://gerrit.instructure.com:29418/29418/media-ui/commits/2af291e))
* **ui-media-player:** expose onControlsHidden / onControlsShown ([d817b4f](http://gerrit.instructure.com:29418/29418/media-ui/commits/d817b4f))
* **ui-media-player:** provide focusPlay() action ([85ae2bb](http://gerrit.instructure.com:29418/29418/media-ui/commits/85ae2bb))
* **ui-media-player:** support for disabling right click ([3d5f535](http://gerrit.instructure.com:29418/29418/media-ui/commits/3d5f535))
* **ui-media-player:** support SRT caption files ([df113df](http://gerrit.instructure.com:29418/29418/media-ui/commits/df113df))
* **ui-media-player:** Update Media Player Chrome ([52b69ae](http://gerrit.instructure.com:29418/29418/media-ui/commits/52b69ae))
* **ui-media-player:** youtube ([ad61e8e](http://gerrit.instructure.com:29418/29418/media-ui/commits/ad61e8e))


### Reverts

* **ui-media-player:** fix Overlay's and PlayerControls' DOM order ([5aa19da](http://gerrit.instructure.com:29418/29418/media-ui/commits/5aa19da))





# [6.2.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v6.1.0...v6.2.0) (2019-11-13)


### Features

* **ui-media-player:** add label prop to MediaPlayer ([215325b](http://gerrit.instructure.com:29418/29418/media-ui/commits/215325b))
* **ui-media-player:** enable <VideoRenderer /> to receive a poster ([853b700](http://gerrit.instructure.com:29418/29418/media-ui/commits/853b700))
* **ui-media-player:** expose additional events on media player ([41f326e](http://gerrit.instructure.com:29418/29418/media-ui/commits/41f326e))
* **ui-media-player:** expose renderer events on MediaPlayer ([7131dc6](http://gerrit.instructure.com:29418/29418/media-ui/commits/7131dc6))
* **ui-media-player:** introduce <MediaPlayer.Overlay> ([110dc7a](http://gerrit.instructure.com:29418/29418/media-ui/commits/110dc7a))





# [6.1.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v6.0.2...v6.1.0) (2019-11-07)


### Bug Fixes

* **ui-media-player:** make hovering popover/menu persist showing controls ([57e1a2d](http://gerrit.instructure.com:29418/29418/media-ui/commits/57e1a2d))
* **ui-media-player:** persist showing controls when menu/popovers are open ([91ee5a0](http://gerrit.instructure.com:29418/29418/media-ui/commits/91ee5a0))
* **ui-media-player:** prevent VolumeSlider keyboard shortcuts from affecting container ([8bfc331](http://gerrit.instructure.com:29418/29418/media-ui/commits/8bfc331))


### Features

* **ui-media-player:** enable MediaPlayer consumers to provide their own translations ([b4951a0](http://gerrit.instructure.com:29418/29418/media-ui/commits/b4951a0))





## [6.0.2](http://gerrit.instructure.com:29418/29418/media-ui/compare/v6.0.1...v6.0.2) (2019-10-31)


### Bug Fixes

* **ui-media-player:** Modify Media Player to respect min/max dimensions ([c10bd52](http://gerrit.instructure.com:29418/29418/media-ui/commits/c10bd52))





## [6.0.1](http://gerrit.instructure.com:29418/29418/media-ui/compare/v6.0.0...v6.0.1) (2019-10-24)


### Features

* **ui-media-player:** add hideFullScreen prop ([2415d47](http://gerrit.instructure.com:29418/29418/media-ui/commits/2415d47))
* **ui-media-player:** replace VideoPlayer with MediaPlayer ([f6f1847](http://gerrit.instructure.com:29418/29418/media-ui/commits/f6f1847))


### BREAKING CHANGES

* **ui-media-player:** - Introduce `hideFullScreen` prop (`controls` prop's partial replacement)

Before
```
<MediaPlayer
  controls={(VPC) => (
    <VPC>
      <VPC.PlayPauseButton />
      <VPC.Timebar />
      <VPC.Volume />
      <VPC.PlaybackSpeed />
      <VPC.TrackChooser />
      <VPC.SourceChooser />
      {document.fullscreenEnabled && <VPC.FullScreenButton />}
    </VPC>
  )}
/>
```

After
```
<MediaPlayer hideFullScreen={!document.fullscreenEnabled} />
```

Change-Id: I2fc329fc36aa09f3b5f497a99b6b3b8a24384a70
Reviewed-on: https://gerrit.instructure.com/c/media-ui/+/212196
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
QA-Review: Billy Agung Tjahjady <bagung@instructure.com>
Product-Review: Billy Agung Tjahjady <bagung@instructure.com>
Reviewed-by: Aaron Ogata <aogata@instructure.com>
* **ui-media-player:** - Renamed the exported component from VideoPlayer to MediaPlayer.
- Removed `controls` prop

Change-Id: Icfe5a4b638ea30eb40df6f2525f097e6cbfffa54
Reviewed-on: https://gerrit.instructure.com/c/media-ui/+/212058
Tested-by: Service Cloud Jenkins <svc.cloudjenkins@instructure.com>
Reviewed-by: Forrest Keppler <fkeppler@instructure.com>
QA-Review: Billy Agung Tjahjady <bagung@instructure.com>
Product-Review: Billy Agung Tjahjady <bagung@instructure.com>





## [5.54.1](http://gerrit.instructure.com:29418/29418/media-ui/compare/v5.54.0...v5.54.1) (2019-10-03)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.54.0](http://gerrit.instructure.com/media-ui/compare/v5.53.2...v5.54.0) (2019-08-19)


### Features

* **media-capture,ui-media-player:** upgrade to instUI6 ([2879db4](http://gerrit.instructure.com/media-ui/commits/2879db4))





## [5.53.2](http://gerrit.instructure.com/media-ui/compare/v5.53.1...v5.53.2) (2019-07-03)

**Note:** Version bump only for package @instructure/ui-media-player





## [5.53.1](http://gerrit.instructure.com:29418/29418/media-ui/compare/v5.53.0...v5.53.1) (2019-05-25)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.53.0](http://gerrit.instructure.com:29418/29418/media-ui/compare/v5.52.1...v5.53.0) (2019-05-01)


### Features

* add tracks to media player ([e3e42e9](http://gerrit.instructure.com:29418/29418/media-ui/commits/e3e42e9))





## 5.52.1 (2019-04-04)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.52.0](https://github.com/instructure/instructure-ui/compare/v5.51.1...v5.52.0) (2019-04-03)

**Note:** Version bump only for package @instructure/ui-media-player




## [5.51.1](https://github.com/instructure/instructure-ui/compare/v5.51.0...v5.51.1) (2019-03-30)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.51.0](https://github.com/instructure/instructure-ui/compare/v5.50.0...v5.51.0) (2019-03-29)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.50.0](https://github.com/instructure/instructure-ui/compare/v5.49.0...v5.50.0) (2019-03-28)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.49.0](https://github.com/instructure/instructure-ui/compare/v5.48.0...v5.49.0) (2019-03-22)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.48.0](https://github.com/instructure/instructure-ui/compare/v5.47.0...v5.48.0) (2019-03-18)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.47.0](https://github.com/instructure/instructure-ui/compare/v5.46.1...v5.47.0) (2019-03-15)

**Note:** Version bump only for package @instructure/ui-media-player





## [5.46.1](https://github.com/instructure/instructure-ui/compare/v5.46.0...v5.46.1) (2019-03-13)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.46.0](https://github.com/instructure/instructure-ui/compare/v5.45.1...v5.46.0) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-media-player





## [5.45.1](https://github.com/instructure/instructure-ui/compare/v5.45.0...v5.45.1) (2019-03-12)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.45.0](https://github.com/instructure/instructure-ui/compare/v5.44.0...v5.45.0) (2019-03-11)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.44.0](https://github.com/instructure/instructure-ui/compare/v5.43.0...v5.44.0) (2019-03-01)

**Note:** Version bump only for package @instructure/ui-media-player





# [5.43.0](https://github.com/instructure/instructure-ui/compare/v5.42.0...v5.43.0) (2019-02-27)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.42.0"></a>
# [5.42.0](https://github.com/instructure/instructure-ui/compare/v5.41.1...v5.42.0) (2019-02-15)


### Features

* **ui-scripts,ui-test-utils:** add a --mocha option to ui-test ([bd37e2b](https://github.com/instructure/instructure-ui/commit/bd37e2b))





<a name="5.41.1"></a>
## [5.41.1](https://github.com/instructure/instructure-ui/compare/v5.41.0...v5.41.1) (2019-01-30)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.41.0"></a>
# [5.41.0](https://github.com/instructure/instructure-ui/compare/v5.40.0...v5.41.0) (2019-01-29)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.40.0"></a>
# [5.40.0](https://github.com/instructure/instructure-ui/compare/v5.39.0...v5.40.0) (2019-01-15)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.39.0"></a>
# [5.39.0](https://github.com/instructure/instructure-ui/compare/v5.38.0...v5.39.0) (2019-01-11)


### Features

* **uid:** Add a uid package/util ([279bcda](https://github.com/instructure/instructure-ui/commit/279bcda))





<a name="5.38.0"></a>
# [5.38.0](https://github.com/instructure/instructure-ui/compare/v5.37.0...v5.38.0) (2019-01-04)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.37.0"></a>
# [5.37.0](https://github.com/instructure/instructure-ui/compare/v5.36.0...v5.37.0) (2018-12-18)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.36.0"></a>
# [5.36.0](https://github.com/instructure/instructure-ui/compare/v5.35.0...v5.36.0) (2018-12-12)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.35.0"></a>
# [5.35.0](https://github.com/instructure/instructure-ui/compare/v5.34.0...v5.35.0) (2018-12-06)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.34.0"></a>
# [5.34.0](https://github.com/instructure/instructure-ui/compare/v5.33.0...v5.34.0) (2018-11-20)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.33.0"></a>
# [5.33.0](https://github.com/instructure/instructure-ui/compare/v5.32.0...v5.33.0) (2018-11-14)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.32.0"></a>
# [5.32.0](https://github.com/instructure/instructure-ui/compare/v5.31.0...v5.32.0) (2018-10-31)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.31.0"></a>
# [5.31.0](https://github.com/instructure/instructure-ui/compare/v5.30.0...v5.31.0) (2018-10-26)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.30.0"></a>
# [5.30.0](https://github.com/instructure/instructure-ui/compare/v5.29.0...v5.30.0) (2018-09-27)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.29.0"></a>
# [5.29.0](https://github.com/instructure/instructure-ui/compare/v5.28.1...v5.29.0) (2018-09-26)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.28.1"></a>
## [5.28.1](https://github.com/instructure/instructure-ui/compare/v5.28.0...v5.28.1) (2018-09-18)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.28.0"></a>
# [5.28.0](https://github.com/instructure/instructure-ui/compare/v5.27.0...v5.28.0) (2018-09-13)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.27.0"></a>
# [5.27.0](https://github.com/instructure/instructure-ui/compare/v5.26.0...v5.27.0) (2018-09-10)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.26.0"></a>
# [5.26.0](https://github.com/instructure/instructure-ui/compare/v5.25.0...v5.26.0) (2018-09-06)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.25.0"></a>
# [5.25.0](https://github.com/instructure/instructure-ui/compare/v5.24.0...v5.25.0) (2018-08-24)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.24.0"></a>
# [5.24.0](https://github.com/instructure/instructure-ui/compare/v5.23.0...v5.24.0) (2018-08-08)


### Bug Fixes

* **ui-elements:** remove relative import ([d0a184e](https://github.com/instructure/instructure-ui/commit/d0a184e))


### Performance Improvements

* get babel helpers from 'babel-runtime' instead of inlining them ([1472658](https://github.com/instructure/instructure-ui/commit/1472658))





<a name="5.23.0"></a>
# [5.23.0](https://github.com/instructure/instructure-ui/compare/v5.22.0...v5.23.0) (2018-08-03)


### Features

* **ui-media-player:** Add SourceChooser to VideoPlayerControls ([44fdb71](https://github.com/instructure/instructure-ui/commit/44fdb71))





<a name="5.22.0"></a>
# [5.22.0](https://github.com/instructure/instructure-ui/compare/v5.21.0...v5.22.0) (2018-07-27)


### Bug Fixes

* move React/ReactDOM back to peerDependencies ([99e9458](https://github.com/instructure/instructure-ui/commit/99e9458))





<a name="5.21.0"></a>
# [5.21.0](https://github.com/instructure/instructure-ui/compare/v5.20.1...v5.21.0) (2018-07-25)


### Bug Fixes

* add React,React-DOM 16 to dependencies ([d49430f](https://github.com/instructure/instructure-ui/commit/d49430f))
* **ui-docs-plugin:** fix docs build w/ docker ([565147e](https://github.com/instructure/instructure-ui/commit/565147e))





<a name="5.20.1"></a>
## [5.20.1](https://github.com/instructure/instructure-ui/compare/v5.20.0...v5.20.1) (2018-07-18)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.20.0"></a>
# [5.20.0](https://github.com/instructure/instructure-ui/compare/v5.19.0...v5.20.0) (2018-07-17)


### Bug Fixes

* **docker,ui-presets:** fix a few bugs with the post-publish script ([c75f5cc](https://github.com/instructure/instructure-ui/commit/c75f5cc))





<a name="5.19.0"></a>
# [5.19.0](https://github.com/instructure/instructure-ui/compare/v5.18.0...v5.19.0) (2018-07-12)


### Features

* **ui-media-player:** Add Volume to VideoPlayerControls ([762242e](https://github.com/instructure/instructure-ui/commit/762242e))





<a name="5.18.0"></a>
# [5.18.0](https://github.com/instructure/instructure-ui/compare/v5.17.0...v5.18.0) (2018-07-09)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.17.0"></a>
# [5.17.0](https://github.com/instructure/instructure-ui/compare/v5.16.0...v5.17.0) (2018-07-06)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.16.0"></a>
# [5.16.0](https://github.com/instructure/instructure-ui/compare/v5.15.0...v5.16.0) (2018-07-06)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.15.0"></a>
# [5.15.0](https://github.com/instructure/instructure-ui/compare/v5.14.0...v5.15.0) (2018-06-28)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.14.0"></a>
# [5.14.0](https://github.com/instructure/instructure-ui/compare/v5.13.1...v5.14.0) (2018-06-28)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.13.1"></a>
## [5.13.1](https://github.com/instructure/instructure-ui/compare/v5.13.0...v5.13.1) (2018-06-22)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.13.0"></a>
# [5.13.0](https://github.com/instructure/instructure-ui/compare/v5.12.0...v5.13.0) (2018-06-16)


### Features

* **ui-media-player:** Add FullScreenButton to ([2ba3722](https://github.com/instructure/instructure-ui/commit/2ba3722))





<a name="5.12.0"></a>
# [5.12.0](https://github.com/instructure/instructure-ui/compare/v5.11.0...v5.12.0) (2018-06-11)

**Note:** Version bump only for package @instructure/ui-media-player





<a name="5.11.0"></a>
# [5.11.0](https://github.com/instructure/instructure-ui/compare/v5.10.0...v5.11.0) (2018-06-06)


### Features

* **ui-media-player:** Adopt Legacy Context API ([7416dd4](https://github.com/instructure/instructure-ui/commit/7416dd4))
* **ui-media-player,media-capture:** Rtl support for VideoPlayer ([bbe0f60](https://github.com/instructure/instructure-ui/commit/bbe0f60))
* **ui-presets:** Add stylelint rules for bidrectional text support ([b58ea17](https://github.com/instructure/instructure-ui/commit/b58ea17))





See the instructure-ui mono-repo [change log](#CHANGELOG) for past changes.
