import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const CIKResults = (props) => {
    const [CIK, setCIK] = useState('');
    const { ticker } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=NXMkFFMU6CkA7wOLQUt52gJFbjHWpBpp`)
            .then(response => response)
            .then(response => {
                setCIK(response.data.results.cik)
            })
            .catch(error => {
                throw (error);
            })
    }, [])

    console.log("CIK: ", CIK)
    navigate(`/stocks/cik/${CIK}`)

    return (
        <h1>Loading...</h1>
    );
}

export default CIKResults