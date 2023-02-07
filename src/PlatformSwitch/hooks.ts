import { redirect } from '@graasp/sdk';

/** Enumeration of available platforms */
export enum Platform {
  Builder = 'Builder',
  Player = 'Player',
  Library = 'Library',
  Analytics = 'Analytics',
}

/** Maps each Platform to a URL generator function */
export type HostsMapper = Partial<Record<Platform, (itemId: string) => string>>;

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
  return Object.fromEntries(
    Object.entries(hostsUrls).map(([platform, url]) => {
      const origin = new URL(url).origin;
      // in Builder platform, should appear under /items
      const prefixIfBuilder = platform === Platform.Builder ? 'items/' : '';
      return [
        platform,
        (itemId: string) => `${origin}/${prefixIfBuilder}${itemId}`,
      ];
    }),
  ) as HostsMapper;
}

/**
 * Hook to create a platform navigator function
 * @param hostsMapper {@see HostsMapper}
 * @returns A navigation function to be applied on a given itemId
 */
export function usePlatformNavigation(
  hostsMapper: HostsMapper,
  itemId: string,
) {
  return (platform: Platform) => {
    const url = hostsMapper[platform]?.(itemId) ?? '#';
    redirect(url);
  };
}
