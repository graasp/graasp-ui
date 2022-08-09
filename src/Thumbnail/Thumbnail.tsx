import React, { FC, useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { getItemImage } from '../utils/image';
import { Variant } from '../types';
import { DEFAULT_THUMBNAIL_SIZE } from '../constants';

type ThumbnailProps = {
  id: string;
  extraThumbnail: string;
  maxWidth?: string | number;
  maxHeight?: string | number;
  defaultValue?: JSX.Element;
  variant?: Variant;
  alt: string;
  useThumbnail: (args: { id: string; size: string }) => {
    data: Blob;
    isFetching: boolean;
    isLoading: boolean;
  };
  className?: string;
  // todo: enforce sizes strings
  size?: string;
};

const Thumbnail: FC<ThumbnailProps> = ({
  id,
  extraThumbnail,
  defaultValue,
  alt,
  useThumbnail,
  className,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = Variant.RECT,
  size = DEFAULT_THUMBNAIL_SIZE,
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    undefined,
  );
  const {
    data: thumbnailData,
    isLoading,
    isFetching,
  } = useThumbnail({
    id,
    size,
  });

  const classes = makeStyles({
    img: {
      maxWidth,
      maxHeight,
    },
  })();

  useEffect(() => {
    if (thumbnailData) {
      const src = URL.createObjectURL(thumbnailData);
      setThumbnailUrl(src);
    }

    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailData]);

  if (isLoading || isFetching) {
    return <Skeleton variant={variant} width={maxWidth} height={maxHeight} />;
  }

  const thumbnail = getItemImage({
    url: thumbnailUrl,
    extraThumbnail,
  });

  if (thumbnail) {
    return (
      <img src={thumbnail} alt={alt} className={clsx(classes.img, className)} />
    );
  } else if (defaultValue) {
    return defaultValue;
  } else {
    return null;
  }
};

export default Thumbnail;
