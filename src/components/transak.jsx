

import React from 'react'


 const Transak = (resp) => {
    console.log("this is in Transak", resp)
    const responseis = resp.resp

    const finalresp = JSON.parse(responseis.choices[0].message.function_call.arguments)

    const APIKEY="c6016886-3759-4f3f-bba0-8602cf4a6401"


    console.log(
        `
        <iframe
        id="transakIframe"
        src={https://global-stg.transak.com/?apiKey=${APIKEY}&environment=STAGING&widgetHeight=100%&widgetWidth=100%&exchangeScreenTitle=Buy%20Crypto&productsAvailed=${finalresp.command}&fiatAmount=${finalresp.fiatamount}&paymentMethod=${finalresp.paymentmethod || "credit_debit_card"}&fiatCurrency=${finalresp.fiatcurrency}&countryCode=${finalresp.countrycode}&network=${finalresp.network}&cryptoCurrencyCode=${finalresp.cryptocurrencycode}&email=${finalresp.email}&themeColor=#ffc0cb}
        allow="camera;microphone;payment"
        style="height: 100%; width: 100%; border: none">
    </iframe> 
    `
    )



  return (
<div className='h-full'>
            {finalresp.command=="BUY" ?

                <iframe
                id="transakIframe"
                src={`https://global-stg.transak.com/?apiKey=${APIKEY}&environment=STAGING&widgetHeight=100%&widgetWidth=100%&exchangeScreenTitle=AI%20Crypto&productsAvailed=${finalresp.command}&paymentMethod=${finalresp.paymentmethod || "credit_debit_card"}&fiatAmount=${finalresp.fiatamount}&fiatCurrency=${finalresp.fiatcurrency}&network=${finalresp.network}&cryptoCurrencyCode=${finalresp.cryptocurrencycode}&walletAddress=${finalresp.walletAddress != "" ? finalresp.walletAddress : "0x4B564410Ca30eDa1197958d912f0447b04a5cF27"}&email=${finalresp.email !="" ? finalresp.email : "justinbenito1974@gmail.com"}&themeColor=#ffc0cb`}
                allow="camera;microphone;payment"
                className='w-full h-full'
               >
            </iframe> 
                
                :

                <iframe
                id="transakIframe"
                src={`https://global-stg.transak.com/?apiKey=${APIKEY}&environment=STAGING&widgetHeight=100%&widgetWidth=100%&exchangeScreenTitle=AI%20Crypto&productsAvailed=${finalresp.command}&fiatCurrency=${finalresp.fiatcurrency}&network=${finalresp.network}&paymentMethod=credit_debit_card&cryptoAmount=${finalresp.cryptoamount}&cryptoCurrencyCode=${finalresp.cryptocurrencycode}&walletAddress=${ finalresp.walletAddress != "" ? finalresp.walletAddress : "0x4B564410Ca30eDa1197958d912f0447b04a5cF27"}&email=${finalresp.email !="" ? finalresp.email : "justinbenito1974@gmail.com"}&themeColor=#cfa4ff`}
                allow="camera;microphone;payment"
                className='w-full h-full'
                >
            </iframe>

            }
            </div>
            
  )
//   "{
//     "command": "SELL",
//     "fiatamount": 0,
//     "fiatcurrency": "USD",
//     "countrycode": "US",
//     "network": "Ethereum",
//     "cryptoamount": 0.05,
//     "cryptocurrency": "Tether",
//     "cryptocurrencycode": "USDT"
//   }"

//https://global-stg.transak.com/?apiKey=${APIKEY}&environment=STAGING&widgetHeight=100%&widgetWidth=100%&exchangeScreenTitle=AI%20Crypto&productsAvailed=SELL&fiatcurrency=USD
}


export default Transak;