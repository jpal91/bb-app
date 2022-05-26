import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./App";
import BBApp from "./components/BBApp";
import GetAuth from "./components/GetAuth";
import Login from "./components/Login";

import reducers from './reducers'
import Confirm from "./components/Confirm";
import Done from "./components/Done";
import { MaterialUIControllerProvider } from "context";

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Redux DevTools
const store = createStore(
  reducers,
  composeEnchancers(applyMiddleware(reduxThunk))
); //Middleware/Thunk

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
		<MaterialUIControllerProvider>
			<App />
		</MaterialUIControllerProvider>
    </Provider>
);

/*
				<Routes>
					<Route path='/' element={<App />}>
						<Route path='/login' element={<Login />} />
						<Route path='/getAuth' element={<GetAuth />} />
						<Route path='/app' element={<BBApp />} />
						<Route path='/confirm' element={<Confirm />} />
						<Route path='/done' element={<Done />} />
					</Route>
				</Routes>
*/


