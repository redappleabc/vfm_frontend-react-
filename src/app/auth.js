import axios from "axios";
import { store } from "../store";
import { logOut } from "../store/slices/userSlice";
import { NotificationManager } from "react-notifications";

const checkAuth = () => {
    /*  Getting token value stored in localstorage, if token is not present we will open login page 
        for all internal dashboard routes  */
    const TOKEN = localStorage.getItem("token");
    const PUBLIC_ROUTES = [
        "login",
        "forgot-password",
        "register",
    ];

    const isPublicPage = PUBLIC_ROUTES.some((r) =>
        window.location.href.includes(r)
    );

    axios.interceptors.request.use(
        function (config) {
            return config;
        },
        function (error) {
            NotificationManager.error(error, 'Error')
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            if (error.response?.status === 401) {
                store.dispatch(logOut());
            }
            return Promise.reject(error);
        }
    );

    if (!TOKEN && !isPublicPage) {
        return;
    } else {
        axios.defaults.headers.common["Authorization"] = `${TOKEN}`;
        return TOKEN;
    }
};

export default checkAuth;