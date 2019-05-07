import React from 'react';

type Props = {
  isChangeInputAmount: boolean,
  onChangeAmount: () => void,
  onPressEnter: () => void,
  onChangeInputAmount: () => void,
  amount: string,
};

const AmountField = (props: Props) => (
    <input name="rates" className="form-control text-right rates-field" value={props.amount} onKeyDown={props.onPressEnter} onChange={props.onChangeAmount}/>
);

export default AmountField;