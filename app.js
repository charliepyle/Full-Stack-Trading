const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const port = 3000


app.use(cors())
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/watchlist', function (req, res) {
  res.send('Hello World!')
})

app.get('/portfolio', function (req, res) {
  res.send('Hello World!')
})

app.get('/details/:ticker', function (req, res) {
    const ticker = req.params['ticker']
    const tiingoKey = "15016c1ef003526e28d8e253da6a90d49b3bed99"
    const newsKey = "1d3ab083c679498f9f15b7b37a2b596f"
    const date = new Date();
    const startDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() // need to fix this
    const columns = 'open,high,low,close,volume'
    const iexResampleFreq = '4min'
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
           resolve(axios.get(`https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&resampleFreq=${dailyResampleFreq}&token=${tiingoKey}`));
        } catch (error) {
          console.error(error);
        }
      })  
    }
   
    const stock_ticker = () => {
      return new Promise(resolve => {
        try {
           resolve(axios.get(`https://api.tiingo.com/iex/${ticker}/prices?startDate=${startDate}&resampleFreq=${iexResampleFreq}&columns=${columns}&token=${tiingoKey}`));
        } catch (error) {
          console.error(error);
        }
      })  
    }


    const autocomplete_promise = () => {
      return new Promise(resolve => {
        try {
           resolve(axios.get(`https://api.tiingo.com/tiingo/utilities/search?query=${ticker}&token=${tiingoKey}`));
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

    
    return Promise.all([query_ticker(), iex_ticker(), historical_data(), stock_ticker(), autocomplete_promise(), news_data()]).then((responses) => {
      const query_data = responses[0].data;
      const iex_data = responses[1].data;
      const historical = responses[2].data;
      const stock_data = responses[3].data;
      const autocomplete_data = responses[4].data;
      const news_data = responses[5].data;
;

      const bigString = String(query_data) + String(iex_data) + String(historical) + String(stock_data) + String(autocomplete_data) + String(news_data);
      console.log(iex_data)
      return res.send(query_data)
    }).catch(e => console.log(e));


    // query_ticker().then((response) => {
    //   // console.log('fuck!');
    //   const dailyResponse = response;
    //   return axios.get(`https://api.tiingo.com/iex/${ticker}?token=${tiingo_key}`)
    //   const newResponse = axios.get(`https://api.tiingo.com/iex/${ticker}?token=${tiingo_key}`)
    //   console.log(dailyResponse.data)
    //   console.log(newResponse.data)
    //   return [dailyResponse, newResponse]

    //   // return res.send(response.data['exchangeCode']);
    // }).then((total_response) => {
    //   const fullData = total_response.data; //+ total_response[1].data;
    //   return res.send(fullData);
    // }).catch(e => console.log(e));




    // const getStockInfo = () => {

    //     try {
    //       return axios.get(`https://api.tiingo.com/tiingo/daily/${ticker}?token=${tiingo_key}`)
    //     } catch (error) {
    //       console.error(error)
    //     }
    //   }
      
    // const printStocks = async () => {
    //     const breeds = getStockInfo()
    //       .then(response => {
    //         console.log(response)
    //         res.send(response.data['exchangeCode'])
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    // }

    // printStocks()
    
    // res.send(keyword)
    // tiingo_key = "15016c1ef003526e28d8e253da6a90d49b3bed99"
    // news_key = "1d3ab083c679498f9f15b7b37a2b596f"
    // startDate = datetime.today() + relativedelta(months=-6)

    // columns = 'open,high,low,close,volume'
    // resampleFreq = '12hour'

    // outlook_URL = "https://api.tiingo.com/tiingo/daily/{}?token={}".format(keyword, tiingo_key)
    // outlook_response = requests.get(url=outlook_URL)
    // outlook_content = outlook_response.content
    // outlook_info = json.loads(outlook_content)
    // if 'detail' in outlook_info:
    //     error_json = {
    //         'error': 'error'
    //     }
    //     return json.dumps(error_json)
    //     # print(outlook_info['detail'])

    // # outlook parsing
    
    // company_name = outlook_info['name']
    // symbol = outlook_info['ticker']
    // code = outlook_info['exchangeCode']
    // start_date = outlook_info['startDate']
    // description = outlook_info['description'] # figure out truncation later

    // outlook_json = {
    //     "company_name": company_name,
    //     "symbol": symbol,
    //     "code": code,
    //     "start_date": start_date,
    //     "description": description,
    // }


    // # end outlook parsing

    // stock_summary_URL = "https://api.tiingo.com/iex/{}?token={}".format(keyword, tiingo_key)
    // stock_summary_response = requests.get(url=stock_summary_URL)
    // stock_summary_content = stock_summary_response.content
    // stock_summary_info = json.loads(stock_summary_content)
    // stock_summary_info = stock_summary_info[0] # first item in list because this returns a list
    
    
    // # start summary parsing

    // stock_ticker = str(stock_summary_info['ticker'])
    // trading_day = str(parser.parse(stock_summary_info['timestamp']).date()) # this line is a lot lol
    // prev_close = str(stock_summary_info['prevClose'])
    // open = str(stock_summary_info['open'])
    // high = str(stock_summary_info['high'])
    // low = str(stock_summary_info['low'])
    // last = str(stock_summary_info['last'])
    // change = str(float(last) - float(prev_close))
    // change_percent = str(float(change)/float(prev_close) * 100)
    // volume = str(stock_summary_info['volume'])


    // stock_json = {
    //     "stock_ticker": stock_ticker,
    //     "trading_day": trading_day,
    //     "prev_close": prev_close,
    //     "open": open,
    //     "high": high,
    //     "low": low,
    //     "last": last,
    //     "change": change,
    //     "change_percent": change_percent,
    //     "volume": volume,
    // }
   

    

    // # end summary parsing

    // stock_price_URL = "https://api.tiingo.com/iex/{}/prices?startDate={}&resampleFreq={}&columns={}&token={}".format(keyword, startDate, resampleFreq, columns, tiingo_key)
    // stock_price_response = requests.get(url=stock_price_URL)
    // stock_price_content = stock_price_response.content
    // stock_price_info = json.loads(stock_price_content)


    // # start array parsing

    // stock_close = []
    // stock_volume = []

    // for stock in stock_price_info:
    //     # date formatting
    //     date = stock['date']
    //     date = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d %H:%M:%S')
    //     stock_close.append((date, stock['close']))
    //     stock_volume.append((date, stock['volume']))
    
    // # news query
    
    // URL = "https://newsapi.org/v2/everything?apiKey={}&q={}".format(news_key, keyword)

    // # request + response
    // response = requests.get(url=URL)
    // response_binary = response.content
    // results = json.loads(response_binary)

    // # info parsing
    // article_list = []
    // num_articles = 0
    // for article in results['articles']:
    //     if num_articles == 5:
    //         break
    //     urlToImage = article['urlToImage']
    //     title = article['title']
    //     publishedAt = article['publishedAt']
    //     publishedAt = datetime.strptime(publishedAt, '%Y-%m-%dT%H:%M:%SZ').strftime('%m/%d/%y')
    //     url = article['url']

    //     json_article = {
    //         'image_url': urlToImage,
    //         'title': title,
    //         'published': publishedAt,
    //         'url': url
    //     }

    //     article_list.append(json_article)
    //     num_articles += 1

    // trade_json = {
    //     "stock_close": stock_close,
    //     "stock_volume": stock_volume,
    // }

    // article_json = {
    //     'articles': article_list
    // }

    // combined_json = {
    //     'outlook': outlook_json,
    //     'stock': stock_json,
    //     'trades': trade_json,
    //     'articles': article_json
    // }

    // return json.dumps(combined_json)
    // res.send(req.params)
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})