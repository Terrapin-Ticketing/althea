import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Error } from 'components/blocks'
import { Loading, ProgressBar } from 'components/elements'

import Welcome from './Components/Welcome'
import BarcodeInput from './Components/BarcodeInput'
import SignIn from './Components/SignIn'
import Activate from './Components/Activate'
import ActivateSuccess from './Components/ActivateSuccess'

const ImportTicket = ({ event, error, loading, step, goToStep, ticket, user, activateTicket, barcode, activateTicketLoading, logout }) =>
    (loading) ? <Loading />
    : (error && step === 1) ? <Error error={error} />
      :
        <Wrapper style={{ height: '100%' }} centered fullScreen flexColumn flexBox textCenter>
          <Wrapper flexBox flexColumn spaceBetween textCenter width15 style={{ marginTop: '-250px' }}>
            {(step >= 2) && <ProgressBar progress={step} />}
            <Wrapper alignCenter flexColumn flexBox>
              {(step === 1) && <Welcome key={step} event={event} nextStep={() => goToStep(step + 1)} />}
            {(step === 2) && <SignIn key={step} event={event} nextStep={goToStep} ticket={ticket} user={user} step={step} logout={logout} />}
              {(step === 3) && <BarcodeInput key={step} event={event} nextStep={() => (user) ? goToStep(step + 2) : goToStep(step + 1)} />}
              {(step === 4) && <Activate loading={activateTicketLoading} key={step} event={event} user={user} ticket={ticket} error={error} 
                                                activateTicket={() => activateTicket({ urlSafe: event.urlSafe, barcode, email: user.email })} />}
              {(step === 5) && <ActivateSuccess key={step} ticket={ticket} activateAnotherTicket={() => goToStep(1)} />}
            </Wrapper>
              {/* eslint-disable max-len */}
              {/* {(step === 1) && <Wrapper><Link style={{ cursor: 'pointer' }} to={`/event/${event.urlSafe}`}><Icon name='fa-arrow-left' /><Text redCancel</Link></Wrapper>} */}
              {/* {(step === 2) && <Wrapper><Link style={{ cursor: 'pointer' }} to={`/event/${event.urlSafe}`}><Icon name='fa-arrow-left' />Cancel Ticket Import</Link></Wrapper>} */}
              {/* {(step === 3) && <Wrapper><Link style={{ cursor: 'pointer' }} onClick={() => goToStep(step-1)}><Icon name='fa-arrow-left' />Import a different barcode</Link></Wrapper>} */}
              {/* {(step === 4) && <Wrapper><Link style={{ cursor: 'pointer' }} onClick={() => { logout(); goToStep(step-1)}}><Icon name='fa-arrow-left' />Sign in to a different account</Link></Wrapper>} */}
              {/* eslint-enable max-len */}
            </Wrapper>
        </Wrapper>

ImportTicket.propTypes = {
  event: PropTypes.object.isRequired,
  activateTicket: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  goToStep: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  ticket: PropTypes.object,
  user: PropTypes.object,
  barcode: PropTypes.string,
  activateTicketLoading: PropTypes.bool,
  logout: PropTypes.func
}

export default ImportTicket
