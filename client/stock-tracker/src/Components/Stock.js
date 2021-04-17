import React from 'react';

import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

class Stock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartOpenValues: [],
      stockChartLowValues: [],
      stockChartHighValues: [],
      stockSymbol: this.props.stocksymbol,
      API: '',
    }
    this.stockSymbolRef = React.createRef();
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock = async () => {
    const pointerToThis = this;
    const API_KEY = '9KZFAE9XUH9ZQ1PF';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.stockSymbol}&outputsize=full&apikey=${API_KEY}`;
    this.setState({
      API: API_Call
    })

    let stockChartXValuesFunction = [];
    let stockChartOpenValuesFunction = [];
    let stockChartLowValuesFunction = [];
    let stockChartHighValuesFunction = [];

    await fetch(API_Call)
      .then(
        function (response) {
          return response.json();
        }
      )
      .then(
        function (data) {

          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartOpenValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
            stockChartHighValuesFunction.push(data['Time Series (Daily)'][key]['2. high']);
            stockChartLowValuesFunction.push(data['Time Series (Daily)'][key]['3. low']);
          }

          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartOpenValues: stockChartOpenValuesFunction,
            stockChartLowValues: stockChartLowValuesFunction,
            stockChartHighValues: stockChartHighValuesFunction
          })

        }
      )
    this.render();
  }

  render() {
    
    return (
      <div className="mt-5 d-flex justify-content-center container">
        <Plot
          useResizeHandler={true}
          data={[
            {
              name: this.state.stockSymbol + ' Open',
              x: this.state.stockChartXValues,
              y: this.state.stockChartOpenValues,
              type: 'scatter',
              mode: 'lines',
              marker: { color: '#7F7F7F' },
            },
            {
              name: this.state.stockSymbol + ' High',
              x: this.state.stockChartXValues,
              y: this.state.stockChartHighValues,
              type: 'scatter',
              mode: 'lines',
              marker: { color: '#02233a' },
            },
            {
              name: this.state.stockSymbol + ' Low',
              x: this.state.stockChartXValues,
              y: this.state.stockChartLowValues,
              type: 'scatter',
              mode: 'lines',
              marker: { color: '#f00a31' },
            }
          ]}
          layout={
            {
              title: 'Prices',
              width: 1080,
              height: 720,
              autosize: true,
              style: { position: 'relative', width: '100%', height: '100%' },
              xaxis: {
                autorange: true,
                rangeselector: {
                  buttons: [
                    {
                      count: 1,
                      label: '1m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {
                      count: 3,
                      label: '3m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {
                      count: 6,
                      label: '6m',
                      step: 'month',
                      stepmode: 'backward'
                    },
                    {
                      count: 1,
                      label: '1y',
                      step: 'year',
                      stepmode: 'backward'
                    },
                    {
                      count: 5,
                      label: '5y',
                      step: 'year',
                      stepmode: 'backward'
                    },
                    { step: 'all' }
                  ]
                },
                rangeslider: { range: [] },
                type: 'date'
              }
            }
          }
        />
      </div>
    )
  }

}

export default Stock;