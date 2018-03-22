import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { transferTicket } from './reducer';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};

const RenderInput = ({ input, meta, label, id }) =>
  <div className="input-field">
    <label htmlFor={id}>{label}</label>
    <input {...input} type='text' className="validate" />
  </div>;


let TicketTransferForm = ({handleSubmit, submitting}) =>
  <div>
    <div className="terrapin-red lighten-1 valign-wrapper" style={{padding: 15, marginBottom: 15}}>
      <i className="material-icons tiny" style={{marginRight: 10}}>warning</i><small>Transfering your ticket will void the current barcode and generate a unique one for the new owner. This process cannot be undone.</small>
    </div>
    <form onSubmit={handleSubmit(transferTicket)}>
      <div className="row">
        <div className="col s6">
          <Field name='firstName' label="Recipient's First Name" component={RenderInput} />
        </div>
        <div className="col s6">
          <Field name='lastName' label="Recipient's Last Name" component={RenderInput} />
        </div>
      </div>
      <div className="row">
        <Field name='email' label="Recipient's Email" component={RenderInput} />
      </div>
      <div className="modal-actions right-align">
        <a className="close modal-action" onClick={() => cancelTransfer()}>Cancel</a>
        <a className="save modal-action" disabled={submitting} type="submit">Transfer</a>
      </div>
    </form>
  </div>;


TicketTransferForm = reduxForm({
  form: 'ticketTransferForm',
  destroyOnUnmount: false,
  validate
})(TicketTransferForm);

export default TicketTransferForm;
