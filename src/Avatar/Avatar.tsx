import {
  Avatar as AvatarComponent,
  SkeletonProps,
  SxProps,
} from '@mui/material';

import Thumbnail from '../Thumbnail';

type BaseAvatarProps = {
  /**
   * Unique Id of the HTML element. Can be used for testing
   */
  id?: string;
  /**
   * Alternative text for the image
   */
  alt: string;
  /**
   * Whether the resource is loading
   */
  isLoading?: boolean;
  /**
   * Adapt styling with sx prop
   */
  sx?: SxProps;
};
type AvatarProps =
  | (BaseAvatarProps & {
      /**
       * component used to display the avatar (img or avatar)
       */
      component?: 'avatar';
      url?: string;
    })
  | (BaseAvatarProps & {
      component: 'img';
      /**
       * skeleton variant
       */
      variant?: SkeletonProps['variant'];
      maxHeight?: string | number;
      maxWidth?: string | number;
    });

const Avatar = (props: AvatarProps): JSX.Element | null => {
  const { id, sx, alt = 'avatar', isLoading } = props;
  switch (props.component) {
    case 'avatar': {
      const { url } = props;
      return <AvatarComponent id={id} alt={alt} src={url} sx={sx} />;
    }
    case 'img': {
      const { maxWidth, maxHeight, variant } = props;
      return (
        <Thumbnail
          sx={sx}
          alt={alt}
          id={id}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          variant={variant}
          isLoading={isLoading}
        />
      );
    }
    default:
      return null;
  }
};

export default Avatar;
