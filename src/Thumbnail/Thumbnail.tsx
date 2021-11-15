import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { getItemImage } from '../utils/image';

type ThumbnailProps = {
  id: string;
  extra: object;
  maxWidth?: string | number;
  maxHeight?: string | number;
  useDefault?: boolean;
  variant?: string;
  alt: string;
  useAvatar: Function;
  useItemThumbnail: Function;
};

const Thumbnail: FC<ThumbnailProps> = ({
  id,
  extra,
  maxWidth = '100%',
  maxHeight = '100%',
  useDefault = true,
  variant = 'rect',
  alt,
  useItemThumbnail,
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    undefined,
  );
  const {
    data: thumbnailData,
    isLoading,
    isFetching,
  } = useItemThumbnail({
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

  const thumbnail = getItemImage({
    url: thumbnailUrl,
    extra,
    useDefault,
  });

  if (!thumbnail) {
    return null;
  }

  return <img src={thumbnail} alt={alt} className={classes.img} />;
};

export default Thumbnail;
