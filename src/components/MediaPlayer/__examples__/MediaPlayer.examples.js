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

import en1SRT from './static/en1.srt'
import en1VTT from './static/en1.vtt'
import en2VTT from './static/en2.vtt'
import { MediaPlayer } from '../index'
import { IconAlertsLine, IconHamburgerLine } from '@instructure/ui-icons'

function getSource(type) {
  switch (type) {
    case 'video':
      return [
        {
          src: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
          label: '1080p',
          defaultSelected: false,
        },
        {
          src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          label: '360p',
          defaultSelected: true,
        },
      ]
    case 'youtube':
      return [
        {
          src: 'https://www.youtube.com/watch?v=lyRPyRKHO8M',
          label: 'youtube',
          defaultSelected: false,
        },
      ]
    case 'vimeo':
      return [
        {
          src: 'https://vimeo.com/189789787',
          label: 'vimeo',
          defaultSelected: false,
        },
      ]
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
      onVolumeChange: () => {},
    }
  }

  return {}
}

export default {
  propValues: {},
  getComponentProps: (props) => {
    return {
      tracks:
        props.type === 'video'
          ? [
              {
                id: 'en1SRT',
                src: en1SRT,
                label: 'en1SRT',
                type: 'subtitles',
                language: 'en',
              },
              {
                id: 'en1VTT',
                src: en1VTT,
                label: 'en1VTT',
                type: 'subtitles',
                language: 'en',
              },
              {
                id: 'en2VTT',
                src: en2VTT,
                label: 'en2VTT',
                type: 'subtitles',
                language: 'en',
              },
            ]
          : [],
      sources: getSource(props.type),
      // eslint-disable-next-line react/display-name
      customControls: () => [
        <MediaPlayer.Control
          variant="button"
          key="SampleButtonCustomControl"
          tooltipLabel="Sample Button Custom Control"
          onClick={() => alert('custom control clicked')}
          icon={<IconAlertsLine size="x-small" />}
        />,
        <MediaPlayer.Control
          variant="menu"
          key="SampleMenuCustomControl"
          tooltipLabel="Sample Menu Custom Control"
          icon={<IconHamburgerLine size="x-small" />}
          menuItems={() => (
            <MediaPlayer.Menu.Group
              label="Item List Group"
              onSelect={(e, value) => alert(`${value} selected`)}
              selectedValue="Item 1"
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <MediaPlayer.Menu.Item
                  key={item.toString()}
                  value={`Item ${item}`}
                >
                  {`Item ${item}`}
                </MediaPlayer.Menu.Item>
              ))}
            </MediaPlayer.Menu.Group>
          )}
        >
          Menu
        </MediaPlayer.Control>,
      ],
      ...getVimeoProps(props.type),
    }
  },
}
