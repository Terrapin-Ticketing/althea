import React from 'react'
import PropTypes from 'prop-types'

import Header from 'layouts/Header'
import Footer from 'layouts/Footer'
import { Wrapper } from 'components/blocks'

const PageLayout = ({ children, location }) =>
  <Wrapper style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', background: '#f9f9f9' }}>
    <Header location={location} />
    <main style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
      {children}
    </main>
    <Footer location={location} />
  </Wrapper>

PageLayout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
}

export default PageLayout
