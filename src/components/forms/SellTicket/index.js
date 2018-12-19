import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { getDigitsFromValue, toCurrency } from 'components/forms/utils'
import { FormWrapper, TextInput, SelectInput, PriceInput } from 'components/elements/form'
import { Button, Loading, Text, H4 } from 'components/elements'
import { Alert, Wrapper } from 'components/blocks'

let SellTicketForm = ({ handleSubmit, sellTicket, unsellTicket, submitting, error, ticket, formValues } ) =>
    <FormWrapper onSubmit={handleSubmit((values) => sellTicket(ticket, values))}>
      {error && <Alert danger>{error}</Alert>}
      <H4>Listing Information</H4>
      <Field name='price' label='Price' component={PriceInput} disabled={submitting} normalize={getDigitsFromValue} format={toCurrency} />
      <H4>Payment Information</H4>
      <Field name='payoutMethod' label='Payout Method' component={SelectInput} options={['PayPal', 'Venmo']} disabled={submitting} />
      <Field name='payoutValue' label={`${formValues && formValues.payoutMethod} Username`} component={TextInput} disabled={submitting} />
      {(submitting) && <Wrapper paddingFull><Text subtle small center>Hang tight, listing ticket...</Text></Wrapper>}
      {(submitting) && <Loading />}
      {(!submitting) && <Button type='submit' primary disabled={submitting} style={{ marginBottom: 10 }}>{(!ticket.isForSale) ? 'List Ticket for Sale' : 'Edit Ticket Listing'}</Button>}
      {(ticket.isForSale && !submitting) && <Button type='button' action={()=> unsellTicket(ticket)} dangerOutline disabled={submitting}>Remove Ticket Listing</Button>}
    </FormWrapper>

SellTicketForm.propTypes = {
  ticket: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.object,
  sellTicket: PropTypes.func.isRequired,
  unsellTicket: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.string,
  formValues: PropTypes.object
}


SellTicketForm = reduxForm({
  form: 'sellTicketForm'
})(SellTicketForm)

const mapStateToProps = (state, props) => {
  return {
    formValues: state.form.sellTicketForm && state.form.sellTicketForm.values,
    initialValues: {
      payoutMethod: state.auth.user.payout.default || 'paypal',
      payoutValue: state.auth.user.payout[state.auth.user.payout.default],
      price: props.ticket.price || 0
    }
  }
}

SellTicketForm = connect(mapStateToProps, require('./modules'))(SellTicketForm)

export default SellTicketForm
