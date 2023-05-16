# Project Title

A brief description of what this project does and who it's for

## react-router-modal

**react-router-modal** is a React library that provides a modal and drawer management solution integrated with React Router. It allows you to easily control and manage modals and drawers in your application based on the defined routes.

### Features

- **Modal and Drawer Integration** : The library seamlessly integrates modals and drawers into your application using React Router. You can define routes for modals and drawers and control their visibility and behavior.
- **Route-Based Configuration** : Define routes for your modals and drawers using the familiar syntax of React Router. Specify the component to render and the corresponding props for each modal and drawer route.
- **Flexible Control** : With the provided `ModalsProvider` component, you can control the opening and closing of modals and drawers from anywhere in your application. The `useRouterModal` hook allows you to easily trigger the opening of modals by specifying the route path and optional parameters.
- **Support for Nested Modals and Drawers** : The library supports nesting modals and drawers, allowing you to create complex modal and drawer hierarchies in your application.

### Installation

You can install **react-router-modal** using npm or yarn:

```bash

npm install react-router-modal
```

or

```bash

yarn add react-router-modal
```

### Usage

To use **react-router-modal** , you need to wrap your application with the `ModalsProvider` component and provide it with an array of routes. Each route should define a path, the component to render as a modal or drawer, and the corresponding props for that component.

Here's a simple example:

```jsx
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ModalsProvider } from "react-router-modal";

// Import your modal and drawer components
import MyModalComponent from "./MyModalComponent";
import MyDrawerComponent from "./MyDrawerComponent";

const routes = [
  { path: "/modal", component: MyModalComponent },
  { path: "/drawer", component: MyDrawerComponent },
];

const App = () => {
  return (
    <BrowserRouter>
      <ModalsProvider routes={routes}>
        {/* Your application components */}
        <Route exact path="/" component={Home} />
        {/* ... */}
      </ModalsProvider>
    </BrowserRouter>
  );
};

export default App;
```

In the above example, we've defined two routes: one for a modal and one for a drawer. You can define additional routes as per your application's requirements.

To open a modal or drawer, you can use the `useRouterModal` hook, which provides a function `open` that accepts the route path and optional parameters. Here's an example:

```jsx
import React from "react";
import { useRouterModal } from "react-router-modal";

const MyComponent = () => {
  const { open } = useRouterModal();

  const handleButtonClick = () => {
    open("modal-path", {
      /* optional parameters */
    });
  };

  return (
    <div>
      {/* Your component content */}
      <button onClick={handleButtonClick}>Open Modal</button>
    </div>
  );
};
```

In the above example, when the button is clicked, the modal specified by the `modal-path` route will be opened with the provided optional parameters.

You can control the modals and drawers from anywhere in your application using the `useRouterModal` hook.

- Certainly! Here's an updated version of the `IModalsProvider` interface that includes the ability to pass provider modal and drawer instances with options:

```typescript
import { ReactNode, ComponentType, PropsWithChildren } from "react";

export interface IRouteMap {
  path: string;
  Component: ComponentType<any>;
  props?: IProps;
  routes?: IRouteMap[];
  type?: "modal" | "drawer";
  componentProps?: IProps;
}

export interface IModalsProvider {
  routes: IRouteMap[];
  children: ReactNode;
  modal?: IOptions<PropsWithChildren<any>>;
  drawer?: IOptions<PropsWithChildren<any>>;
}

export interface IOptions<T> {
  Component: ComponentType<T> | null;
  openKey?: string;
  closeKey?: string;
  props?: T;
}
```

The `IModalsProvider` interface includes `routes`, `children`, `modal`, and `drawer` properties.

The `routes` property represents an array of `IRouteMap` objects that define the routes for modals and drawers.

The `modal` and `drawer` properties are of type `IOptions<PropsWithChildren<any>>` and allow you to specify the provider modal and drawer instances with options. The `Component` property accepts a React component type or `null`, indicating the component to be used as the provider modal or drawer. The `openKey` and `closeKey` properties are optional and can be used to define custom keybindings for opening and closing the modal or drawer. The `props` property allows you to provide additional props to the component.

Feel free to modify the interfaces as needed based on your specific requirements and the components you want to use as provider modals and drawers from other UI frameworks.

### Contributing

Contributions to **react-router-modal** are welcome! If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request on the GitHub repository.

###
