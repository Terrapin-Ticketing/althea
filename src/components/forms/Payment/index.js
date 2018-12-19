import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';

import { FormWrapper, TextInput } from 'components/elements/form'
import { Button, Loading, Text } from 'components/elements'
import { Alert, Wrapper } from 'components/blocks'

let PaymentForm = ({ handleSubmit, buyTicket, submitting, error, ticket, stripe, reserveToken }) =>
    <FormWrapper onSubmit={handleSubmit((values) => {
      console.log('icketkkkk: ', values, ticket, reserveToken, stripe)
      buyTicket(values, ticket, reserveToken, stripe)})}>
      {error && <Alert danger>{error}</Alert>}
      <Wrapper className='row'>
        <Field name='firstName' className='col-6' label='First Name' component={TextInput} disabled={submitting} />
        <Field name='lastName' className='col-6' label='Last Name' component={TextInput} disabled={submitting} />
      </Wrapper>
      <Field name='email' label='Email' component={TextInput} disabled={submitting} />
      <Wrapper className='form-group'><CardNumberElement className='form-control' /></Wrapper>
      <Wrapper className='row'>
        <Wrapper className='form-group col-6'><CardExpiryElement className='form-control' /></Wrapper>
        <Wrapper className='form-group col-6'><CardCVCElement className='form-control' /></Wrapper>
      </Wrapper>


      {(!submitting) && <Button type='submit' className='btn-primary' disabled={submitting}>Purchase Ticket</Button>}
      {(submitting) && <Wrapper paddingFull><Text subtle small center>Hang tight, transfering ticket...</Text></Wrapper>}
      {(submitting) && <Loading />}
    </FormWrapper>

PaymentForm.propTypes = {
  ticket: PropTypes.object.isRequired,
  stripe: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  buyTicket: PropTypes.func.isRequired,
  reserveToken: PropTypes.string.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = () => {
  return {}
}

PaymentForm = connect(mapStateToProps, require('./modules'))(PaymentForm)

PaymentForm = reduxForm({
  form: 'paymentForm'
})(PaymentForm)

export default injectStripe(PaymentForm)
