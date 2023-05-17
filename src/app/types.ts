import { ComponentType, PropsWithChildren } from "react";

export interface IModalsProvider {
  routes: IRouteMap[];
  children: React.ReactNode;
  modal?: IOptions<PropsWithChildren<any>>;
  drawer?: IOptions<PropsWithChildren<any>>;
}

export interface IOptions<T> {
  Component: ComponentType<PropsWithChildren<T> & { zIndex: number }> | null;
  openKey?: string;
  closeKey?: string;
  props?: T;
}

export interface IModalRoute {
  path: string;
  Component: ComponentType<any>;
  props?: IProps;
  routes?: IRouteMap[];
  type?: "modal" | "drawer";
  componentProps?: IProps;
}

export interface IRouteMap extends IModalRoute {
  fullPath?: string;
  parentRoute?: string;
}

export interface IRouteMapList {
  [key: string]: IRouteMap;
}

export interface IRouteParams {
  [key: string]: string;
}

export interface IProps {
  [key: string]: unknown;
}

export interface ILocation {
  pathname: string;
  state: {
    props: IProps;
  };
}

export interface INavigateParams {
  replace?: boolean | undefined;
  props?: IProps;
  wrapperProps?: IProps;
}

export interface IuseRouterModal {
  activeRoute: string | null;
  stateProps: IProps;
  params: IProps;
  activeRoutes: IRouteMap[];
  open: (key: string, params?: INavigateParams) => void;
  close: () => void;
}
