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

import React from 'react'
import { PAUSED, PLAYING, ENDED } from '../../../constants'
import injectVimeo from 'inject-loader!./index'

const unwrapComponent = (subject) => subject.childAt(0)

const promiseSpy = sinon.stub().resolves(() => Promise.resolve())

class Player {
  events = {}
  on = (key, cb) => {
    this.events[key] = cb
  }
  off = () => promiseSpy()
  destroy = () => promiseSpy()
  ready = () => promiseSpy()
  trigger = (key, ...args) => {
    this.events[key](...args)
  }
}
class PlayerError extends Player {
  ready = () => Promise.reject('error')
}

const Vimeo = injectVimeo({
  '@vimeo/player': Player,
}).default

const VimeoError = injectVimeo({
  '@vimeo/player': PlayerError,
}).default

const props = {
  type: 'vimeo',
  videoId: 'test',
  setActions: () => {},
  onRendererStateChange: () => {},
  setPlaybackSpeedOptions: () => {},
  setLoadingOverlay: () => {},
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
  onVolumeChange: () => {},
  onError: () => {},
}

describe('<Vimeo />', () => {
  const render = (options, error = false) => {
    if (error) {
      return mount(<VimeoError {...props} {...options} />)
    }
    return mount(<Vimeo {...props} {...options} />)
  }
  let mockVideo

  beforeEach(() => {
    mockVideo = {
      getMuted: () => false,
      ready: () => {},
      ended: () => {},
    }
  })

  function renderWithMockVideo(
    propOverrides = {},
    videoOverrides = {},
    error = false,
    unwrap = false
  ) {
    const vimeo = render({ ...props, ...propOverrides }, error)
    const unwrappedVimeo = unwrapComponent(vimeo)
    unwrappedVimeo.instance().player = {
      ...unwrappedVimeo.instance().player,
      ...mockVideo,
      ...videoOverrides,
    }
    return unwrap ? unwrappedVimeo : vimeo
  }

  it('renders the player', () => {
    const player = render()
    expect(player.find(Vimeo)).to.be.present()
  })

  it('sets initial duration', async () => {
    const onRendererStateChange = sinon.stub()
    const vimeoPlayer = renderWithMockVideo(
      { onRendererStateChange },
      { getDuration: () => 42 },
      false,
      true
    )
    expect(onRendererStateChange).not.to.have.been.called()
    await vimeoPlayer
      .instance()
      .setInitialDuration(vimeoPlayer.instance().player)
    expect(onRendererStateChange).to.have.been.calledWith({ duration: 42 })
  })

  it('plays video', () => {
    const play = sinon.stub()
    const vimeoPlayer = renderWithMockVideo({}, { play }, false, true)
    expect(play).not.to.have.been.called()
    vimeoPlayer.instance().play()
    expect(play).to.have.been.called()
  })

  it('pauses video', () => {
    const pause = sinon.stub()
    const vimeoPlayer = renderWithMockVideo({}, { pause }, false, true)
    expect(pause).not.to.have.been.called()
    vimeoPlayer.instance().pause()
    expect(pause).to.have.been.called()
  })

  it('toggle plays the video', () => {
    const play = sinon.stub()
    const pause = sinon.stub()
    const vimeoPlayer = renderWithMockVideo({}, { play, pause })

    expect(play).not.to.have.been.called()
    expect(pause).not.to.have.been.called()

    unwrapComponent(vimeoPlayer).instance().togglePlay()

    expect(play).to.have.been.called()
    expect(pause).not.to.have.been.calledOnce()

    vimeoPlayer.setProps({ mediaState: PLAYING })
    unwrapComponent(vimeoPlayer).instance().togglePlay()

    expect(play).to.have.been.calledOnce()
    expect(pause).to.have.been.calledOnce()
  })

  it('sets playback speed', () => {
    const setPlaybackRate = sinon.stub()
    const vimeoPlayer = renderWithMockVideo(
      {},
      { setPlaybackRate },
      false,
      true
    )
    expect(setPlaybackRate).not.to.have.been.called()
    const speed = 1.25
    vimeoPlayer.instance().setPlaybackSpeed(speed)
    expect(setPlaybackRate).to.have.been.calledWith(speed)
  })

  describe('sets volume and unmutes', async () => {
    const setVolume = sinon.stub()
    const setMuted = sinon.stub()
    const vimeoPlayer = renderWithMockVideo(
      {},
      { getMuted: () => true, setVolume, setMuted },
      false,
      true
    )
    expect(setVolume).not.to.have.been.called()
    expect(setMuted).not.to.have.been.called()
    const volume = 0.75
    await vimeoPlayer.instance().setVolume(volume)
    expect(setVolume).to.have.been.calledWith(volume)
    expect(setMuted).to.have.been.calledWith(false)
  })

  describe('toggles mute', () => {
    it('mutes', async () => {
      const setMuted = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {},
        { getMuted: () => false, setMuted },
        false,
        true
      )
      expect(setMuted).not.to.have.been.called()
      await vimeoPlayer.instance().toggleMute()
      expect(setMuted).to.have.been.calledWith(true)
    })

    it('unmutes', async () => {
      const setMuted = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {},
        { getMuted: () => true, setMuted },
        false,
        true
      )
      expect(setMuted).not.to.have.been.called()
      await vimeoPlayer.instance().toggleMute()
      expect(setMuted).to.have.been.calledWith(false)
    })

    it('destroys the player', async () => {
      const destroy = sinon.stub()
      const vimeoPlayer = renderWithMockVideo({}, { destroy })
      vimeoPlayer.unmount()
      expect(destroy).to.have.been.called()
    })
  })

  describe('seeks to a certain time', () => {
    it('and start playing the video', async () => {
      const setCurrentTime = sinon.stub()
      const play = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {},
        { setCurrentTime, getDuration: () => 42, play },
        false,
        true
      )
      expect(play).not.to.have.been.called()
      expect(setCurrentTime).not.to.have.been.called()
      vimeoPlayer.instance().buffered = 30
      const time = 12
      await vimeoPlayer.instance().seek(time)
      expect(setCurrentTime).to.have.been.calledWith(time)
    })

    it('and keep the state once the video has started playing', async () => {
      const setCurrentTime = sinon.stub()
      const play = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {},
        { setCurrentTime, getDuration: () => 42, play }
      )
      expect(play).not.to.have.been.called()
      expect(setCurrentTime).not.to.have.been.called()

      vimeoPlayer.setProps({ mediaState: PAUSED })

      const time = 12
      await unwrapComponent(vimeoPlayer).instance().seek(time)
      expect(setCurrentTime).to.have.been.calledWith(time)

      expect(play).not.to.have.been.called()
    })
  })

  describe('bufferstart event', () => {
    it('displays a spinner', () => {
      const setLoadingOverlay = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        { setLoadingOverlay },
        {},
        false,
        true
      )
      vimeoPlayer.instance().player.trigger('bufferstart')

      expect(setLoadingOverlay).to.have.been.calledWith(true)
    })
  })

  describe('bufferend event', () => {
    it('hides a spinner', () => {
      const setLoadingOverlay = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        { setLoadingOverlay },
        {},
        false,
        true
      )
      vimeoPlayer.instance().player.trigger('bufferend')

      expect(setLoadingOverlay).to.have.been.calledWith(false)
    })
  })

  describe('playing event', () => {
    it('hides a spinner', () => {
      const setLoadingOverlay = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        { setLoadingOverlay },
        {},
        false,
        true
      )
      vimeoPlayer.instance().player.trigger('playing')

      expect(setLoadingOverlay).to.have.been.calledWith(false)
    })
  })

  describe('calls media event callbacks', () => {
    let onRendererStateChange, onRendererStateChangeSpy
    beforeEach(() => {
      onRendererStateChangeSpy = sinon.stub()
      onRendererStateChange = (state, cb) => {
        onRendererStateChangeSpy(state)
        cb()
      }
    })
    afterEach(() => {
      onRendererStateChangeSpy.reset()
    })

    it('onCanPlay', async () => {
      const onCanPlay = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {
          onRendererStateChange,
          onCanPlay,
        },
        { getDuration: () => 42 },
        false,
        true
      )
      await vimeoPlayer
        .instance()
        .setInitialDuration(vimeoPlayer.instance().player)
      expect(onCanPlay).to.have.been.called()
    })

    it('onLoaded', () => {
      const onLoadedData = sinon.stub()
      const vimeoPlayer = renderWithMockVideo({ onLoadedData }, {}, false, true)
      vimeoPlayer.instance().player.trigger('loaded')

      expect(onLoadedData).to.have.been.called()
    })

    it('onPlay', () => {
      const onPlay = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        { onPlay, onRendererStateChange },
        {},
        false,
        true
      )
      vimeoPlayer.instance().player.trigger('play', { seconds: 0 })

      expect(onPlay).to.have.been.called()
      expect(onRendererStateChangeSpy).to.have.been.calledWith({
        mediaState: PLAYING,
        currentTime: 0,
      })
    })

    it('onEnded', () => {
      const onEnded = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {
          onEnded,
          onRendererStateChange,
        },
        {},
        false,
        true
      )
      vimeoPlayer.instance().player.trigger('ended')

      expect(onEnded).to.have.been.called()
      expect(onRendererStateChangeSpy).to.have.been.calledWith({
        mediaState: ENDED,
      })
    })

    it('onPause', () => {
      const onPause = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {
          onPause,
          onRendererStateChange,
        },
        {},
        false,
        true
      )
      vimeoPlayer.instance().player.trigger('pause')

      expect(onPause).to.have.been.called()
      expect(onRendererStateChangeSpy).to.have.been.calledWith({
        mediaState: PAUSED,
      })
    })

    it('onSeeked', () => {
      const onSeeked = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {
          onSeeked,
          onRendererStateChange,
        },
        {},
        false,
        true
      )
      vimeoPlayer
        .instance()
        .player.trigger('seeked', { duration: 42, seconds: 12 })

      expect(onSeeked).to.have.been.called()
      expect(onRendererStateChangeSpy).to.have.been.calledWith({
        duration: 42,
        currentTime: 12,
      })
    })

    it('onTimeUpdate', () => {
      const onTimeUpdate = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {
          onTimeUpdate,
          onRendererStateChange,
        },
        {},
        false,
        true
      )
      vimeoPlayer
        .instance()
        .player.trigger('timeupdate', { duration: 42, seconds: 12 })

      expect(onTimeUpdate).to.have.been.called()
      expect(onRendererStateChangeSpy).to.have.been.calledWith({
        duration: 42,
        currentTime: 12,
      })
    })

    it('onProgress with buffered content', () => {
      const onProgress = sinon.stub()
      const setLoadingOverlay = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {
          onProgress,
          onRendererStateChange,
          setLoadingOverlay,
        },
        {},
        false,
        true
      )
      vimeoPlayer
        .instance()
        .player.trigger('progress', { duration: 42, seconds: 12 })

      expect(vimeoPlayer.instance().buffered).to.be.eq(12)
      expect(setLoadingOverlay).to.have.been.calledWith(false)
      expect(onProgress).to.have.been.called()
      expect(onRendererStateChangeSpy).to.have.been.calledWith({
        duration: 42,
        buffered: 12,
      })
    })

    it('onProgress with unbuffered content', () => {
      const onProgress = sinon.stub()
      const setLoadingOverlay = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {
          onProgress,
          onRendererStateChange,
          setLoadingOverlay,
        },
        {},
        false,
        true
      )
      vimeoPlayer
        .instance()
        .player.trigger('progress', { duration: 42, seconds: 12 })

      expect(vimeoPlayer.instance().buffered).to.be.eq(12)
      expect(setLoadingOverlay).to.have.been.calledWith(true)
      expect(onProgress).to.have.been.called()
      expect(onRendererStateChangeSpy).to.have.been.calledWith({
        duration: 42,
        buffered: 12,
      })
    })

    it('onRateChange', () => {
      const onRateChange = sinon.stub()

      const vimeoPlayer = renderWithMockVideo(
        {
          onRateChange,
          onRendererStateChange,
        },
        {},
        false,
        true
      )
      vimeoPlayer
        .instance()
        .player.trigger('playbackratechange', { playbackRate: 2 })

      expect(onRateChange).to.have.been.called()
      expect(onRendererStateChangeSpy).to.have.been.calledWith({
        playbackSpeed: 2,
      })
    })

    it('onVolumeChange', async () => {
      const onVolumeChange = sinon.stub()
      const vimeoPlayer = renderWithMockVideo(
        {
          onVolumeChange,
          onRendererStateChange,
        },
        { getMuted: () => false },
        false,
        true
      )
      await vimeoPlayer
        .instance()
        .player.trigger('volumechange', { volume: 0.42 })

      expect(onVolumeChange).to.have.been.called()
      expect(onRendererStateChangeSpy).to.have.been.calledWith({
        volume: 0.42,
        muted: false,
      })
    })

    it('onError', async () => {
      const onError = sinon.spy()
      const destroy = sinon.spy()
      const vimeoPlayer = renderWithMockVideo(
        { onError },
        { destroy },
        true,
        true
      )
      await vimeoPlayer.instance()
      expect(destroy).to.have.been.called()
      expect(onError).to.have.been.called()
    })
  })
})
