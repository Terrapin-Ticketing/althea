import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'

import NavItem from '../NavItem'

describe('NavItem Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NavItem href='help' label='Help' />)
    expect(wrapper).toMatchSnapshot()
  })
})
