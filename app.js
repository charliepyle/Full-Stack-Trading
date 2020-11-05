const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const port = 3000


app.use(cors())


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/tickers/:ticker', function (req, res) {
  const tickerString = req.params['ticker'];
  // tickerArray = tickerString.split(',');
  // console.log(tickerString);
  const tiingoKey = "15016c1ef003526e28d8e253da6a90d49b3bed99"
  const tickers_promise = () => {
    return new Promise(resolve => {
      try {
         resolve(axios.get(`https://api.tiingo.com/iex/?tickers=${tickerString}&token=${tiingoKey}`));
      } catch (error) {
        console.error(error);
      }
    })  
  }

  return Promise.all([tickers_promise()]).then((responses) => {
    
    const autocomplete_data = responses[0].data;
    ticker_array = []
    for (item of autocomplete_data) {
      smallItem = {
        ticker: item['ticker'],
        lastPrice: item['last']
      }
      ticker_array.push(smallItem)
    }

    // const autocomplete_ticker = autocomplete_data['ticker'];
    // const autocomplete_name = autocomplete_data['name'];
    res.header('Access-Control-Allow-Origin', '*');
    return res.send(ticker_array);
  }).catch(e => console.log(e));
  // res.send('Hello World!')
})

app.get('/autocomplete/:ticker', function(req, res) {
  const ticker = req.params['ticker']
  const tiingoKey = "15016c1ef003526e28d8e253da6a90d49b3bed99"
  const autocomplete_promise = () => {
    return new Promise(resolve => {
      try {
         resolve(axios.get(`https://api.tiingo.com/tiingo/utilities/search?query=${ticker}&token=${tiingoKey}`));
      } catch (error) {
        console.error(error);
      }
    })  
  }

  return Promise.all([autocomplete_promise()]).then((responses) => {

    const autocomplete_data = responses[0].data;
    autocomplete_array = []
    for (item of autocomplete_data) {
      smallItem = {
        ticker: item['ticker'],
        companyName: item['name']
      }
      autocomplete_array.push(smallItem)
    }

    // const autocomplete_ticker = autocomplete_data['ticker'];
    // const autocomplete_name = autocomplete_data['name'];
    res.header('Access-Control-Allow-Origin', '*');
    return res.send(autocomplete_array);
  }).catch(e => console.log(e));
})

app.get('/details/:ticker', function (req, res) {
  
    const ticker = req.params['ticker']
    const tiingoKey = "15016c1ef003526e28d8e253da6a90d49b3bed99"
    const newsKey = "1d3ab083c679498f9f15b7b37a2b596f"
    const date = new Date();
    const startDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() // need to fix this
    date.setFullYear(date.getFullYear()-2);
    let twoYearsAgo = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() // need to fix this
    const iexResampleFreq = '12hour'
    const dailyResampleFreq = 'daily'



    const query_ticker = () => {
      return new Promise(resolve => {
        try {
           resolve(axios.get(`https://api.tiingo.com/tiingo/daily/${ticker}?token=${tiingoKey}`));
        } catch (error) {
          console.error(error);
        }
      })  
    }

    const iex_ticker = () => {
      return new Promise(resolve => {
        try {
           resolve(axios.get(`https://api.tiingo.com/iex/${ticker}?token=${tiingoKey}`));
        } catch (error) {
          console.error(error);
        }
      })  
    }


    const historical_data = () => {
      return new Promise(resolve => {
        try {
           resolve(axios.get(`https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${twoYearsAgo}&resampleFreq=${dailyResampleFreq}&columns=open,high,low,close,volume&token=${tiingoKey}`));
        } catch (error) {
          console.error(error);
        }
      })  
    }
   
    const today_data = () => {
      return new Promise(resolve => {
        try {
           resolve(axios.get(`https://api.tiingo.com/iex/${ticker}/prices?startDate=${startDate}&resampleFreq=4min&columns=open,high,low,close,volume&token=${tiingoKey}`));
        } catch (error) {
          console.error(error);
        }
      })  
    }



    const news_data = () => {
      return new Promise(resolve => {
        try {
           resolve(axios.get(`https://newsapi.org/v2/everything?apiKey=${newsKey}&q=${ticker}`));
        } catch (error) {
          console.error(error);
        }
      })
      
    }

    
    return Promise.all([query_ticker(), iex_ticker(), historical_data(), today_data(), news_data()]).then((responses) => {
      const query_data = responses[0].data;
      const iex_data = responses[1].data[0];
      const historical_price = responses[2].data;
      
      const last_day_stock_price = responses[3].data;
      const news_data = responses[4].data;

      newsArray = []
      let counter = 0;
      for (article of news_data['articles']) {
        if (counter === 20) {
          break;
        }
        let source = null
        if (article['source'] != null) {
          source = article['source']['name']
        }


        const new_article = {
          url: article['url'],
          title: article['title'],
          description: article['description'],
          source: source,
          urlToImage: article['urlToImage'],
          publishedAt: article['publishedAt'],
        };
        newsArray.push(new_article);
        counter += 1;
      }

      const historicalStockClose = []
      const historicalStockVolume = []
      const lastDayStockClose = []
      const lastDayStockVolume = []
      for (elem of last_day_stock_price) {

        let utcparsed = new Date(elem['date'])
        let utcDate = new Date(utcparsed.toUTCString());
        utcDate.setHours(utcDate.getHours()-8);
        let dateFormatted = new Date(utcDate).getTime()

        day_price = [
          dateFormatted,
          elem['close'],
        ]
        day_volume = [
          dateFormatted,
          elem['volume'] 
        ]
        lastDayStockClose.push(day_price)
        lastDayStockVolume.push(day_volume)
      }

      for (elem of historical_price) {
       let utcparsed = new Date(elem['date'])
        let utcDate = new Date(utcparsed.toUTCString());
        utcDate.setHours(utcDate.getHours()-8);
        let dateFormatted = new Date(utcDate).getTime()

        day_price = [
          dateFormatted,
          elem['open'],
          elem['high'],
          elem['low'],
          elem['close'],
        ]
        day_volume = [
          dateFormatted,
          elem['volume'] 
        ]
        historicalStockClose.push(day_price)
        historicalStockVolume.push(day_volume)
      }

      let last = iex_data['last']
      let prevClose = iex_data['prevClose']

      let change = String((Number(last) - Number(prevClose)).toFixed(2))
      let changePercent = String((Number(change)/Number(prevClose) * 100).toFixed(2))

      currTime = new Date()
      const timeDiff = (currTime - Date.parse(iex_data['timestamp']))/1000
      let stockOpen = null;
      if (timeDiff < 60) {
        stockOpen = true
      }
      else {
        stockOpen = false
      }


      
      const to_return = {
        ticker: query_data['ticker'],
        companyName: query_data['name'],
        description: query_data['description'],
        startDate: query_data['startDate'], // start date of the company
        date: iex_data['timestamp'], //  today's date defined at the top of the function
        lastPrice: last,
        exchangeCode: query_data['exchangeCode'],
        change: change,
        changePercent: changePercent,
        highPrice: iex_data['high'],
        lowPrice: iex_data['low'],
        openPrice: iex_data['open'],
        closePrice: prevClose,
        volume: iex_data['volume'],
        midPrice: iex_data['mid'],
        askPrice: iex_data['askPrice'],
        askSize: iex_data['askSize'],
        bidPrice: iex_data['bidPrice'],
        bidSize: iex_data['bidSize'],
        news: newsArray,
        historicalStockClose: historicalStockClose,
        historicalStockVolume: historicalStockVolume,
        lastDayStockClose: lastDayStockClose,
        lastDayStockVolume: lastDayStockVolume,
        stockOpen: stockOpen,
      }

      res.header('Access-Control-Allow-Origin', '*');
      return res.send(to_return)


    }).catch(e => {return e});
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})