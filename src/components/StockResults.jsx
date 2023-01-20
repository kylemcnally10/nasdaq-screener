import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

const StockResults = (props) => {
    const [stockList, setStockList] = useState([]);
    const price= useRef()
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
    }



    return (
        <>
        <form onSubmit={(e) => {filterStocklist(e)}}>
            <label>Max Price:</label>
            <input type="number" ref= {price}></input>
            <label>Min Dollar Volume:</label>
            <input type="number" ref= {dollarVolume}></input>
            <button className='btn btn-lg btn-success mb-3'>Generate Filtered List</button>
        </form>
            <div className='m-3 text-center'>
                
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
                                        <td>{prevDay.v}</td>
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