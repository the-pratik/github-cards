import React, { Component } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import App from "../App";
import Profile from "../Profile";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";

export class Routes extends Component {
  router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <App title="GitHub Profile Finder" />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
  ]);

  render() {
    return <RouterProvider router={this.router} />;
  }
}

export default Routes;
