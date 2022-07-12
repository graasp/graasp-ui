import React, { useState, useEffect, FC } from 'react';
import clsx from 'clsx';
import { default as AvatarComponent } from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { getItemImage } from '../utils/image';
import { EmbeddedLinkItemExtra, Variant } from '../types';
import { DEFAULT_THUMBNAIL_SIZE } from '../constants';

type AvatarProps = {
  id: string;
  extra: object;
  maxWidth?: string | number;
  maxHeight?: string | number;
  defaultImage?: string;
  variant?: Variant;
  alt: string;
  component?: string;
  className?: string;
  useAvatar: (args: { id: string; size?: string }) => {
    data: Blob;
    isLoading: boolean;
    isFetching: boolean;
  };
  // todo: enforce size strings
  size?: string;
};

const Avatar: FC<AvatarProps> = ({
  id,
  extra,
  className,
  alt,
  // use a random string to trigger default avatar
  defaultImage = 'broken-image',
  useAvatar,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = Variant.RECT,
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

  if (!thumbnail) {
    return null;
  }

  if (component === 'avatar') {
    return <AvatarComponent alt={alt} src={thumbnail} className={className} />;
  }

  return (
    <img src={thumbnail} alt={alt} className={clsx(classes.img, className)} />
  );
};

export default React.memo(Avatar);
