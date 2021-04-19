import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route key="path" path={path} component={component} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
