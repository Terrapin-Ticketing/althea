import React from 'react'
import { reduxForm, Field } from 'redux-form';


const onSubmit = async (sellTicket, afterSell, ticket, values) => {
  await sellTicket(ticket, values);
  afterSell();
};

const validate = (data) => {
  let errors = {};
  if (!data.payoutValue) {
    errors.payoutValue = 'Required';
  }
  // if (data.price > 11000) {
  //   errors.price = 'You cannot post your ticket for more than face value';
  // }
  return errors;
};

// functions for currency input
export const toCurrency = (value = 0, name) => {
  const digits = getDigitsFromValue(value.toString());
  const digitsWithPadding = padDigits(digits);
  return addDecimalToNumber(digitsWithPadding);
};

export const getDigitsFromValue = (value = '') =>{
  return value.replace(/(-(?!\d))|[^0-9|-]/g, '') || '';
};

const padDigits = digits => {
  const desiredLength = 3;
  const actualLength = digits.length;

  if (actualLength >= desiredLength) {
    return digits;
  }

  const amountToAdd = desiredLength - actualLength;
  const padding = '0'.repeat(amountToAdd);

  return padding + digits;
};

const removeLeadingZeros = number => number.replace(/^0+([0-9]+)/, '$1');

const addDecimalToNumber = number => {
  const centsStartingPosition = number.length - 2;
  const dollars = removeLeadingZeros(
    number.substring(0, centsStartingPosition)
  );
  const cents = number.substring(centsStartingPosition);
  return `$${dollars}.${cents}`;
};

const RenderInput = ({input, meta, ...rest}) =>
  <div className="row">
    <div className="input-field col s12">
      <label className={(input.value !== '') && 'active'} data-error={meta.error}>{rest.label}</label>
      <input {...input} type='text' className='validate' />
      <span className="helper-text">{rest.helperText}</span>
    </div>
  </div>

const RenderSelect = ({input, meta, ...rest}) =>
  <div className="row">
    <div className="col s12">
      <label>{rest.label}</label>
      <select {...input} value={input.value || 'none'} style={{display: 'block'}}>
        {rest.children}
      </select>
    </div>
  </div>

const RenderPrice = ({input, meta, ...rest}) =>
  <div className="row">
    <div className="input-field col s12">
      <span style={{color: '#CC3333', fontSize: '80%'}}>{meta.error}</span>
      <label className='active' data-error={meta.error}>{rest.label}</label>
      <input {...input} id={rest.label} type='text' />
    </div>
  </div>

const RenderSwitch = ({input, meta, ...rest}) =>
  <div className="row">
    <div className="input-field col s12">
      <h3 style={{display: 'inline'}}>{rest.label}</h3>
      <div className="switch secondary-content">
        <label>
          <input
            {...input}
            checked={input.value}
            type="checkbox"
          />
          <span className="lever"></span>
        </label>
      </div>
    </div>
  </div>


let SellTicketForm = ({ ticket, handleSubmit, afterSell, cancelSell, submitting, sellTicket, sellFormData }) =>
  <form onSubmit= {handleSubmit((values) => onSubmit(sellTicket, afterSell, ticket, values))}>
    <h3 style={{marginBottom: 10}}>How would you like to get paid?</h3>
    <Field name='payoutMethod' label='Payout Method' component={RenderSelect}>
      <option value='paypal'>PayPal</option>
      <option value='venmo'>Venmo</option>
    </Field>
    <Field name='payoutValue' helperText='Money will be sent to this account when your ticket is sold'
      label={`${sellFormData && sellFormData.payoutMethod.charAt(0).toUpperCase() + sellFormData.payoutMethod.substr(1)} Username`}
      component={RenderInput} />
    <Field name='price' label='Price' normalize={getDigitsFromValue} format={toCurrency} component={RenderPrice} />
    <Field name='isForSale' label='For Sale' component={RenderSwitch} />
    <div className="modal-actions right-align">
      <a className="close modal-action" style={{cursor: 'pointer'}}
         onClick={() => cancelSell()}>Cancel</a>
      <button className="save modal-action" disabled={submitting} type="submit">Mark for Sale</button>
    </div>
  </form>;

SellTicketForm = reduxForm({
  form: 'sellTicketForm',
  validate
})(SellTicketForm);

export default SellTicketForm;
