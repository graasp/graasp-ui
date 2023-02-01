import { Pagination, PaginationItem } from '@mui/material';

import React, { FC } from 'react';

import { LibraryIcon, PlayIcon } from '../icons';
import BuildIcon from '../icons/BuildIcon';

export type PlatformSwitchProps = {};

const defaultIconsProps = {
  size: 21,
};

export const Platforms = {
  Builder: {
    icon: <BuildIcon {...defaultIconsProps} />,
  },
  Player: {
    icon: <PlayIcon {...defaultIconsProps} />,
  },
  Library: {
    icon: <LibraryIcon {...defaultIconsProps} />,
  },
} as const;

/**
 * A hacky helper to always obtain each Platform props in the same order
 */
class PlatformPropsIterator {
  static readonly platforms = Object.values(Platforms);
  /** store state in-between next() invocations*/
  private counter = 0;

  public next(): typeof Platforms[keyof typeof Platforms] {
    const props = PlatformPropsIterator.platforms[this.counter];
    this.counter += 1;
    return props;
  }
}

export const PlatformSwitch: FC<PlatformSwitchProps> = () => {
  const iconsIterator = new PlatformPropsIterator();
  return (
    <Pagination
      count={PlatformPropsIterator.platforms.length}
      hideNextButton
      hidePrevButton
      renderItem={(item) => (
        <PaginationItem {...item} page={iconsIterator.next().icon} />
      )}
    />
  );
};

export default PlatformSwitch;
