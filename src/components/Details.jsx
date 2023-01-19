import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const StockResults = (props) => {
    const [stock, setStock] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [mailingAddress, setMailingAddress] = useState('');
    const [forms, setForms] = useState([]);
    const { cik } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://data.sec.gov/submissions/CIK${cik}.json`)
            .then(response => response)
            .then(response => {
                console.log(response)
                setStock(response.data)
                setBusinessAddress(response.data.addresses.business)
                setMailingAddress(response.data.addresses.mailing)
                setForms(response.data.filings.recent.form)
                console.log(forms)
            })
            .catch(error => {
                throw (error);
            })
    }, [])

    const handleBack = (e) => {
        e.preventDefault()
        navigate('/stocks')
    }

    return (
        < div >
            <button onClick={handleBack}>
                Back
            </button>
            <h1>{stock.tickers}: {stock.name}</h1>
            <h3>Exchanges: {stock.exchanges}</h3>
            <a href={stock.website}>{stock.website}</a>
            <h3>Business Address: {businessAddress.street1} {businessAddress.city}, {businessAddress.stateOrCountry} {businessAddress.zipCode}</h3>
            <h3>Mailing Address: {mailingAddress.street1} {mailingAddress.city}, {mailingAddress.stateOrCountry} {mailingAddress.zipCode}</h3>
            <h3>Phone Number: {stock.phone}</h3>
            <h3>SIC: {stock.sicDescription}</h3>
            <h3>Description:{stock.description}</h3>
            <h3>Filings:
                {
                    forms.filter((f) => f == "S-1" || f == "S-1/A" || f == "S-2" || f == "S-3" || f == "S-3/A" || f == "S-4" || f == "S-8").map((f) => {
                        return (
                            <h3>{f}</h3>
                        );
                    }
                    )
                }
            </h3>
        </div >
    )
}

export default StockResults


