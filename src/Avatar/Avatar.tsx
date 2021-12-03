import React, { useState, useEffect, FC } from 'react';
import clsx from 'clsx';
// eslint-disable-next-line import/no-named-default
import { default as AvatarComponent } from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { getItemImage } from '../utils/image';
import { EmbeddedLinkItemExtra } from '../types';
import { DEFAULT_THUMBNAIL_SIZE } from '../constants';

type AvatarProps = {
  id: string;
  extra: object;
  maxWidth?: string | number;
  maxHeight?: string | number;
  defaultImage?: string;
  variant?: string;
  alt: string;
  component?: string;
  className?: string;
  useAvatar: Function;
  // todo: enforce size strings
  size?: string;
};

const Avatar: FC<AvatarProps> = ({
  id,
  extra,
  className,
  alt,
  defaultImage,
  useAvatar,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = 'rect',
  component = 'img',
  size = DEFAULT_THUMBNAIL_SIZE,
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    undefined,
  );
  const {
    data: thumbnailBlob,
    isLoading,
    isFetching,
  } = useAvatar({
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
    if (thumbnailBlob) {
      const src = URL.createObjectURL(thumbnailBlob);
      setThumbnailUrl(src);
    }
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailBlob]);

  if (isLoading || isFetching) {
    return (
      <Skeleton
        variant={variant}
        width={maxWidth}
        height={maxHeight}
        className={className}
      />
    );
  }

  const embeddedLinkExtra = extra as unknown as EmbeddedLinkItemExtra;
  const thumbnail = getItemImage({
    url: thumbnailUrl,
    extra: embeddedLinkExtra,
    defaultImage,
  });

  if (component === 'avatar') {
    return <AvatarComponent alt={alt} src={thumbnail} className={className} />;
  }

  if (!thumbnail) {
    return null;
  }

  return (
    <img src={thumbnail} alt={alt} className={clsx(classes.img, className)} />
  );
};

export default Avatar;
