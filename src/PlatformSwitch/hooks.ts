import { MouseEvent } from 'react';

import { redirect } from '@graasp/sdk';

const MOUSE_MIDDLE_BUTTON = 1;
const TARGET_BLANK_NEW_TAB = '_blank';

/** Enumeration of available platforms */
export enum Platform {
  Builder = 'Builder',
  Player = 'Player',
  Library = 'Library',
  Analytics = 'Analytics',
}

/** Maps each Platform to a URL generator function */
export type HostsMapper = Partial<
  Record<Platform, (itemId?: string) => string | undefined>
>;

/**
 * Generates a default hosts mapper given a record of platform to hostname
 * Only the origin part of the given hostname will be used!
 *
 * The default mapping is:
 *  BUILDER_HOST/items/<itemId>
 *  PLAYER_HOST/<itemId>
 *  LIBRARY_HOST/<itemId>
 *
 * For any advanced usage, create your own {@see HostsMapper}
 */
export function defaultHostsMapper(
  hostsUrls: Partial<Record<Platform, string>>,
): HostsMapper {
  const transformUrls = {
    [Platform.Builder]: (origin: string) => `${origin}/items`,
    [Platform.Library]: (origin: string) => `${origin}/collections`,
  };

  return Object.fromEntries(
    Object.entries(hostsUrls).map(([platform, url]) => {
      const origin = new URL(url).origin;
      const path = transformUrls[platform]?.(origin) ?? origin;
      return [
        platform,
        // if passed itemId is undefined, redirect to home page of platform
        (itemId: string) => (itemId ? `${path}/${itemId}` : origin),
      ];
    }),
  ) as HostsMapper;
}

/**
 * Hook to create a platform navigator function
 * @param hostsMapper {@see HostsMapper}
 * @param itemId Optional ID of the item context which will be opened in the target platform
 * @returns A mouse events factory that will generate left and middle click actions, to be applied to a given platform
 */
export function usePlatformNavigation(
  hostsMapper: HostsMapper,
  itemId?: string,
) {
  return (platform: Platform) => {
    const url = hostsMapper[platform]?.(itemId);
    const href = url ?? '#';
    return {
      onClick: (_event: MouseEvent) => redirect(href),
      onMouseDown: (event: MouseEvent) => {
        if (event.button !== MOUSE_MIDDLE_BUTTON || url === undefined) {
          return;
        }
        window.open(href, TARGET_BLANK_NEW_TAB);
      },
    };
  };
}
