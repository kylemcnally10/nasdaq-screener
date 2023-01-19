import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'

const StockResults = (props) => {
    const [stockList, setStockList] = useState([]);
    let first = false;

    const filterStocklist = (e) => {
        const filteredStocks = stockList.filter(s => s.prevDay.c < 3.0 && s.prevDay.v * s.prevDay.c > 1000000).sort((a, b) => a.ticker.localeCompare(b.ticker))
        setStockList(filteredStocks)
    }

    useEffect(() => {
        axios.get('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=NXMkFFMU6CkA7wOLQUt52gJFbjHWpBpp')
            .then(response => response)
            .then(response => {
                console.log(response.data)
                setStockList(response.data.tickers)
            })

            .catch(error => {
                throw (error);
            })
    }, [first])

    return (
        <>
            <button onClick={filterStocklist}>Generate</button>
            <table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th scope="col">Ticker</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Close price</th>
                        <th scope="col">Dollar Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        stockList.map((stock) => {
                            const { ticker, prevDay } = stock

                            return (

                                <tr key={ticker}>
                                    <td>
                                        <Link to={`/stocks/${ticker}`}>{ticker}</Link>
                                    </td>
                                    <td>{prevDay.v}</td>
                                    <td>${prevDay.c}</td>
                                    <td>${prevDay.v * prevDay.c}</td>
                                </tr>

                            );
                        }
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default StockResults