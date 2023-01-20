import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

const StockResults = (props) => {
    const [stockList, setStockList] = useState([]);
    const price = useRef()
    const dollarVolume = useRef()
    let first = true;

    useEffect(() => {
        if (first) {

            axios.get('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=NXMkFFMU6CkA7wOLQUt52gJFbjHWpBpp')
                .then(response => {
                    console.log(response.data)
                    setStockList(response.data.tickers)
                })
                .catch(error => {
                    throw (error);
                })
        }
    }, [])

    const filterStocklist = (e) => {
        let fPrice = price.current.value
        let fDollarVolume = dollarVolume.current.value
        e.preventDefault()
        const filteredStocks = stockList.filter(s => s.prevDay.c < parseFloat(fPrice) && (s.prevDay.v * s.prevDay.c) > parseFloat(fDollarVolume)).sort((a, b) => a.ticker.localeCompare(b.ticker))
        setStockList(filteredStocks)
        console.log("Price: ", fPrice)
        console.log("Volume: ", fDollarVolume)
    }



    return (
        <>
            <form className='m-3' onSubmit={(e) => { filterStocklist(e) }}>
                <div className='mb-3 align-items-center w-100'>
                    <label className='form-label'>Max Price:</label>
                    <input className='form-control w-25' type="number" defaultValue={3} ref={price}></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Min Dollar Volume:</label>
                    <input className='form-control w-25' type="number" defaultValue={1000000} ref={dollarVolume}></input>
                </div>
                <div className='mb-3 w-25'>
                    <button className='btn btn-lg btn-success w-100'>Generate Filtered List</button>
                </div>
            </form>
            <div className='m-3'>
                <table className="table table-striped table-bordered border-dark text-center mw-75">
                    <thead>
                        <tr>
                            <th scope="row">Ticker </th>
                            <th scope="row">Volume </th>
                            <th scope="row">Close price </th>
                            <th scope="row">Dollar Volume </th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            stockList.map((stock) => {
                                const { ticker, prevDay } = stock

                                return (

                                    <tr key={ticker}>
                                        <td>
                                            <Link to={`/stocks/${ticker}`} target='_blank'>{ticker}</Link>
                                        </td>
                                        <td>{(prevDay.v).toLocaleString("en-US")}</td>
                                        <td>${prevDay.c}</td>
                                        <td>${(Math.round(prevDay.v * prevDay.c)).toLocaleString("en-US")}</td>
                                    </tr>

                                );
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default StockResults