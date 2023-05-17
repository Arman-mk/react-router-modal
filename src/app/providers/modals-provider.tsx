import { FC, useEffect, useMemo, useState } from "react";
import { getActiveRoutes, routeMapping } from "../helpers";
import { ModalsStateProvider } from "./modals-state-provider";
import { IModalsProvider, IOptions, IProps, IRouteMap } from "../types";
import useRouterModal from "../use-router-modal";

const DEFAULT_OPTIONS: Omit<IOptions<unknown>, ""> = {
  openKey: "opened",
  closeKey: "onClose",
  props: {},
  Component: null,
};

const ModalsProvider: FC<IModalsProvider> = ({
  routes,
  modal = DEFAULT_OPTIONS,
  drawer = DEFAULT_OPTIONS,
  children,
}) => {
  const [activeRoutes, setActiveRoutes] = useState<IRouteMap[]>([]);
  const {
    Component,
    openKey = DEFAULT_OPTIONS.openKey,
    closeKey = DEFAULT_OPTIONS.closeKey,
    props: modalProps = {},
  } = modal;
  const {
    Component: DrawerComponent,
    openKey: drawerOpenKey = DEFAULT_OPTIONS.openKey,
    closeKey: drawerCloseKey = DEFAULT_OPTIONS.closeKey,
    props: drawerProps = {},
  } = drawer;

  const { activeRoute, stateProps, close } = useRouterModal(activeRoutes);

  const allMappedRoutes = useMemo(() => {
    return routeMapping(routes, "", {});
  }, [routes]);

  useEffect(() => {
    setActiveRoutes(getActiveRoutes(activeRoute as string, allMappedRoutes));
  }, [activeRoute, allMappedRoutes]);

  const renderer = useMemo(() => {
    const cloneActiveRoutes = [...activeRoutes];

    const routeMapper = (index: number) => {
      const currentRoute: IRouteMap = cloneActiveRoutes[index];
      if (!currentRoute) return null;

      const routeProps = currentRoute.props || {};
      const componentProps = currentRoute.componentProps || {};
      const isDrawer = currentRoute?.type === "drawer";
      const Wrapper = isDrawer ? DrawerComponent : Component;

      if (!Wrapper) {
        throw new Error(
          `${isDrawer ? "Drawer" : "Modal"} component is not defined`
        );
      }

      const wrapperProps = isDrawer
        ? {
            ...(drawerProps as IProps),
            [drawerOpenKey as string]: !!currentRoute,
            [drawerCloseKey as string]: close,
          }
        : {
            ...(modalProps as IProps),
            [openKey as string]: !!currentRoute,
            [closeKey as string]: close,
          };

      return (
        <ModalsStateProvider value={activeRoutes}>
          <Wrapper zIndex={200 + index} {...wrapperProps} {...routeProps}>
            <>
              <currentRoute.Component {...componentProps} {...stateProps} />
              {routeMapper(index + 1)}
            </>
          </Wrapper>
        </ModalsStateProvider>
      );
    };
    return routeMapper(0) as unknown as JSX.Element;
  }, [activeRoutes]);

  return (
    <>
      {useMemo(() => children, [])}
      {renderer}
    </>
  );
};

export default ModalsProvider;
