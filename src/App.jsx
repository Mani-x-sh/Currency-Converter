import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { SyncLoader } from 'react-spinners'

const App = () => {
  const [money, setMoney] = useState()
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("INR")
  const [currencies, setCurrencies] = useState([])
  const [convertedAmount, setConvertedAmount] = useState()
  const [exchangeRate, setExchangeRate] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{               
    axios.get("https://v6.exchangerate-api.com/v6/39cb260595a999400a72afe4/latest/USD")
    .then((response)=>
   {
    const currencyCodes=Object.keys(response.data.conversion_rates)
    setCurrencies(currencyCodes)
     setExchangeRate(response.data.conversion_rates[toCurrency])
     })
  },[]) 
  const convertCurrency=(()=>
  {
    setLoading(true)
    axios.get(`https://v6.exchangerate-api.com/v6/39cb260595a999400a72afe4/latest/${fromCurrency}`) 
    .then((response) =>
       {
         const rate = response.data.conversion_rates[toCurrency];
          setExchangeRate(rate);
          setConvertedAmount(money*rate); 
          setLoading(false)
        });
   
  })
  return (
    <div className="container">
      
      <div className="heading">
        <h1>CURRENCY CONVERTER</h1>
      </div>
      
      <div className="amount-selector">
        <h1>Amount</h1>
        <input
         type="number"
        
        onChange={(e)=>setMoney(e.target.value)}
        />        
      </div>
      
      <div className="country-selector">

        <div className="from-country">
          <h3>FROM</h3>
          <select value={fromCurrency} onChange={(e)=>{
            setFromCurrency(e.target.value)
          }} >
           { currencies.map((currency,index)=>(
              <option key={index} value={currency}>{currency}</option>
            ))
          }
          </select>
        </div>

        <div className="to-country">
          <h3>TO</h3>
          <select value={toCurrency} onChange={(e)=>{
            setToCurrency(e.target.value)
          }} >
           { currencies.map((currency,index)=>(
              <option key={index} value={currency}>{currency}</option>
            ))
          }
          </select>        
        </div>

      </div>  

      <div className="button-converter">
        <button onClick={convertCurrency}>CONVERT</button>
      </div>

      <div className="result-display" >
        {loading ?(<p className='loading-button'><SyncLoader loading={true}/></p>):(<p>   {convertedAmount} </p>)}
        
      </div>
    </div>
  )
}

export default App
