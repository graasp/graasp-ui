import { SvgIcon } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const EtherpadIcon = ({ color: initialColor, sx }) => {
  const color = initialColor ?? 'currentcolor';
  return _jsxs(SvgIcon, {
    viewBox: '0 0 420 420',
    version: '1.1',
    id: 'svg148',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/2000/svg',
    sx: sx,
    children: [
      _jsxs('defs', {
        children: [
          _jsx('rect', {
            id: 'c',
            x: '42',
            y: '167',
            width: '168',
            height: '27',
            rx: '13.5',
          }),
          _jsxs('filter', {
            id: 'f',
            x: '-.0571',
            y: '-.356',
            width: '1.11',
            height: '2.01',
            children: [
              _jsx('feOffset', {
                dx: '0',
                dy: '8',
                in: 'SourceAlpha',
                result: 'shadowOffsetOuter1',
              }),
              _jsx('feGaussianBlur', {
                in: 'shadowOffsetOuter1',
                result: 'shadowBlurOuter1',
                stdDeviation: '4',
              }),
              _jsx('feColorMatrix', {
                in: 'shadowBlurOuter1',
                values:
                  '0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0568181818 0',
              }),
            ],
          }),
          _jsx('rect', {
            id: 'b',
            x: '41',
            y: '110',
            width: '142',
            height: '25',
            rx: '12.5',
          }),
          _jsxs('filter', {
            id: 'e',
            x: '-.0676',
            y: '-.384',
            width: '1.14',
            height: '2.09',
            children: [
              _jsx('feOffset', {
                dx: '0',
                dy: '8',
                in: 'SourceAlpha',
                result: 'shadowOffsetOuter1',
              }),
              _jsx('feGaussianBlur', {
                in: 'shadowOffsetOuter1',
                result: 'shadowBlurOuter1',
                stdDeviation: '4',
              }),
              _jsx('feColorMatrix', {
                in: 'shadowBlurOuter1',
                values:
                  '0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0568181818 0',
              }),
            ],
          }),
          _jsx('rect', {
            id: 'a',
            x: '41',
            y: '226',
            width: '105',
            height: '25',
            rx: '12.5',
          }),
          _jsxs('filter', {
            id: 'd',
            x: '-.0914',
            y: '-.384',
            width: '1.18',
            height: '2.09',
            children: [
              _jsx('feOffset', {
                dx: '0',
                dy: '8',
                in: 'SourceAlpha',
                result: 'shadowOffsetOuter1',
              }),
              _jsx('feGaussianBlur', {
                in: 'shadowOffsetOuter1',
                result: 'shadowBlurOuter1',
                stdDeviation: '4',
              }),
              _jsx('feColorMatrix', {
                in: 'shadowBlurOuter1',
                values:
                  '0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0568181818 0',
              }),
            ],
          }),
        ],
      }),
      _jsx('g', {
        transform: 'translate(40,25)',
        fill: 'none',
        fillRule: 'evenodd',
        children: _jsx('g', {
          transform: 'translate(-415,-351)',
          children: _jsx('g', {
            transform: 'translate(415,351)',
            children: _jsxs('g', {
              transform: 'translate(0,15)',
              children: [
                _jsx('rect', {
                  width: '340',
                  height: '340',
                  rx: '70',
                  fill: color,
                }),
                _jsx('path', {
                  d: 'm238 138c-2.89-2.88-7.56-2.88-10.4 0s-2.89 7.54 0 10.4c7.78 7.75 12.1 18 12.1 28.9s-4.28 21.2-12.1 28.9c-2.89 2.88-2.89 7.54 0 10.4 1.44 1.44 3.33 2.16 5.22 2.16s3.78-0.72 5.22-2.16c10.6-10.5 16.4-24.5 16.4-39.3s-5.82-28.8-16.4-39.3z',
                  fill: '#fff',
                  fillRule: 'nonzero',
                  opacity: '.754',
                }),
                _jsx('path', {
                  d: 'm267 113c-2.82-2.88-7.39-2.88-10.2 0-2.82 2.88-2.82 7.55 0 10.4 28.6 29.2 28.6 76.7 0 106-2.82 2.88-2.82 7.55 0 10.4 1.41 1.44 3.26 2.16 5.11 2.16s3.7-0.72 5.11-2.16c34.2-34.9 34.2-91.8 0-127z',
                  fill: '#fff',
                  fillRule: 'nonzero',
                  opacity: '.754',
                }),
                _jsx('use', {
                  width: '100%',
                  height: '100%',
                  fill: '#000000',
                  filter: 'url(#f)',
                  xlinkHref: '#c',
                }),
                _jsx('use', {
                  width: '100%',
                  height: '100%',
                  fill: '#ffffff',
                  fillRule: 'evenodd',
                  xlinkHref: '#c',
                }),
                _jsx('use', {
                  width: '100%',
                  height: '100%',
                  fill: '#000000',
                  filter: 'url(#e)',
                  xlinkHref: '#b',
                }),
                _jsx('use', {
                  width: '100%',
                  height: '100%',
                  fill: '#ffffff',
                  fillRule: 'evenodd',
                  xlinkHref: '#b',
                }),
                _jsx('use', {
                  width: '100%',
                  height: '100%',
                  fill: '#000000',
                  filter: 'url(#d)',
                  xlinkHref: '#a',
                }),
                _jsx('use', {
                  width: '100%',
                  height: '100%',
                  fill: '#ffffff',
                  fillRule: 'evenodd',
                  xlinkHref: '#a',
                }),
              ],
            }),
          }),
        }),
      }),
    ],
  });
};
export default EtherpadIcon;
