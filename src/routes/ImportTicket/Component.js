import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { Wrapper, Error } from 'components/blocks'
import { Loading, Image, ProgressBar, Icon } from 'components/elements'

import Welcome from './Components/Welcome'
import BarcodeInput from './Components/BarcodeInput'
import BarcodeSuccess from './Components/BarcodeSuccess'
import Activate from './Components/Activate'
import ActivateSuccess from './Components/ActivateSuccess'

const ImportTicket = ({ event, error, loading, step, goToStep, ticket, user, activateTicket, barcode, activateTicketLoading, logout }) =>
    (loading) ? <Loading />
    : (error && step === 1) ? <Error error={error} />
    : <Wrapper flexBox fullScreen flexColumn alignCenter>
      <ProgressBar style={{ marginBottom: '1rem' }} progress={(step === 2) ? '5' : (step === 3) ? '50' : (step === 4) ? '90' : (step === 5) ? '100' : '0'} />
        <Wrapper flexBox alignCenter flexColumn paddingHeight className='col-md-8 col-lg-8'>
          <Image src={require('assets/tt-logo-grn.svg')} paddingFull style={{ flex: 0, paddingBottom: 25 }} />
          <Wrapper flexBox flexColumn spaceBetween textCenter className='col-md-12 col-lg-12'>
            <Wrapper alignCenter flexColumn flexBox>
              {(step === 1) && <Welcome key={step} event={event} nextStep={() => goToStep(step + 1)} />}
              {(step === 2) && <BarcodeInput key={step} event={event} nextStep={() => (user) ? goToStep(step + 2) : goToStep(step + 1)} />}
              {(step === 3) && <BarcodeSuccess key={step} event={event} nextStep={goToStep} ticket={ticket} user={user} step={step} />}
              {(step === 4) && <Activate loading={activateTicketLoading} key={step} event={event} user={user} ticket={ticket} error={error} 
                                                activateTicket={() => activateTicket({ urlSafe: event.urlSafe, barcode, email: user.email })} />}
              {(step === 5) && <ActivateSuccess key={step} ticket={ticket} activateAnotherTicket={() => goToStep(1)} />}
            </Wrapper>
              {/* eslint-disable max-len */}
              {(step === 1) && <Wrapper fontMed><Link style={{ cursor: 'pointer' }} to={`/event/${event.urlSafe}`}><Icon name='fa-arrow-left' />Cancel Ticket Import</Link></Wrapper>}
              {(step === 2) && <Wrapper fontMed><Link style={{ cursor: 'pointer' }} to={`/event/${event.urlSafe}`}><Icon name='fa-arrow-left' />Cancel Ticket Import</Link></Wrapper>}
              {(step === 3) && <Wrapper fontMed><Link style={{ cursor: 'pointer' }} onClick={() => goToStep(step-1)}><Icon name='fa-arrow-left' />Import a different barcode</Link></Wrapper>}
              {(step === 4) && <Wrapper fontMed><Link style={{ cursor: 'pointer' }} onClick={() => { logout(); goToStep(step-1)}}><Icon name='fa-arrow-left' />Sign in to a different account</Link></Wrapper>}
              {/* eslint-enable max-len */}
            </Wrapper>
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
  barcode: PropTypes.string,
  activateTicketLoading: PropTypes.bool,
  logout: PropTypes.func
}

export default ImportTicket
