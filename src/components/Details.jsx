import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';

const StockResults = (props) => {
    const cookies = new Cookies();
    const [stock, setStock] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [mailingAddress, setMailingAddress] = useState('');
    const [tickers, setTickers] = useState([]);
    const [exchanges, setExchanges] = useState([]);
    const [forms, setForms] = useState([]);
    const [primaryDocument, setPrimaryDocument] = useState([]);
    const [accessionNumber, setAccessionNumber] = useState([]);
    const { cik } = useParams();
    const navigate = useNavigate();
    const cookiePin = cookies.get("pin");
    const formKey = []; 
    let flag = -1;


    useEffect(() => {
        axios.get(`https://data.sec.gov/submissions/CIK${cik}.json`)
            .then(response => response)
            .then(response => {
                console.log(response)
                setStock(response.data)
                setBusinessAddress(response.data.addresses.business)
                setMailingAddress(response.data.addresses.mailing)
                setTickers(response.data.tickers)
                setExchanges(response.data.exchanges)
                setForms(response.data.filings.recent.form)
                setPrimaryDocument(response.data.filings.recent.primaryDocument)
                setAccessionNumber(response.data.filings.recent.accessionNumber)
            })
            .catch(error => {
                throw (error);
            })
    }, [])

    const handleBack = (e) => {
        e.preventDefault()
        window.close()
    }

for (let i = 0; i < forms.length; i++){
    if(forms[i] == "S-1" || forms[i] == "S-1/A" || forms[i] == "S-2" || forms[i] == "S-3" || forms[i] == "S-3/A" || forms[i] == "S-4" || forms[i] == "S-8"){
        formKey.push(i)
    }
}
for(let i = 0; i < formKey.length; i++){
    console.log("index: ", formKey[i])
}

for(let i = 0; i < accessionNumber.length; i++){
    accessionNumber[i] = accessionNumber[i].split('-').join('');

}

    return (
        <>
        {
            !cookiePin ? <Navigate to="/" replace /> :
        <>
            <div className='w-100'>
                <div className='mw-75 card bg-light border-dark m-3'>
                    <h1 className='card-header text-center'>{stock.name}</h1>
                    <div className='card-body text-dark'>
                        <h3 className='card-title mb-3'>
                            {
                                tickers.map((ticker, idx) => {
                                    return (
                                        <span key={idx}> {ticker}{idx === tickers.length - 1 ? "" : ","}</span>
                                    );
                                }
                                )
                            }
                        </h3>
                        <p>
                            Exchanges:
                            {
                                exchanges.map((exchange, idx) => {
                                    return (
                                        <span key={idx}> {exchange}{idx === exchanges.length - 1 ? "" : ","}</span>
                                    );
                                }
                                )
                            }
                        </p>
                        <p className='card-text'>SIC: {stock.sicDescription}</p>
                        <p className='card-text'>Phone: {stock.phone}</p>
                        <p className='card-text'>{stock.description}</p>
                        <p>
                            <a className='card-text' href={stock.website}>{stock.website}</a>
                        </p>
                        <p className='card-text'>Business: {businessAddress.street1} {businessAddress.city}, {businessAddress.stateOrCountryDescription} {businessAddress.zipCode}</p>
                        <p className='card-text'>Mailing: {mailingAddress.street1} {mailingAddress.city}, {mailingAddress.stateOrCountryDescription} {mailingAddress.zipCode}</p>
                        <p className='card-text'>
                            Filings:
                            {
                                forms.filter((f, idx) => {
                                    return (f == "S-1" || f == "S-1/A" || f == "S-2" || f == "S-3" || f == "S-3/A" || f == "S-4" || f == "S-8")}).map((f, idx) => {
                                    flag++
                                    return (
                                        <a href={`https://www.sec.gov/Archives/edgar/data/${cik}/${accessionNumber[formKey[flag]]}/${primaryDocument[formKey[flag]]}`} target= "_blank" ><span key={idx}> {f}{idx === forms.filter((f) => f == "S-1" || f == "S-1/A" || f == "S-2" || f == "S-3" || f == "S-3/A" || f == "S-4" || f == "S-8").length - 1 ? "" : ","}</span></a>
                                        
                                    );
                                }
                                )
                            }
                        </p>
                    </div>
                </div >
                <div className='text-center'>
                    <button className='btn btn-secondary' onClick={handleBack}>
                        Close Tab
                    </button>
                </div>
            </div>
        </>
    }
    </>
    )
}

export default StockResults


