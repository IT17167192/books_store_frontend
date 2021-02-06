import React from "react";
import Home from "../website/Home";
import * as Constants from '../../config';
import Login from "../website/Login";
import SignUp from "../website/SignUp";
import Store from "../website/Store";
import AddBook from "../admin/AddBook";
import ManageBooks from "../admin/ManageBooks";
import ManageCategories from "../admin/ManageCategories";
import AddAdmin from "../admin/AddAdmin";
import Page404 from "../common/Page404";

const appendView = (history) => {
    if (history.location.pathname === Constants.ROUTES.landing_page) {
        return (
            <Home pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.login_page) {
        return (
            <Login pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.create_account_page) {
        return (
            <SignUp pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.store_page) {
        return (
            <Store pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.add_book_page) {
        return (
            <AddBook pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.manage_book_page) {
        return (
            <ManageBooks pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.manage_categories_page) {
        return (
            <ManageCategories pathname={history.location.pathname}/>
        );
    }else if (history.location.pathname === Constants.ROUTES.add_admin_user_page) {
        return (
            <AddAdmin pathname={history.location.pathname}/>
        );
    }else{
        return (
            <Page404 pathname={history.location.pathname} />
        );
    }
};

const WebLayout = (props) => {
    return (
        appendView(props.history)
    );
};

export default WebLayout;

