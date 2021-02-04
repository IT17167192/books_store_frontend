import React, {useEffect, useState} from "react";
import * as Constants from '../../config';
import {Link} from "react-router-dom";
import {isAuthenticate, logout} from "../../Authentication";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons/faSignInAlt";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons/faUserPlus";
import {faTools} from "@fortawesome/free-solid-svg-icons/faTools";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import {faToolbox} from "@fortawesome/free-solid-svg-icons/faToolbox";
import {faUserLock} from "@fortawesome/free-solid-svg-icons/faUserLock";

const Header = ({history}) => {

    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return 'nav-item active';
        } else {
            return 'nav-item';
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to={Constants.ROUTES.landing_page}>
                <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                     alt="" width="30" height="30" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarScroll"
                    aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav mr-auto">
                    <li className={isActive(history, Constants.ROUTES.landing_page)}>
                        <Link className="nav-link" to={Constants.ROUTES.landing_page}>Home</Link>
                    </li>
                    <li className={isActive(history, Constants.ROUTES.store_page)}>
                        <Link className="nav-link" to={Constants.ROUTES.store_page}>Store</Link>
                    </li>
                </ul>
                <ul className="navbar-nav justify-content-end">
                    {isAuthenticate() && isAuthenticate().user.role === 1 && (
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button"
                               data-toggle="dropdown" aria-expanded="false">
                                Admin
                            </span>
                            <ul className="dropdown-menu mt-2" aria-labelledby="navbarScrollingDropdown">
                                <li>
                                    <Link to={Constants.ROUTES.add_book_page} className="dropdown-item">
                                        <FontAwesomeIcon size={"sm"} icon={faPlusSquare}/> {' '}  Add Book</Link>
                                </li>
                                <li>
                                    <Link to={Constants.ROUTES.manage_book_page} className="dropdown-item">
                                        <FontAwesomeIcon size={"sm"} icon={faTools}/> {' '}  Manage Books</Link>
                                </li>
                                <li>
                                    <Link to={Constants.ROUTES.manage_categories_page} className="dropdown-item">
                                        <FontAwesomeIcon size={"sm"} icon={faToolbox}/> {' '}  Manage Categories</Link>
                                </li>
                                <li>
                                    <Link to={Constants.ROUTES.add_admin_user_page} className="dropdown-item">
                                        <FontAwesomeIcon size={"sm"} icon={faUserLock}/> {' '}  Add Admin User</Link>
                                </li>
                            </ul>
                        </li>
                    )}
                    {isAuthenticate() && (
                        <li className="nav-item">
                            <span className="nav-link">{`Hi ${isAuthenticate().user.name}`}</span>
                        </li>
                    )}
                    {isAuthenticate() && (
                        <li className="nav-item">
                                <span className="nav-link" style={{cursor: 'pointer'}}
                                      onClick={() => logout(() => {
                                          history.push('/');
                                      })}> <FontAwesomeIcon size={"sm"} icon={faSignOutAlt}/> {' '} Logout</span>
                        </li>
                    )}
                    {!isAuthenticate() && (
                        <li className={isActive(history, Constants.ROUTES.login_page)}>
                            <Link className="nav-link" to={Constants.ROUTES.login_page}> <FontAwesomeIcon size={"sm"} icon={faSignInAlt}/> {' '} Login</Link>
                        </li>
                    )}

                    {!isAuthenticate() && (
                        <li className={isActive(history, Constants.ROUTES.create_account_page)}>
                            <Link className="nav-link" to={Constants.ROUTES.create_account_page}> <FontAwesomeIcon size={"sm"} icon={faUserPlus}/> {' '} Create an Account</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
