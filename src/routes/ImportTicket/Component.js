import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { Loading, Error, Image, ProgressBar, Text, Icon } from 'components/elements'
import LoginForm from 'components/forms/Login'
import SignupForm from 'components/forms/Signup'

import Welcome from './Components/Welcome'
import Onboarding from './Components/Onboarding'
import BarcodeInput from './Components/BarcodeInput'
import BarcodeSuccess from './Components/BarcodeSuccess'
import Success from './Components/Success'
import TicketCard from './Components/TicketCard'

const ImportTicket = ({ event, error, loading, step, goToStep, ticket }) =>
    (loading) ? <Loading />
    : (error) ? <Error error={error} />
    : <Wrapper fullScreen flexColumn centered>
      <ProgressBar style={{ marginBottom: '1rem' }} progress={step / 4} />
        <Wrapper centered flexColumn className='col-md-8 col-lg-8'>
          <Image src={require('assets/tt-logo-grn.svg')} style={{ flex: 0 }} />
          {(ticket) && <TicketCard event={event} ticket={ticket} />}
          <Wrapper centered flexColumn style={{ flex: 4 }} className='col-md-10'>
            {(step === 'welcome') && <Welcome event={event} nextStep={() => goToStep('onboarding')} />}
            {(step === 'onboarding') && <Onboarding event={event} nextStep={() => goToStep('barcode_input')} />}
            {(step === 'barcode_input') && <BarcodeInput event={event} nextStep={() => goToStep('barcode_success')} />}
            {(step === 'barcode_success') && <BarcodeSuccess event={event} nextStep={goToStep} ticket={ticket} />}
            {(step === 'login') && <LoginForm event={event} afterLogin={() => goToStep('success')} />}
            {(step === 'signup') && <SignupForm event={event} afterSignup={() => goToStep('success')} />}
            {(step === 'success') && <Success event={event} />}
          </Wrapper>
            {/* eslint-disable max-len */}
            {/* {(step === 'welcome') && <Link to={`/event/${event.urlSafe}`}><Icon name='fa-arrow-left' /> Go back to {event.name}</Link>} */}
            {(step === 'onboarding') && <Wrapper paddingFull fontMed style={{ flex: 0 }}><Text green cursorPointer onClick={() => goToStep('welcome')}><Icon name='fa-arrow-left' /> Go back to {event.name}</Text></Wrapper>}
            {(step === 'barcode_input') && <Wrapper paddingFull fontMed style={{ flex: 0 }}><Text onClick={() => goToStep('onboarding')}><Icon name='fa-arrow-left' /> Go back to {event.name}</Text></Wrapper>}
            {(step === 'login') &&<Wrapper paddingFull fontMed style={{ flex: 0 }}> <Text onClick={() => goToStep('onboarding')}><Icon name='fa-arrow-left' /> Go back to {event.name}</Text></Wrapper>}
            {(step === 'signup') && <Wrapper paddingFull fontMed style={{ flex: 0 }}><Text onClick={() => goToStep('onboarding')}><Icon name='fa-arrow-left' /> Go back to {event.name}</Text></Wrapper>}
            {/* eslint-enable max-len */}
          </Wrapper>
      </Wrapper>

ImportTicket.propTypes = {
  event: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  goToStep: PropTypes.func,
  step: PropTypes.string,
  ticket: PropTypes.object
}

export default ImportTicket
