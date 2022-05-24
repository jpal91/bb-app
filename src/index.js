import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Redux DevTools
const store = createStore(
  reducers,
  composeEnchancers(applyMiddleware(reduxThunk))
); //Middleware/Thunk

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					<Route path='/login' element={<Login />} />
					<Route path='/getAuth' element={<GetAuth />} />
					<Route path='/app' element={<BBApp />} />
					<Route path='/confirm' element={<Confirm />} />
					<Route path='/done' element={<Done />} />
				</Route>
			</Routes>
		</BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
