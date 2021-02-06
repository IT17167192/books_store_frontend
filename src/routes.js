import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import * as URL from './config';
import WebContainer from "./Components/layout/WebContainer";
import AdminRoute from "./Authentication/AdminRoute";

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path={URL.ROUTES.landing_page} exact component={WebContainer}/>
                <Route path={URL.ROUTES.store_page} exact component={WebContainer}/>
                <Route path={URL.ROUTES.login_page} exact component={WebContainer}/>
                <Route path={URL.ROUTES.create_account_page} exact component={WebContainer}/>
                <AdminRoute path={URL.ROUTES.add_book_page} exact component={WebContainer}/>
                <AdminRoute path={URL.ROUTES.manage_book_page} exact component={WebContainer}/>
                <AdminRoute path={URL.ROUTES.manage_categories_page} exact component={WebContainer}/>
                <AdminRoute path={URL.ROUTES.add_admin_user_page} exact component={WebContainer}/>
                <Route path="" exact component={WebContainer}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
