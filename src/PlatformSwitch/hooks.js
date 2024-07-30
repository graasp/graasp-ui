/** Enumeration of available platforms */
export var Platform;
(function (Platform) {
  Platform['Builder'] = 'Builder';
  Platform['Player'] = 'Player';
  Platform['Library'] = 'Library';
  Platform['Analytics'] = 'Analytics';
})(Platform || (Platform = {}));
/**
 * Generates a default hosts mapper given a record of platform to hostname
 * Only the origin part of the given hostname will be used!
 *
 * The default mapping is:
 *  BUILDER_HOST/items/<itemId>
 *  PLAYER_HOST/<itemId>
 *  LIBRARY_HOST/<itemId>
 *  ANALYTICS_HOST/items/<itemId>
 *
 * For any advanced usage, create your own {@see HostsMapper}
 */
export function defaultHostsMapper(hostsUrls) {
  const urlBuilders = {
    [Platform.Builder]: (origin, itemId) => `${origin}/items/${itemId}`,
    [Platform.Player]: (origin, itemId) => `${origin}/${itemId}`,
    [Platform.Library]: (origin, _itemId) =>
      // for now redirect to library home
      // in the future we may want to redirect to itemId and
      // redirect to home only if it is not published from there
      `${origin}`,
    [Platform.Analytics]: (origin, itemId) => `${origin}/items/${itemId}`,
  };
  return Object.fromEntries(
    Object.entries(hostsUrls).map(([platform, url]) => {
      const origin = new URL(url).origin;
      return [
        platform,
        // if passed itemId is undefined, redirect to home page of platform
        (itemId) => (itemId ? urlBuilders[platform](origin, itemId) : origin),
      ];
    }),
  );
}
/**
 * Hook to create a platform navigator function
 * @param hostsMapper {@see HostsMapper}
 * @param itemId Optional ID of the item context which will be opened in the target platform
 * @returns A mouse events factory that will generate left and middle click actions, to be applied to a given platform
 */
export function usePlatformNavigation(hostsMapper, itemId) {
  return (platform) => {
    const url = hostsMapper[platform]?.(itemId);
    const href = url ?? '#';
    return {
      href,
    };
  };
}
