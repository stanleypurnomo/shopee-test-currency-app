import React from 'react';

type Props = {
  currency: string,
  value: string,
  currencyName: string,
  onRemoveCurrency: () => void,
};

const ListCurrency = (props: Props) => (
    <div className="card">
        <div className="card-body currency-card">
            <div className="flex" style={{width:'100%'}}>
                <div className="flex-0-25 text-left">
                    {props.currency}
                </div>
                <div className="flex-0-75 text-right">
                    {props.value}
                </div>
            </div>
            <div className="currency-desc flex">
                <div className="flex-1">
                    <p className="italic-description">{props.currency} - {props.currencyName}</p>
                </div>
            </div>
            <div className="currency-desc flex">
                <div className="flex-0-75">
                    1 USD = {props.currency} {props.standardValue}
                </div>
                <div className="flex-0-25 text-right">
                    <button className="btn btn-danger" onClick={props.onRemoveCurrency}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default ListCurrency;