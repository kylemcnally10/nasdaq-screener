import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function Login() {
    const cookies = new Cookies();
    const cookiePin = cookies.get("pin");
    const [pin, setPin] = useState("")
    const [errors, setErrors] = useState(null)
    const [isAuth, setIsAuth] = useState(null)

    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const user = {
            pin
        }

        if (user.pin == "3052") {
            cookies.set("pin", user.pin);
            setIsAuth(true);
            navigate('/stocks')
        }
        else {
            navigate('/')
        }
    }

    return (
        <>
            {
                cookiePin ?
                    <Navigate to="/stocks" replace />
                    :
                    <div className="w-50 container d-flex flex-column justify-content-center" style={{ height: '100vh' }}>

                        <div className="card">

                            <form>

                                <h1 className="form-group p-2 mt-5">Login</h1>

                                <input className="form-group p-2 m-2 "
                                    placeholder="Enter Pin"
                                    onChange={(e) => {
                                        setPin(e.target.value)
                                    }}
                                />

                                <div className="form-group p-2 m-2">
                                    <button className="btn btn-primary w-50" onClick={handleLoginSubmit}>Login</button>
                                </div>

                            </form>

                        </div>

                    </div>

            }
        </>
    )
};

export default Login;