import React, {useEffect, useState} from "react";
import {isAuthenticate} from "../../Authentication";
import {Redirect} from "react-router-dom";
import * as Constants from "../../config";
import CircularProgress from "@material-ui/core/CircularProgress";
import {addAdminUser} from "../../Service/admin/admin_service";
import swal from "sweetalert";

const AddAdmin = (props) => {

    const {token} = isAuthenticate();

    const [errorMessage, setErrorMessage] = useState("");

    const [loginDetails, setLoginDetails] = useState({
        name: "",
        role: 1,
        email: "",
        password: "",
        confPassword: "",
        error: false,
        loading: false,
        redirect: false
    });

    const {
        name,
        role,
        email,
        password,
        confPassword,
        error,
        loading,
        redirect
    } = loginDetails;

    const handleOnChange = (name) => (event) => {
        const value = event.target.value;
        setLoginDetails({...loginDetails, [name]: value});
    };

    const onClickSubmit = (event) => {
        event.preventDefault();
        setLoginDetails({...loginDetails, error: false, loading: true});
        setErrorMessage("");
        //check values empty?
        if(email === "" || password === "" || name === "" || confPassword === ""){
            setLoginDetails({...loginDetails, error: true, loading: false});
            setErrorMessage("Fields cannot be empty!");
        }else{
            // check password and confPassword match?
            if(password !== confPassword){
                setLoginDetails({...loginDetails, error: true, loading: false});
                setErrorMessage("Passwords should match!");
            }else{
                addAdminUser(token, {name: name, role: role, email: email, password: password})
                    .then(response => {
                        if(response.error){
                            //show error message
                            setLoginDetails({...loginDetails, error: true, loading: false});
                            if(Array.isArray(response.message)){
                                if(response.message[0].param === "email")
                                    setErrorMessage(response.message[0].msg);
                            }else{
                                setErrorMessage(response.message)
                            }
                        }else{
                            setLoginDetails({...loginDetails, name: '', role: 1, email: '', password: '', confPassword: '', error: false, loading: false});
                            swal("Successful!", "User added Successfully!", "success");
                        }
                    })
            }
        }
    }

    const showError = () => (
        <div className="alert alert-danger text-center mt-3" style={{display: error ? '' : 'none'}}>
            {errorMessage}
        </div>
    );

    return (
        <div className="text-center container mt-5">
            <div className="row">
                <div className="col-md-4 col-sm-12 col-lg-4">

                </div>
                <div className="col-md-4 col-sm-12 col-lg-4">
                    <div className="form-signin">
                        <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                             alt="" width="72" height="72" />

                        <h1 className="h3 mb-3 font-weight-normal">Add Admin</h1>

                        <label htmlFor="inputName" className="sr-only mt-5">Name</label>
                        <input type="text" id="inputName" className="form-control mt-5" placeholder="Enter Name"
                               value={name}
                               onChange={handleOnChange('name')}/>

                        <label htmlFor="inputEmail" className="sr-only mt-2">Email address</label>
                        <input type="email" id="inputEmail" className="form-control mt-2" placeholder="Enter Email address"
                               value={email}
                               onChange={handleOnChange('email')}/>

                        <label htmlFor="inputPassword" className="sr-only mt-2">Password</label>
                        <input type="password" id="inputPassword" className="form-control mt-2" placeholder="Enter Password"
                               value={password}
                               onChange={handleOnChange('password')}/>

                        <label htmlFor="inputConfPassword" className="sr-only mt-2">Confirm Password</label>
                        <input type="password" id="inputConfPassword" className="form-control mt-2" placeholder="Enter Confirm Password"
                               value={confPassword}
                               onChange={handleOnChange('confPassword')}/>

                        <button className="btn btn-lg btn-primary btn-block mt-5" onClick={onClickSubmit} disabled={loading}>
                            { loading ? <CircularProgress size={20}/> : 'Create a User' }
                        </button>
                        {showError()}
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 col-lg-4">

                </div>
            </div>
        </div>
    );
};

export default AddAdmin;
