import React, { useEffect, createContext, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import axios from "../../../AxiosUser";

import AsideMenu from "../../../components/Admin/layouts/asideMenu/AsideMenu";
import Content from "../../../components/Admin/layouts/content/Content";
import HeaderMenu from "../../../components/Admin/layouts/headerMenu/HeaderMenu";
import Footer from "../../../components/Admin/layouts/footer/Footer";


// reducers
import SideMenuReducer from "../../../redux/admin/reducers/SideMenuReducers";
import SubMenuReducer from "../../../redux/admin/reducers/SubMenuReducer";
import LegalReducer from "../../../redux/admin/reducers/LegalReducer";
import AdminReducer from "../../../redux/admin/reducers/AdminReducer";
import RequestReducer from "../../../redux/admin/reducers/RequestReducer";
import { AppContext } from "../../../Context/MyContext";
import Home from "../../../Pages/OptionFund/Home/Home"; // Import the Home component



// reducers
const loggerMiddlaware = (store) => {
    return (next) => {
        return (action) => {
            console.log("MyLoggerMiddleware: Dispatching ==> ", action);
            console.log(
                "MyLoggerMiddleware: State BEFORE : ",
                store.getState()
            );
            const result = next(action);
            console.log("MyLoggerMiddleware: State AFTER : ", store.getState());
            return result;
        };
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    SideMenuReducer,
    SubMenuReducer,
    LegalReducer,
    AdminReducer,
    RequestReducer,
});

const middlewares = [loggerMiddlaware, thunk];

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
);

function App() {
    const [getMissionRowID, setMissionRowID] = useState("");
    const [getEeljRowID, setEeljRowID] = useState("");
    const [showFirstMenu, setShowFirstMenu] = useState(false);
    const [showSecondMenu, setShowSecondMenu] = useState(false);

    const handleFirstMenuClick = () => {
        setShowFirstMenu(true);
        setShowSecondMenu(false);
    };

    const handleSecondMenuClick = () => {
        setShowFirstMenu(false);
        setShowSecondMenu(true);
    };
    useEffect(() => {
        axios
            .get("/get/auth")
            .then((res) => {
                localStorage.setItem("admin", res.data.permission);
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("userType", res.data.user_type);
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    localStorage.clear();
                    window.location.href = "/login";
                }
            });
    }, []);

    useEffect(() => {
        const isPageReloaded = localStorage.getItem('isPageReloaded');
        if (!isPageReloaded) {
            localStorage.setItem('isPageReloaded', 'true');
            window.location.pathname = '/home';
        } else {
            localStorage.removeItem('isPageReloaded');
        }
    }, []);

    return (
        <div>
            <Provider Provider store={store}>
                <BrowserRouter>
                    <AppContext.Provider
                        value={{
                            getMissionRowID,
                            setMissionRowID,
                            getEeljRowID,
                            setEeljRowID,
                        }}
                    >
                        <AsideMenu
                            showFirstMenu={showFirstMenu}
                            showSecondMenu={showSecondMenu}
                        />
                        <HeaderMenu />
                        <Content
                            showFirstMenu={showFirstMenu}
                            showSecondMenu={showSecondMenu}
                            handleFirstMenuClick={handleFirstMenuClick}
                            handleSecondMenuClick={handleSecondMenuClick}
                        />

                        {/* <Home

                             /> */}
                        <Footer />
                    </AppContext.Provider>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;

if (document.getElementById("body-content")) {
    ReactDOM.render(<App />, document.getElementById("body-content"));
}
