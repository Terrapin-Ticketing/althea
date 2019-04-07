import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Error } from 'components/blocks'
import { Loading, ProgressBar, Image } from 'components/elements'

import Welcome from './Components/Welcome'
import BarcodeInput from './Components/BarcodeInput'
import SignIn from './Components/SignIn'
import Activate from './Components/Activate'
import ActivateSuccess from './Components/ActivateSuccess'

import { spacing5, spacing13, spacing16 } from 'styles/spacing'

const ImportTicket = ({ event, error, loading, step, goToStep, tickets, user, activateTicket, barcode, activateTicketLoading, logout }) =>
    (loading) ? <Loading />
    : (error && step === 1) ? <Error error={error} />
      : (step === 1) ? (
        <WelcomeWrapper>
          <Welcome key={step} event={event} nextStep={() => goToStep(step + 1)} />
        </WelcomeWrapper>
      ) : (step > 1 && step < 6) ? (
        <PageWrapper>
          <EventImageWrapper>
            <Image src={event.imageUrl} style={{ width: '100%', maxHeight: '100%' }} />
          </EventImageWrapper>
          {(step > 1 && step < 5) && <ProgressBar progress={step} style={{ marginTop: 25 }} /> }
          <ImportWrapper>
              {(step === 2) && <SignIn 
                                key={step} 
                                event={event} 
                                nextStep={goToStep} 
                                user={user} 
                                step={step} 
                                logout={logout} />}
              {(step === 3) && <BarcodeInput 
                                key={step} 
                                event={event} 
                                nextStep={() => goToStep(step + 1)} />}
              {(step === 4) && <Activate 
                                loading={activateTicketLoading} 
                                key={step} 
                                event={event} 
                                user={user} 
                                tickets={tickets} 
                                error={error}
                                nextStep={() => goToStep(step + 1)}
                                activateTicket={(selectedTicketIds) => activateTicket({ urlSafe: event.urlSafe, selectedTicketIds, barcode, email: user.email })} />}
              {(step === 5) && <ActivateSuccess 
                                key={step} 
                                tickets={tickets} 
                                event={event}/>}
          </ImportWrapper>
      </PageWrapper>
      ) : (<Error error={'error!'} />)

const WelcomeWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
  justify-self: stretch;
  height: 100%;
`;

// const SuccessWrapper = styled.div`
//   display: grid;
//   align-items: center;
//   justify-items: center;
//   text-align: center;
//   justify-self: stretch;
//   height: 100%;
// `;
const EventImageWrapper = styled.div`
    max-width: ${spacing13};
    margin: 0 auto;
`;

const PageWrapper = styled.div`
  display: grid;
  height: 100%;
  max-width: ${spacing16}
  width: 100%;
  margin: 0 auto;
  padding: ${spacing5}
  grid-template-rows: 182px 150px auto;
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
