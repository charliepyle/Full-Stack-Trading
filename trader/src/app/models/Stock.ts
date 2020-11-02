import { NewsItem } from './NewsItem';

export class Stock {
    id: number;
    ticker: string;
    companyName: string;
    lastPrice: number;
    change: number;
    changePercent: number;
    lastTimestamp: string;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    closePrice: number;
    volume: number;
    midPrice: number;
    askPrice: number;
    askSize: number;
    bidPrice: number;
    bidSize: number;
    last: number;
    date: string;
    exchangeCode: string;
    description: string;
    startDate: string;
    news: NewsItem[]
}