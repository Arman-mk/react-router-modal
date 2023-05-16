import { IRouteMap, IRouteMapList, IRouteParams } from "./types";

/**
 *
 * @param activeRoute
 * @param allMappedRoutes
 * @returns
 */
export const getActiveRoutes = (
  activeRoute: string,
  allMappedRoutes: IRouteMapList
): IRouteMap[] => {
  const stack: IRouteMap[] = [];
  let isMatched = activeRoute && !!allMappedRoutes?.[activeRoute];

  if (!isMatched) {
    isMatched = !!(activeRoute = getMatchedRoute(activeRoute, allMappedRoutes));
  }

  if (isMatched && activeRoute) {
    stack.push(allMappedRoutes[activeRoute]);
    let parentRoute = allMappedRoutes[activeRoute]?.parentRoute;
    while (parentRoute) {
      stack.unshift(allMappedRoutes[parentRoute]);
      parentRoute = allMappedRoutes[parentRoute]?.parentRoute;
    }
  }
  return stack;
};

/**
 *
 * @param routes
 * @param parentRoute
 * @param map
 * @returns
 */
export const routeMapping = (
  routes: IRouteMap[] | undefined,
  parentRoute: string,
  map: IRouteMapList
): IRouteMapList => {
  if (routes?.length) {
    routes.forEach((route) => {
      const fullRouteKey = parentRoute
        ? `${parentRoute}/${route.path}`
        : route.path;
      map[fullRouteKey] = {
        ...route,
        parentRoute,
        fullPath: fullRouteKey,
      };
      routeMapping(route.routes, fullRouteKey, map);
    });
  }

  return map;
};

/**
 *
 * @param url
 * @param route
 * @returns
 */
export const routeMatcher = (url: string, route: string) => {
  const routeMatcher = new RegExp(route.replace(/:[^\s/]+/g, "([\\w-]+)"));
  return url.match(routeMatcher);
};

/**
 *
 * @param url
 * @param route
 * @returns IRouteParams
 */
export const gerRouteParams = (url: string, route: string): IRouteParams => {
  const map: IRouteParams = {};
  if (!url || !route) return map;

  const splittedUrl = url.split("/");
  const splittedRoute = route.split("/");

  splittedRoute.forEach((key, index) => {
    if (key[0] === ":" && splittedUrl[index] !== undefined) {
      map[key.slice(1)] = splittedUrl[index];
    }
  });

  return map;
};

/**
 *
 * @param activeRoute
 * @param allMappedRoutes
 * @returns
 */
export const getMatchedRoute = (
  activeRoute: string,
  allMappedRoutes: any
): string => {
  const splittedActiveRouteLength = activeRoute?.split("/").length;

  for (const routePath in allMappedRoutes) {
    if (routePath.split("/").length === splittedActiveRouteLength) {
      return routePath;
    }
  }
  return "";
};
