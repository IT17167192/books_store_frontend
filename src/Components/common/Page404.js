import React from 'react';
import * as URL from "../../config";
import * as Constants from "../../config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import {Link} from "react-router-dom";

const Page404 = (props) => {
    return (
      <div className="mt-5">
          <div className="row">
              <div className="col-12">
                  <main className="my-auto p-5" id="content">
                      <div className="text-center py-5">
                          <h1 className="display-1">404</h1>
                          <h2>File not found</h2>
                      </div>

                  </main>
              </div>
          </div>
      </div>
    );
};

export default Page404;
