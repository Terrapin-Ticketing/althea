/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'

import { FormWrapper, TextInput } from 'components/elements/form'
import { Button, Loading } from 'components/elements'
import { Alert } from 'components/blocks'

let BarcodeForm = ({ handleSubmit, submitting, event, afterValidation, validateTicket, error }) => {
  return (<FormWrapper onSubmit={handleSubmit((values) => validateTicket(event.urlSafe, values, afterValidation))}>
    {error && <Alert danger>{error}</Alert>}
    <Field name='barcode' label='Barcode' component={TextInput} />
    {(!submitting) && <Button type='submit' className='btn-primary' disabled={submitting}>Continue</Button>}
    {(submitting) && <Loading />}
  </FormWrapper>)
}

BarcodeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  validateTicket: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  values: PropTypes.object,
  afterValidation: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  error: PropTypes.string
}

BarcodeForm = connect(() => { return { } }, require('./modules'))(BarcodeForm)

BarcodeForm = reduxForm({
  form: 'barcode',
  // validate
})(BarcodeForm)

export default BarcodeForm