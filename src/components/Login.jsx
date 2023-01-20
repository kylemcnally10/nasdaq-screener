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
            setErrors("Incorrect Pin")
            navigate('/')
        }
    }

    return (
        <>
            {
                cookiePin ?
                    <Navigate to="/stocks" replace />
                    :
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="text-danger text-center mb-3">{errors}</div>
                        <div className="card border-dark">
                            <form>
                                <div className="m-3">
                                    <input className="form-control w-100 text-center"
                                        placeholder="Enter Pin" type="password"
                                        onChange={(e) => {
                                            setPin(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="form-group text-center m-3">
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