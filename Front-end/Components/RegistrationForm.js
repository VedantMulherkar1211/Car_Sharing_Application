import React, { useState, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const DatePicker = ({ selectedDate, onSelect }) => {
    const handleChange = (event) => {
        onSelect(event.target.value);
    };

    return <input type="date" value={selectedDate} onChange={handleChange} />;
};

function RegistrationForm() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const init = {
        pemail: { value: '', valid: false, touched: false, error: '' },
        passw: { value: '', valid: false, touched: false, error: '' },
        pname: { value: '', valid: false, touched: false, error: '' },
        puname: { value: '', valid: false, touched: false, error: '' },
        phno: { value: '', valid: false, touched: false, error: '' },
        gender: { value: '', valid: false, touched: false, error: 'Please select a gender' },
        paddress: { value: '', valid: false, touched: false, error: '' },
        formValid: false,
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                // object destructuring
                const { key, value, touched, valid, error, formValid } = action.data;
                return { ...state, [key]: { value, touched, valid, error }, formValid };
            case 'reset':
                return init;
            default:
                return state;
        }
    };

    const [puser, dispatch] = useReducer(reducer, init);

    const validateData = (key, val) => {
        let valid = true;
        let error = '';
        switch (key) {
            case 'pemail':
                var pattern1 = /^[\w._#-]{4,20}@[\w-]{5,15}\.[a-z]{2,3}$/;
                if (!pattern1.test(val)) {
                    valid = false;
                    error = 'invalid email id';
                }
                break;

            case 'passw':
                var pattern2 = /[\w\d@]{3,20}$/;
                if (!pattern2.test(val)) {
                    valid = false;
                    error = 'enter long password';
                }
                break;

            case 'pname':
                var pattern3 = /^[A-Za-z\s]{2,30}$/;
                if (!pattern3.test(val)) {
                    valid = false;
                    error = 'enter your full name and only letters allow';
                }
                break;

            case 'puname':
                var pattern4 = /^[A-Za-z0-9_@]{3,20}$/;
                if (!pattern4.test(val)) {
                    valid = false;
                    error = 'only letters numbers @ and _ allow';
                }
                break;

            case 'phno':
                var pattern5 = /^\d{10}$/;
                if (!pattern5.test(val)) {
                    valid = false;
                    error = 'required 10 digit number';
                }
                break;
            case 'gender':
                valid = val !== '';
                error = valid ? '' : 'Please select a gender';
                break;
            case 'paddress':
                var pattern6 = /^[\s,A-Za-z0-9_@]{3,60}$/;
                if (!pattern6.test(val)) {
                    valid = false;
                    error = 'Please enter address';
                }
                break;

            default:
        }
        return { valid: valid, error: error };
    };

    const handleChange = (key, value) => {
        // 1. call validateData function
        const { valid, error } =
            key === 'selectedDate' ? validateData(key, selectedDate) : validateData(key, value);

        // 2. check the validity status of the form
        let formValid = true;
        for (let k in puser) {
            // console.log(emp[k].valid)
            if (puser[k].valid === false) {
                formValid = false;
                break;
            }
        }
        console.log(formValid);

        // 3. call to dispatch - updating the state
        dispatch({ type: 'update', data: { key, value, touched: true, valid, error, formValid } });
    };

    const submitData = (e) => {
        e.preventDefault();
        // server side API
    };

    const InsertData = (e) => {
        e.preventDefault();
        const reOption = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                pemail: puser.pemail.value,
                passw: puser.passw.value,
                pusername: puser.puname.value,
                pname: puser.pname.value,
                ppassword: puser.passw.value,
                pemail: puser.pemail.value,
                pdateOfBirth: selectedDate,
                pgender: puser.gender.value,
                pphoneNumber: puser.phno.value,
                paddress: puser.paddress.value,
            }),
        };
        fetch('http://localhost:9000/passenger', reOption)
            .then((resp) => resp.text())
            .then((data) => {
                // Handle the response from the server
                console.log(data);
                if (data === 'Passenger inserted successfully') {
                    // Redirect or perform other actions for successful login
                    alert('Registration successful');
                    navigate('/login');
                } else {
                    // Handle unsuccessful login
                    alert('Registration unsuccessful');
                }
            });
    };

    return (
        <div
            style={{
                color: 'blue',
                backgroundImage: `url('7178884.jpg')`, // Replace with the actual path to your background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
            className="container mt-4 p-4 rounded d-flex flex-column align-items-center"
        >
            <div className="text-light p-4 rounded">
                <h1>Car Pooling Registration</h1>
            </div>

            <form className="w-100">
                {/* enter full name information */}
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter full name"
                        className="form-control form-control-sm"
                        id="fullName"
                        autoComplete="off"
                        name="pname"
                        value={puser.pname.value}
                        onChange={(e) => {
                            handleChange('pname', e.target.value);
                        }}
                        onBlur={(e) => {
                            handleChange('pname', e.target.value);
                        }}
                    />
                    <br />
                    <div
                        style={{ display: puser.pname.touched && !puser.pname.valid ? 'block' : 'none', color: 'red' }}
                    >
                        {puser.pname.error}
                    </div>
                </div>

                {/* enter user name information */}
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                        User Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter user name"
                        className="form-control form-control-sm"
                        id="userName"
                        autoComplete="off"
                        name="puname"
                        value={puser.puname.value}
                        onChange={(e) => {
                            handleChange('puname', e.target.value);
                        }}
                        onBlur={(e) => {
                            handleChange('puname', e.target.value);
                        }}
                    />
                    <div
                        style={{ display: puser.puname.touched && !puser.puname.valid ? 'block' : 'none', color: 'red' }}
                    >
                        {puser.puname.error}
                    </div>
                </div>

                {/* enter phone number information */}
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone
                    </label>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        className="form-control form-control-sm"
                        id="phone"
                        autoComplete="off"
                        name="phno"
                        value={puser.phno.value}
                        onChange={(e) => {
                            handleChange('phno', e.target.value);
                        }}
                        onBlur={(e) => {
                            handleChange('phno', e.target.value);
                        }}
                    />
                    <div
                        style={{ display: puser.phno.touched && !puser.phno.valid ? 'block' : 'none', color: 'red' }}
                    >
                        {puser.phno.error}
                    </div>
                </div>

                <div className="mb-3 d-flex justify-content-center align-items-center flex-column">
                    <label className="form-label mb-2">Gender</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                className="form-check-input"
                                name="gender"
                                value="m"
                                checked={puser.gender.value === 'm'}
                                onChange={(e) => handleChange('gender', e.target.value)}
                            />
                            Male
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                className="form-check-input"
                                name="gender"
                                value="f"
                                checked={puser.gender.value === 'f'}
                                onChange={(e) => handleChange('gender', e.target.value)}
                            />
                            Female
                        </label>
                    </div>
                    <div
                        style={{ display: puser.gender.touched && !puser.gender.valid ? 'block' : 'none', color: 'red' }}
                    >
                        {puser.gender.error}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                        Date of Birth
                    </label>
                    <br />
                    <DatePicker selectedDate={selectedDate} onSelect={handleDateSelect} />
                </div>

                {/* enter email information */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        placeholder="Enter email"
                        className="form-control form-control-sm"
                        id="email"
                        autoComplete="off"
                        name="pemail"
                        value={puser.pemail.value}
                        onChange={(e) => {
                            handleChange('pemail', e.target.value);
                        }}
                        onBlur={(e) => {
                            handleChange('pemail', e.target.value);
                        }}
                    />
                    <div
                        style={{ display: puser.pemail.touched && !puser.pemail.valid ? 'block' : 'none', color: 'red' }}
                    >
                        {puser.pemail.error}
                    </div>
                </div>

                {/* enter password information */}
                <div>
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="form-control form-control-sm"
                        id="password"
                        autoComplete="off"
                        name="passw"
                        value={puser.passw.value}
                        onChange={(e) => {
                            handleChange('passw', e.target.value);
                        }}
                        onBlur={(e) => {
                            handleChange('passw', e.target.value);
                        }}
                    />
                    <br />
                    <div
                        style={{ display: puser.passw.touched && !puser.passw.valid ? 'block' : 'none', color: 'red' }}
                    >
                        {puser.passw.error}
                    </div>
                </div>

                {/* enter address information */}
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        placeholder="Enter address"
                        className="form-control form-control-sm"
                        id="address"
                        autoComplete="off"
                        name="paddress"
                        value={puser.paddress.value}
                        onChange={(e) => {
                            handleChange('paddress', e.target.value);
                        }}
                        onBlur={(e) => {
                            handleChange('paddress', e.target.value);
                        }}
                    />
                    <br />
                    <div
                        style={{ display: puser.paddress.touched && !puser.paddress.valid ? 'block' : 'none', color: 'red' }}
                    >
                        {puser.paddress.error}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={!puser.formValid}
                    onClick={(e) => InsertData(e)}
                >
                    Register
                </button>
            </form>

            <div className="mt-3">
                <p className="mb-0">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default RegistrationForm;
