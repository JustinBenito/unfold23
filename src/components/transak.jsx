import React from 'react'
// import transakSDK from '@transak/transak-sdk';

 const Transak = (resp) => {
    console.log("this is in Transak", resp)
    const response_message = resp.choices[0].message.function_call.arguments;
    console.log(response_message)
    const APIKEY="ef4f99f1-99f5-4897-9a1d-983d7371eaf3"
    // const args="{
    //     "command": "SELL",
    //     "fiatamount": 0,
    //     "fiatcurrency": "",
    //     "countrycode": "",
    //     "network": "",
    //     "cryptoamount": 30,
    //     "cryptocurrency": "ETH",
    //     "cryptocurrencycode": ""
    //   }"



  return (
   <div style="position: relative; width: 500px; height: 80dvh; margin: auto; box-shadow: 0 0 15px #1461db; border-radius: 15px; overflow: hidden">
            <iframe
                id="transakIframe"
                src={`https://global-stg.transak.com/?apiKey=${APIKEY}&environment=STAGING&widgetHeight=100%&widgetWidth=100%&exchangeScreenTitle=Buy%20Crypto&productsAvailed=${response_message.command}&fiatAmount=${response_message.fiatamount}`}
                allow="camera;microphone;payment"
                style="height: 100%; width: 100%; border: none">
            </iframe>
        </div>
  )
}


export default Transak;