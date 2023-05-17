import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { gerRouteParams } from "./helpers";
import { useModalsState } from "./use-modals-state";

import { useMemo } from "react";
import {
  ILocation,
  INavigateParams,
  IProps,
  IRouteMap,
  IuseRouterModal,
} from "./types";

const useRouterModal = (
  defaultActiveRouteState: IRouteMap[] | undefined = []
): IuseRouterModal => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation() as ILocation;
  let [searchParams] = useSearchParams();
  const activeRoutesState = useModalsState() || defaultActiveRouteState;
  const activeRoute = searchParams.get("modal");

  const routeParams = useMemo(() => {
    const route = activeRoutesState.at(-1);
    if (!activeRoute || !route?.fullPath) return {};
    return gerRouteParams(activeRoute, route.fullPath);
  }, [activeRoute, activeRoutesState]);

  return {
    activeRoute,
    stateProps: state?.props ?? {},
    params: routeParams,
    activeRoutes: activeRoutesState,
    open: (key: string, params: INavigateParams = {}) => {
      const additionalOptions: IProps = {};

      navigate(
        {
          pathname,
          search: `?${decodeURIComponent(
            createSearchParams({
              modal: key,
              ...additionalOptions,
            }) as unknown as string
          )}`,
        },
        {
          replace: params.replace,
          state: {
            props: params.props || {},
          },
        }
      );
    },
    close: () => {
      navigate(-1);
    },
  };
};
export default useRouterModal;
