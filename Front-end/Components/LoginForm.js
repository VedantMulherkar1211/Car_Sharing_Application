import React, { useReducer } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
function BasicForm() {

    const navigate = useNavigate();

    const init = {
        pemail: { value: "", valid: false, touched: false, error: "" },
        passw: { value: "", valid: false, touched: false, error: "" },
        formValid: false
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                //object destructuring
                const { key, value, touched, valid, error, formValid } = action.data;
                return { ...state, [key]: { value, touched, valid, error }, formValid }
            case 'reset':
                return init;
            default:


        }
    }

    const [puser, dispatch] = useReducer(reducer, init)


    const validateData = (key, val) => {
        let valid = true;
        let error = ""
        switch (key) {
            case 'pemail':
                var pattern1 = /^[\w._#-]{4,20}@[\w-]{5,15}\.[a-z]{2,3}$/
                if (!pattern1.test(val)) {
                    valid = false;
                    error = "invalid email id"
                }
                break;

            case 'passw':
                var pattern2 = /[\w\d@]{3,20}$/
                if (!pattern2.test(val)) {
                    valid = false;
                    error = "invalid password"
                }
                break;
            default:


        }
        return { valid: valid, error: error }
    }


    const handleChange = (key, value) => {
        //1. call validateData function
        const { valid, error } = validateData(key, value);

        //2. check the validity status of the form
        let formValid = true;
        for (let k in puser) {
            //console.log(emp[k].valid)
            if (puser[k].valid === false) {
                formValid = false;
                break;
            }
        }
        console.log(formValid);

        //3. call to dispatch - updating the state
        dispatch({ type: "update", data: { key, value, touched: true, valid, error, formValid } })
    }

    const submitData = (e) => {
        e.preventDefault();
        //server side API
    }


    const InsertData = (e) => {

        e.preventDefault();
        const reOption = {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                pemail: puser.pemail.value,
                passw: puser.passw.value

            })
        }
        fetch("http://localhost:9000/insertLogin", reOption)
            .then(resp => resp.text())
            .then(data => {
                // Handle the response from the server
                console.log(data);
                if (data === 'Login successful') {
                    // Redirect or perform other actions for successful login
                    alert('Login successful');
                    navigate('/home')
                } else {
                    // Handle unsuccessful login
                    alert('Invalid email or password');
                }
            })

    }


    return (

        <div style={{ color: 'blue' }} className="container-sm mt-4 bg-light p-4 rounded d-flex flex-column align-items-center bodyWithBackground">


            <div >
                <h1>Car Pooling</h1>
            </div>
            <form className="w-100">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" placeholder='enter mail' className="form-control" id="email" name="pemail" autoComplete="off"
                        value={puser.pemail.value}
                        onChange={(e) => { handleChange("pemail", e.target.value) }}
                        onBlur={(e) => { handleChange("pemail", e.target.value) }}
                    />

                    <br />

                    <div style={{ display: puser.pemail.touched && !puser.pemail.valid ? "block" : "none", color: 'red' }}>
                        {puser.pemail.error}
                    </div>

                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" placeholder='enter password' className="form-control" id="password" name="passw" autoComplete="off"
                        value={puser.passw.value}
                        onChange={(e) => { handleChange("passw", e.target.value) }}
                        onBlur={(e) => { handleChange("passw", e.target.value) }}
                    />

                    <br />

                    <div style={{ display: puser.passw.touched && !puser.passw.valid ? "block" : "none", color: 'red' }}>
                        {puser.passw.error}
                    </div>

                </div>


                <button type="submit" className="btn btn-primary w-100" disabled={!puser.formValid} onClick={(e) => { InsertData(e) }}>LoginForm </button>


            </form>
            <div className="mt-3">
                <p className="mb-0">New User? <Link to="/registration">Register now</Link></p>
                <p className="mb-0"><Link to="/forgotPassword">Forgot Password</Link></p>


            </div>
        </div>
    );
}

export default BasicForm;
