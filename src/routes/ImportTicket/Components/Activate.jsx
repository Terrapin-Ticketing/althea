import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Wrapper, Alert } from 'components/blocks'
import { Text, Button, Loading } from 'components/elements'

import { spacing13 } from 'styles/spacing'
import { base200, base600, gray100, gray600, white } from 'styles/colors';

const ConfirmActivation = ({ activateTicket, user, tickets, event, error, loading }) => {
  const [selectedTicketIds, setSelectedTicketIds] = useState([]);
  console.log('selectedTicketIds: ', selectedTicketIds);

  useEffect(() => {
    console.log('change: ', selectedTicketIds)
  }, [selectedTicketIds])


  return (
    <Wrapper style={{ width: spacing13 }}>
      <div><Text gray600 fontSize6 fontWeight600 center>Select Tickets</Text></div>
      <Text gray400 fontSize2 fontWeight200 center>Signed in as <strong>{user.email}</strong></Text>
      <Wrapper fullWidth borderFull borderRadius boxShadow padding5x5 margin5x0 style={{ background: white }}>
      {tickets.map((ticket, index) => {
        return (
          <TicketItem
          key={`${ticket.id}-${selectedTicketIds.includes(ticket.id)}`}
          isSelected={selectedTicketIds.includes(ticket.id)}
          onClick={() => {
            if(selectedTicketIds.includes(ticket.id)) {
              const newSelectedTickets = selectedTicketIds.filter((selectedTicketId) => selectedTicketId !== ticket.id );
              setSelectedTicketIds(newSelectedTickets);
            } else {
              const newArray = selectedTicketIds.concat([ticket.id])
              setSelectedTicketIds(newArray)
            }
          }}>
            <TicketItemLeft>
            <TicketClassName>{ticket.ticket_class_name}</TicketClassName>
            <TicketBarcode>{ticket.barcodes[0].barcode}</TicketBarcode>
            </TicketItemLeft>
            <TicketItemRight>
              <Checkbox>
                <HTMLCheckbox id={`ticket-${index}`} type='checkbox' />
                <CSSCheckbox
                htmlFor={`ticket-${index}`}
                isSelected={selectedTicketIds.includes(ticket.id)}
                ></CSSCheckbox>
              </Checkbox>
            </TicketItemRight>
          </TicketItem>
        )
      })}
      <Wrapper padding2x2>
          {(error) && <Alert danger>{error}</Alert>}
          {loading && <Text gray400 fontSize2 fontWeight200 center>Adding ticket to <strong>{user.email}'s wallet</strong></Text>}
        <Wrapper paddingFull>
          {loading ?  <Loading />
          : <Button primaryGreen padding3x3
          disabled={selectedTicketIds.length < 1}
          action={() => {
            const selectedTickets = selectedTicketIds.map((id) => tickets.find(t => t.id == id))
            const barcodes = selectedTickets.map(s => s.barcodes[0].barcode)
            activateTicket(barcodes)
          }}>
          {selectedTicketIds.length < 1 ? 'Select Tickets' : 'Add Ticket to Wallet' }
          </Button>}
        </Wrapper>
      </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

const TicketItem = styled.div`
  background: ${({ isSelected }) => isSelected ? base200 : ''};
  display: flex;
  justify-content: space-around;
  border: 1px solid #f0f1f2;
  box-shadow: 0 1px 3px hsla(0,0%,0%,.2);
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;
  cursor: pointer;

  &:active {
    outline: 0;
    background: ${gray100};
  }

  &:focus {
    outline: 0;
  }
`;

const TicketItemLeft = styled.div`

`;

const TicketItemRight = styled.div``;

const TicketClassName = styled.div``;

const TicketBarcode = styled.div``;

const Checkbox = styled.div``;

const HTMLCheckbox = styled.input`
  opacity: 0;
`;

//border-color: hsl(139,50%,45%);

const CSSCheckbox = styled.label`
  position: relative;

  &::before {
    position: absolute;
    top: 3px;

    content: "";
    display: inline-block;

    height: 16px;
    width: 16px;

    border: 1px solid;
    border-radius: 50%;

    color: ${({ isSelected }) => isSelected ? base600 : gray600};
  }
  ${({ isSelected }) => isSelected && `
    &::after {
      position: absolute;
      left: 4px;
      top: 7px;

      content: "";
      display: inline-block;
      height: 6px;
      width: 9px;
      border-left: 2px solid;
      border-bottom: 2px solid;

      transform: rotate(-45deg);
      color: ${base600};
    }
  ` }
`;


ConfirmActivation.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  activateTicket: PropTypes.func.isRequired,
  tickets: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
}

export default ConfirmActivation
