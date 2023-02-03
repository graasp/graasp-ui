import { redirect } from '@graasp/sdk';

/** Enumeration of available platforms */
export enum Platform {
  Builder = 'Builder',
  Player = 'Player',
  Library = 'Library',
  Analytics = 'Analytics',
}

/** Maps each Platform to a URL generator function */
export type HostsMapper = Record<Platform, (itemId: string) => string>;

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
  hostsUrls: Omit<Record<Platform, string>, 'Analytics'>,
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
export function usePlatformNavigation(hostsMapper: HostsMapper) {
  return (platform: Platform) => {
    // detect current item given url /[optionalPrefixA/optionalPrefixB/.../]<itemId>[...anything]
    // todo: use proper top-level item context?
    const itemRegex =
      /^\/(?:\w+\/)*([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}).*/;
    const match = window.location.pathname.match(itemRegex);
    const itemId = match?.[1] ?? '';
    const url = hostsMapper[platform](itemId);
    redirect(url);
  };
}
