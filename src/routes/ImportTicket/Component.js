import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { Wrapper, Error } from 'components/blocks'
import { Loading, Image, ProgressBar, Icon } from 'components/elements'

import Welcome from './Components/Welcome'
import BarcodeInput from './Components/BarcodeInput'
import BarcodeSuccess from './Components/BarcodeSuccess'
import ConfirmActivate from './Components/ConfirmActivate'

const ImportTicket = ({ event, error, loading, step, goToStep, ticket, user, activateTicket, barcode }) =>
    (loading) ? <Loading />
    : (error && step === 1) ? <Error error={error} />
    : <Wrapper fullScreen flexColumn alignCenter>
      <ProgressBar style={{ marginBottom: '1rem' }} progress={(step === 2) ? '5' : (step === 3) ? '50' : (step === 4) ? '90' : '0'} />
        <Wrapper alignCenter flexColumn className='col-md-8 col-lg-8'>
          <Image src={require('assets/tt-logo-grn.svg')} paddingFull style={{ flex: 0, paddingBottom: 25 }} />
            <Wrapper alignCenter flexColumn style={{ flex: 4 }} className='col-md-10 col-lg-7'>
              {(step === 1) && <Welcome key={step} event={event} nextStep={() => goToStep(step + 1)} />}
              {(step === 2) && <BarcodeInput key={step} event={event} nextStep={() => goToStep(step + 1)} />}
              {(step === 3) && <BarcodeSuccess key={step} event={event} nextStep={goToStep} ticket={ticket} user={user} step={step} />}
              {(step === 4) && <ConfirmActivate key={step} event={event} user={user} ticket={ticket} error={error} activateTicket={() => activateTicket({ urlSafe: event.urlSafe, barcode, email: user.email })} />}
            </Wrapper>
              {/* eslint-disable max-len */}
              {(step === 1) && <Wrapper paddingFull fontMed style={{ flex: 0 }}><Link style={{ cursor: 'pointer' }} to={`/event/${event.urlSafe}`}><Icon name='fa-arrow-left' />Cancel Ticket Import</Link></Wrapper>}
              {(step === 2) && <Wrapper paddingFull fontMed style={{ flex: 0 }}><Link style={{ cursor: 'pointer' }} to={`/event/${event.urlSafe}`}><Icon name='fa-arrow-left' />Cancel Ticket Import</Link></Wrapper>}
              {(step === 3) && <Wrapper paddingFull fontMed style={{ flex: 0 }}><Link style={{ cursor: 'pointer' }} onClick={() => goToStep(step-1)}><Icon name='fa-arrow-left' />Import a different barcode</Link></Wrapper>}
              {(step === 4) && <Wrapper paddingFull fontMed style={{ flex: 0 }}><Link style={{ cursor: 'pointer' }} onClick={() => goToStep(step-1)}><Icon name='fa-arrow-left' />Sign in to a different account</Link></Wrapper>}
              {/* eslint-enable max-len */}
            </Wrapper>
      </Wrapper>

ImportTicket.propTypes = {
  event: PropTypes.object.isRequired,
  activateTicket: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  goToStep: PropTypes.func.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  ticket: PropTypes.object,
  user: PropTypes.object,
  barcode: PropTypes.string
}

export default ImportTicket
