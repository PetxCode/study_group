import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./router/mainRouter";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from "./global/store";
import persistStore from "redux-persist/es/persistStore";

let persistor = persistStore(store);
const App = () => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={mainRouter} />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default App;
