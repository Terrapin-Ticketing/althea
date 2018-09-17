import React from 'react';
import moment from 'moment';

let TicketEntry = ({ticket, index}) => {
  console.log('ticket: ', ticket);
  if (ticket) {
    return (
      <tr key={index}>
        <td>
          {moment(ticket.date).format('M/D/YY h:mm a')}
        </td>
        <td>
          {ticket.type}
        </td>
        <td>
          {ticket.barcode}
        </td>
        <td>
          {ticket.user.email}
        </td>
        <td>
          {ticket.user.firstName}
        </td>
        <td>
          {ticket.user.lastName}
        </td>
      </tr>
    );
  }
};

export default TicketEntry;
