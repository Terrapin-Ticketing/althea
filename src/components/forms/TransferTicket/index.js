import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { FormWrapper, TextInput } from 'components/elements/form'
import { Button, Loading, Text } from 'components/elements'
import { Alert, Wrapper } from 'components/blocks'

let TransferTicketForm = ({ handleSubmit, transferTicket, submitting, error, ticket }) =>
    <FormWrapper onSubmit={handleSubmit((values) => transferTicket(values, ticket))}>
      {error && <Alert danger>{error}</Alert>}
      <Field name='firstName' label='First Name' component={TextInput} disabled={submitting} />
      <Field name='lastName' label='Last Name' component={TextInput} disabled={submitting} />
      <Field name='email' label='Email' component={TextInput} disabled={submitting} />
      {(!submitting) && <Button type='submit' className='btn-primary' disabled={submitting}>Transfer Ticket</Button>}
      {(submitting) && <Wrapper paddingFull><Text subtle small center>Hang tight, transfering ticket...</Text></Wrapper>}
      {(submitting) && <Loading />}
    </FormWrapper>

TransferTicketForm.propTypes = {
  ticket: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  transferTicket: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = () => {
  return {}
}

TransferTicketForm = connect(mapStateToProps, require('./modules'))(TransferTicketForm)

TransferTicketForm = reduxForm({
  form: 'transferTicketForm'
})(TransferTicketForm)

export default TransferTicketForm
