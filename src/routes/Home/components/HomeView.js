import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome to Terrapin Ticket!</h4>
    <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
    <p>Create An Account</p>
    <p>Get Ether from faucet</p>
    <p>Create an event</p>
    <p>View a ticket</p>
    <p>Redeem a ticket</p>
  </div>
)

export default HomeView
