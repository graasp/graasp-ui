import React, { FC, useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { getItemImage } from '../utils/image';
import { EmbeddedLinkItemExtra, UnknownExtra } from '../types';

type ThumbnailProps = {
  id: string;
  extra: UnknownExtra;
  maxWidth?: string | number;
  maxHeight?: string | number;
  defaultImage?: string;
  variant?: string;
  alt: string;
  useThumbnail: Function;
  className?: string;
};

const Thumbnail: FC<ThumbnailProps> = ({
  id,
  extra,
  defaultImage,
  alt,
  useThumbnail,
  className,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = 'rect',
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

  const embeddedLinkExtra = extra as unknown as EmbeddedLinkItemExtra;
  const thumbnail = getItemImage({
    url: thumbnailUrl,
    extra: embeddedLinkExtra,
    defaultImage,
  });

  if (!thumbnail) {
    return null;
  }

  return (
    <img src={thumbnail} alt={alt} className={clsx(classes.img, className)} />
  );
};

export default Thumbnail;
