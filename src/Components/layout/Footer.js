import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as Constants from "../../config";

const Footer = (props) => {

    return (
        <footer className="footer text-center mt-auto mb-3 align-bottom">
            <span className="text-muted">{'Copyright © '}{new Date().getFullYear()} <Link style={{textDecoration: 'none'}} to={Constants.ROUTES.landing_page}>Book Store</Link>, All rights reserved  </span>
        </footer>
    );
};

export default Footer;
