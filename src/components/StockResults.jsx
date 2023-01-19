import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

const StockResults = (props) => {
    const [stockList, setStockList] = useState([]);
    let first = true;

    useEffect(() => {
        if (first) {

            axios.get('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=NXMkFFMU6CkA7wOLQUt52gJFbjHWpBpp')
                .then(response => response)
                .then(response => {
                    console.log(response.data)
                    setStockList(response.data.tickers)
                    first = false
                })
                .catch(error => {
                    throw (error);
                })
        }
    }, [])

    const filterStocklist = (e) => {
        e.preventDefault()
        const filteredStocks = stockList.filter(s => s.prevDay.c < 3.0 && s.prevDay.v * s.prevDay.c > 1000000).sort((a, b) => a.ticker.localeCompare(b.ticker))
        setStockList(filteredStocks)
    }



    return (
        <>
            <div className='m-3 text-center'>
                <button className='btn btn-lg btn-success mb-3' onClick={filterStocklist}>Generate Filtered List</button>
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