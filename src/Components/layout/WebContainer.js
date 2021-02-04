import React from "react";
import Header from "./Header";
import WebLayout from "./WebLayout";
import Footer from "./Footer";
const WebContainer = ({history}) => {
    return (
        <div>
            <Header history={history}/>
            <main role="main" className="container">
                <WebLayout history={history}/>
            </main>
        </div>
    );
}

export default WebContainer;

