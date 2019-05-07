import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import AmountField from './components/AmountField';
import currenciesName from './trans/currenciesName';
import getCurrencyUSD from './api/getCurrencyUSD';
import AddCurrency from './components/AddCurrency';
import ListCurrency from './components/ListCurrency';
import { formatNumber, formatThousand } from './numeral/numbersFormat';

type State = {
  amount: number,
  currencyValue: string,
  isChangeInputAmount: boolean,
  isChangeInputCurrency: boolean,
  currencies: Array<*>,
  rates: Array<*>,
  currenciesDisplay: Array<*>,
}

export default class App extends Component {
  state: State;

  constructor() {
    super();
    this.state = {
      amount: 10.00000,     //default amount
      currencyValue: '',
      isChangeInputAmount: false,
      isChangeInputCurrency: false,
      currencies: [],
      rates: [],
      currenciesDisplay: [],
    };
  }

  async componentDidMount() {
    const currencies        = await getCurrencyUSD();
    const currenciesOption  = Object.keys(currencies.rates);
    console.log(currencies);
    await this.setState({
      rates: currencies.rates,
      currencies: currenciesOption.map(currency => ({
        key: currency,
        text: currency,
        value: currency,
      })),
    });
    await this.setState({
      currenciesDisplay: [...this.state.currenciesDisplay,
      {
        currency: 'IDR',
        value: this.state.rates['IDR'],
        currencyName: currenciesName['IDR'],
      },
      {
        currency: 'EUR',
        value: this.state.rates['EUR'],
        currencyName: currenciesName['EUR'],
      }, 
      {
        currency: 'GBP',
        value: this.state.rates['GBP'],
        currencyName: currenciesName['GBP'],
      }, 
      {
        currency: 'SGD',
        value: this.state.rates['SGD'],
        currencyName: currenciesName['SGD'],
      }, 
    ],
    });
  }

  keyPressInputAmount(event) {
    if(event.keyCode === 13) {
      this.setState({ isChangeInputAmount: false });
    };
  }
  
  async addNewCurrency() {
    const currencyItem = {
      currency: this.state.currencyValue,
      value: this.state.rates[this.state.currencyValue],
      currencyName: currenciesName[this.state.currencyValue],
    };
    await this.setState({
      currenciesDisplay: [...this.state.currenciesDisplay, currencyItem],
      isChangeInputCurrency: false,
      currencyValue: '',
    });
    return true;
  }

  async removeCurrency(currency) {
    await this.setState({
      currenciesDisplay: this.state.currenciesDisplay.filter(item => item.currency !== currency),
    });
    return true;
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        {/* <div className="form-group"> */}
          <div className="flex">
            <div className="col-flex flex-1 text-left">
              <p className="italic-text">USD - United States Dollars</p>
            </div>
          </div>
          <div className="flex">
              <div className="col-flex flex-0-4 text-left">
                <h3 className="header-title">USD</h3>
              </div>
              <div className="col-flex flex-0-6">
                <AmountField
                  isChangeInputAmount={this.state.isChangeInputAmount}
                  onChangeInputAmount={() => this.setState({ isChangeInputAmount: true })}
                  onChangeAmount={event => this.setState({ amount: event.target.value })}
                  onPressEnter={event => this.keyPressInputAmount(event)}
                  amount={formatNumber(this.state.amount)}
                />
              </div>
          </div>
        {/* </div>   */}
        </header>
        <div className="content">
          <div className="flex">
            <div className="flex-1">
              <div className="box">
                {
                  this.state.currenciesDisplay.map((item, index) => (
                    <ListCurrency
                      key={index}
                      currency={item.currency}
                      value={formatThousand(item.value * this.state.amount)}
                      standardValue={formatThousand(item.value)}
                      currencyName={item.currencyName}
                      onRemoveCurrency={() => this.removeCurrency(item.currency)}
                    />
                  ))
                }
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              <AddCurrency
                currencies={this.state.currencies}
                isChangeInputCurrency={this.state.isChangeInputCurrency}
                onChangeInputCurrency={() => this.setState({ isChangeInputCurrency: true })}
                handleChangeCurrency={(event, { value }) => this.setState({ currencyValue: value })}
                currencyValue={this.state.currencyValue}
                onAddNewCurrency={() => this.addNewCurrency()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default App;