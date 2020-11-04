import { ViewportRuler } from '@angular/cdk/scrolling';
import { Component, OnInit, Inject, Input } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { Options } from "highcharts/highstock";
import {Stock} from '../../models/Stock';
import { DetailsComponent } from '../details/details.component';
import IndicatorsCore from "highcharts/indicators/indicators";
import vbp from 'highcharts/indicators/volume-by-price';

IndicatorsCore(Highcharts);
vbp(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts
  @Input() historical: boolean
  @Input() stock: Stock;
  // stock:Stock 
  stringToday: string;
  chartOptions: Options;
//   groupingUnits = [[
//     'week',                         // unit name
//     [1]                             // allowed multiples
// ], [
//     'month',
//     [1, 2, 3, 4, 6], null
// ]];

  constructor(@Inject(DetailsComponent) private parent: DetailsComponent) { 
    const today = new Date();
    this.stringToday = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  }

  ngOnInit(): void {
    this.setChartOptions();
  }

  setChartOptions() {
    let stockClose;
    let stockVolume;

    if (this.historical) {
      stockClose = this.stock.historicalStockClose;
      stockVolume = this.stock.historicalStockVolume;
      this.chartOptions = {
        // chart: {
        //   height: 600,
        // },
    
        title: {
          text: this.stock.ticker + ' Historical'
        },
    
        subtitle: {
          text: 'With SMA and Volume by Price Technical Indicators',
          useHTML: true
        },
  
        rangeSelector: {
          selected: 2
        },
  
        // xAxis: {
        //   gridLineWidth: 0,
        // },
    
        yAxis: [{ // stock axis
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'right',
            x: -5
          },
  
          title: {
            text: 'OHLC',
            // style: {
            //   color: Highcharts.getOptions().colors[1] //black//Highcharts.getOptions().colors[2]
            // }
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          },
          
        }, { // volume axis
          labels: {
            align: 'right',
            x: -5,
          },
          title: {
            text: 'Volume',
            // style: {
            //   color: Highcharts.getOptions().colors[1] 
            // }
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2,
          
        }],
        // plotOptions: {
        //   series: {
        //       dataGrouping: {
        //           units: this.groupingUnits
        //       }
        //   }
        // },
        // rangeSelector: {
        //   buttons: [{
        //     type: 'day',
        //     count: 7,
        //     text: '7d'
        //   }, {
        //     type: 'day',
        //     count: 15,
        //     text: '15d'
        //   }, 
        //   {
        //     type: 'month',
        //     count: 1,
        //     text: '1m'
        //   }, 
        //   {
        //     type: 'month',
        //     count: 3,
        //     text: '3m'
        //   }, 
        //   {
        //     type: 'month',
        //     count: 6,
        //     text: '6m'
        //   }],
        //   // selected: 1,
        //   inputEnabled: false
        // },
  
        // plotOptions: {
        //   series: {
        //       dataLabels: {
        //           enabled: false
        //       }
        //   }
        // },
        tooltip: {
          split: true
        },
        series: [{
          name: this.stock.ticker,
          // label: {
          //   enabled: false
          // },
          type: 'candlestick',
          id: 'ohlc',
          data: stockClose,
          yAxis: 0,
          zIndex: 2,
          // dataGrouping: {
          //   units: groupingUnits
          // }
          // gapSize: 5,
          // tooltip: {
          //   valueDecimals: 2
          // },
          // },
          // threshold: null
        }, {
          name: this.stock.ticker + ' Volume',
          type: 'column',
          id: 'volume',
          yAxis: 1,
          data: stockVolume,
        }, {
          type: 'sma',
          linkedTo: 'ohlc',
          zIndex: 1,
          marker: {
            enabled: false
          }
        }, {
          type: 'vbp',
          linkedTo: 'ohlc',
          params: {
            volumeSeriesID: 'volume'
          },
          dataLabels: {
            enabled: false
          },
          zoneLines: {
            enabled: false
          }
        },
        ],
  
        credits: {
          enabled: true
        },
  
        // navigator: {
        //   series: {
        //     label: {
        //       enabled: false
        //     }
        //   }
        // },
      }
    }
    else {
      stockClose = this.stock.lastDayStockClose;
      stockVolume = this.stock.lastDayStockVolume;
      this.chartOptions = {
        // chart: {
        //   height: 600,
        // },
    
        title: {
          text: this.stock.ticker
        },
  
        rangeSelector: {
          enabled: false,
        },


        tooltip: {
          split: true
        },
        series: [{
          name: this.stock.ticker,
          type: 'line',
          data: stockClose,
        } 
        ],
  
      }
    }


  }

}
