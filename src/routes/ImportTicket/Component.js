import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Error } from 'components/blocks'
import { Loading, ProgressBar } from 'components/elements'

import Welcome from './Components/Welcome'
import BarcodeInput from './Components/BarcodeInput'
import SignIn from './Components/SignIn'
import Activate from './Components/Activate'
import ActivateSuccess from './Components/ActivateSuccess'

const ImportTicket = ({ event, error, loading, step, goToStep, tickets, user, activateTicket, barcode, activateTicketLoading, logout }) =>
    (loading) ? <Loading />
    : (error && step === 1) ? <Error error={error} />
      : (step === 1) ? (
        <WelcomeWrapper>
          <Welcome key={step} event={event} nextStep={() => goToStep(step + 1)} />
        </WelcomeWrapper>
      ) : (
      <PageWrapper>
          <ProgressBar progress={step} style={{ marginTop: 25 }} />
          <ImportWrapper>
              {(step === 2) && <SignIn key={step} event={event} nextStep={goToStep} user={user} step={step} logout={logout} />}
              {(step === 3) && <BarcodeInput key={step} event={event} nextStep={() => goToStep(step + 1)} />}
              {(step === 4) && <Activate loading={activateTicketLoading} key={step} event={event} user={user} tickets={tickets} error={error}
                                                activateTicket={(selectedTicketIds) => activateTicket({ urlSafe: event.urlSafe, selectedTicketIds, barcode, email: user.email })} />}
              {(step === 5) && <ActivateSuccess key={step} tickets={tickets} activateAnotherTicket={() => goToStep(1)} />}
              {/* eslint-disable max-len */}
              {/* {(step === 1) && <Wrapper><Link style={{ cursor: 'pointer' }} to={`/event/${event.urlSafe}`}><Icon name='fa-arrow-left' /><Text redCancel</Link></Wrapper>} */}
              {/* {(step === 2) && <Wrapper><Link style={{ cursor: 'pointer' }} to={`/event/${event.urlSafe}`}><Icon name='fa-arrow-left' />Cancel Ticket Import</Link></Wrapper>} */}
              {/* {(step === 3) && <Wrapper><Link style={{ cursor: 'pointer' }} onClick={() => goToStep(step-1)}><Icon name='fa-arrow-left' />Import a different barcode</Link></Wrapper>} */}
              {/* {(step === 4) && <Wrapper><Link style={{ cursor: 'pointer' }} onClick={() => { logout(); goToStep(step-1)}}><Icon name='fa-arrow-left' />Sign in to a different account</Link></Wrapper>} */}
              {/* eslint-enable max-len */}
          </ImportWrapper>
      </PageWrapper>
      )

const WelcomeWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
  justify-self: stretch;
  height: 100%;
`;

const PageWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 150px auto;
`;

const ImportWrapper = styled.div`
  display: grid;
  justify-items: center;
  text-align: center;
  justify-self: stretch;
`;

ImportTicket.propTypes = {
  event: PropTypes.object.isRequired,
  activateTicket: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  goToStep: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  tickets: PropTypes.array,
  user: PropTypes.object,
  barcode: PropTypes.string,
  activateTicketLoading: PropTypes.bool,
  logout: PropTypes.func
}

export default ImportTicket
