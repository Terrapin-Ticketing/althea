import React from 'react';
import { reduxForm, Field } from 'redux-form';

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
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email addresss';
  }
  return errors;
};

const RenderInput = ({ input, meta: {error, touched}, label, id }) =>
  <div className="input-field">
    <label style={{ pointerEvents: 'none' }} htmlFor={id}>{label}</label>
    <input {...input} type='text' className="validate" />
    {touched && error && <span style={{color: '#c33'}}>{error}</span>}
  </div>;

const onSubmit = async (transferTicket, afterTransfer, ticket, transferToUser) => {
  await transferTicket(ticket, transferToUser);
  afterTransfer();
};


let TransferTicketForm = ({transferTicket, values, cancelTransfer, afterTransfer, ticket, transferToUser, handleSubmit, submitting}) =>
  <div>
    <div className="terrapin-red lighten-1 valign-wrapper" style={{padding: 15, marginBottom: 15}}>
      <i className="material-icons tiny" style={{marginRight: 10}}>warning</i><small>Transfering your ticket will void the current barcode and generate a unique one for the new owner. This process cannot be undone.</small>
    </div>
    <form onSubmit={handleSubmit(() => onSubmit(transferTicket, afterTransfer, ticket, transferToUser))}>
      <div className="row">
        <div className="col s6">
          <Field name='firstName' label="Recipient's First Name" component={RenderInput} />
        </div>
        <div className="col s6">
          <Field name='lastName' label="Recipient's Last Name" component={RenderInput} />
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <Field name='email' label="Recipient's Email" component={RenderInput} />
        </div>
      </div>
      <div className="modal-actions right-align">
        {(submitting) && (
          <div className="modal-actions right-align">
            <div className="spinner-container">
              <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-green-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {(!submitting) && (
          <div className="modal-actions right-align">
            <a className="close modal-action" onClick={() => cancelTransfer()}>Cancel</a>
            <button className="save modal-action" disabled={submitting} type="submit">Transfer</button>
          </div>
        )}
      </div>
    </form>
  </div>;


TransferTicketForm = reduxForm({
  form: 'ticketTransferForm',
  validate
})(TransferTicketForm);

export default TransferTicketForm;
