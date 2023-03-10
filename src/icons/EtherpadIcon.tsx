import { SvgIcon, SxProps, Theme } from '@mui/material';

import React from 'react';

type Props = {
  style?: { color?: string };
  sx?: SxProps<Theme>;
};

const EtherpadIcon = ({ style, sx }: Props): JSX.Element => {
  const color = style?.color ?? 'rgba(0, 0, 0, 0.87)';

  return (
    <SvgIcon
      viewBox='0 0 340 340'
      version='1.1'
      id='svg148'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      xmlns='http://www.w3.org/2000/svg'
      sx={sx}
    >
      <defs>
        <rect id='path-2' x='42' y='167' width='168' height='27' rx='13.5' />
        <filter
          id='filter-3'
          x='-.057143'
          y='-.35556'
          width='1.1143'
          height='2.0074'
        >
          <feOffset
            dx='0'
            dy='8'
            in='SourceAlpha'
            result='shadowOffsetOuter1'
          />
          <feGaussianBlur
            in='shadowOffsetOuter1'
            result='shadowBlurOuter1'
            stdDeviation='4'
          />
          <feColorMatrix
            in='shadowBlurOuter1'
            values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0568181818 0'
          />
        </filter>
        <rect id='path-4' x='41' y='110' width='142' height='25' rx='12.5' />
        <filter
          id='filter-5'
          x='-.067606'
          y='-.384'
          width='1.1352'
          height='2.088'
        >
          <feOffset
            dx='0'
            dy='8'
            in='SourceAlpha'
            result='shadowOffsetOuter1'
          />
          <feGaussianBlur
            in='shadowOffsetOuter1'
            result='shadowBlurOuter1'
            stdDeviation='4'
          />
          <feColorMatrix
            in='shadowBlurOuter1'
            values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0568181818 0'
          />
        </filter>
        <rect id='path-6' x='41' y='226' width='105' height='25' rx='12.5' />
        <filter
          id='filter-7'
          x='-.091429'
          y='-.384'
          width='1.1829'
          height='2.088'
        >
          <feOffset
            dx='0'
            dy='8'
            in='SourceAlpha'
            result='shadowOffsetOuter1'
          />
          <feGaussianBlur
            in='shadowOffsetOuter1'
            result='shadowBlurOuter1'
            stdDeviation='4'
          />
          <feColorMatrix
            in='shadowBlurOuter1'
            values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0568181818 0'
          />
        </filter>
      </defs>
      <g transform='translate(0,-15)' fill='none' fill-rule='evenodd'>
        <g transform='translate(-415,-351)'>
          <g transform='translate(415,351)'>
            <g transform='translate(0,15)'>
              <rect width='340' height='340' rx='70' fill={color} />
              <path
                d='m237.61 138.16c-2.8864-2.8757-7.561-2.878-10.447 0s-2.8864 7.5412 0 10.419c7.7751 7.7524 12.058 18.025 12.058 28.923s-4.2828 21.17-12.058 28.925c-2.8864 2.8757-2.8864 7.5412 0 10.417 1.4434 1.4388 3.3324 2.1584 5.2237 2.1584 1.889 0 3.7802-0.71962 5.2237-2.1584 10.568-10.537 16.388-24.507 16.388-39.342 0-14.834-5.8199-28.805-16.388-39.342z'
                fill='#000'
                fill-opacity='.20048'
                fill-rule='nonzero'
                opacity='.75406'
              />
              <path
                d='m267.33 113.16c-2.8225-2.8782-7.3936-2.8782-10.216 0-2.8225 2.8805-2.8225 7.5504 0 10.428 28.587 29.176 28.587 76.651 0 105.83-2.8225 2.8782-2.8225 7.5477 0 10.426 1.4115 1.4405 3.2587 2.1603 5.1081 2.1603s3.6966-0.72024 5.1081-2.163c34.223-34.924 34.223-91.753 0-126.68z'
                fill='#131514'
                fill-opacity='.25056'
                fill-rule='nonzero'
                opacity='.75406'
              />
              <use fill='#000000' filter='url(#filter-3)' xlinkHref='#path-2' />
              <use fill='#ffffff' fill-rule='evenodd' xlinkHref='#path-2' />
              <use fill='#000000' filter='url(#filter-5)' xlinkHref='#path-4' />
              <use fill='#ffffff' fill-rule='evenodd' xlinkHref='#path-4' />
              <use fill='#000000' filter='url(#filter-7)' xlinkHref='#path-6' />
              <use fill='#ffffff' fill-rule='evenodd' xlinkHref='#path-6' />
            </g>
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};
export default EtherpadIcon;
