import React from 'react';
import {Button, Dropdown} from 'semantic-ui-react';

type Props = {
  isChangeInputCurrency: boolean,
  currencies: Array<*>,
  currencyValue: string,
  handleChangeCurrency: () => void,
  onAddNewCurrency: () => void,
  onChangeInputCurrency: () => void,
};

const AddCurrency = (props: Props) => (
  <div className="flex" style={{width: '100%'}}>
      {
        props.isChangeInputCurrency ? (
          <Button
          as="div"
          labelPosition="left"
          className="button-container">
          <Dropdown
            fluid
            selection
            search
            className="form-control dropdown-currency"
            options={props.currencies}
            value={props.currencyValue}
            placeholder="Add More Currencies"
            onChange={props.handleChangeCurrency}
          />
          <Button
            type="submit"
            className="dark-blue-button"
            onClick={props.onAddNewCurrency}
          >
            Submit
          </Button>
        </Button>
      ) : (
        <button
          className="btn btn-primary btn-add-currency"
          onClick={props.onChangeInputCurrency}>
          Add Currency
        </button>
        // <Button
        //   fluid
        //   icon
        //   labelPosition="left"
        //   style={styles.buttonAddMore}
        //   onClick={props.onChangeInputCurrency}
        // >
        //   <Icon name="plus" />
        //   Add More Currency
        // </Button>
      )
    }
  </div>
);

export default AddCurrency;