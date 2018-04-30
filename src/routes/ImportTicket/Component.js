import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { Wrapper } from 'components/blocks'
import { Loading, Error, Image, Button, ProgressBar } from 'components/elements'
import Welcome from './Welcome'
import LoginForm from 'components/forms/Login'
import SignupForm from 'components/forms/Signup'

const ImportTicket = ({ event, error, loading, step, nextStep, previousStep, afterLogin }) =>
    (loading) ? <Loading />
    : (error) ? <Error error={error} />
    : <Wrapper fullScreen flexColumn>
      <ProgressBar progress={step / 4} />
      <Wrapper centered className='row'>
        <Wrapper className='col-md-6 col-lg-5'>
          <Image src={require('assets/tt-logo-grn.svg')} style={{ marginBottom: 25, padding: 25 }} />
          <Image src={event.imageUrl} />
          <Wrapper borderFull borderRadius centered flexColumn paddingFull>
            {(step === 1) && <Welcome event={event} nextStep={nextStep} />}
            {(step === 2) && <LoginForm event={event} afterLogin={afterLogin} />}
            {(step === 3) && <LoginForm event={event} afterLogin={afterLogin} />}
            {(step === 4) && <SignupForm event={event} />}
          </Wrapper>
          {(step === 1) ? <Wrapper paddingHeight fontMed><Link to={`/event/${event.urlSafe}`}> <i className='fas fa-arrow-left' /> Go back to Terrapin Ticketing</Link></Wrapper>
          : <Wrapper paddingHeight fontMed><Button action={previousStep}><i className='fas fa-arrow-left' /> Last step</Button></Wrapper>}
        </Wrapper>
      </Wrapper>
    </Wrapper>

ImportTicket.propTypes = {
  event: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  step: PropTypes.number,
  afterLogin: PropTypes.func
}

export default ImportTicket
