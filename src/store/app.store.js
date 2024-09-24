import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { todoReducer } from "./todo/reducers";
import { authReducer } from "./auth/reducers";

const reduxPersistConfig = {
  key: "application",
  storage: storage,
};

export const rootReducer = combineReducers({
  todo: todoReducer,
  auth: authReducer,
});

const huyReducer = persistReducer(reduxPersistConfig, rootReducer);

export const store = createStore(huyReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
