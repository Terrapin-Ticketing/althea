import React from 'react';
import moment from 'moment';
import { Link } from 'react-router'

let TransferEntry = ({transfer, index}) => {
  console.log('transfer: ', transfer);
  if (transfer) {
    return (
      <tr key={index}>
        <td>
          {moment(transfer.date).format('M/D/YY h:mm a')}
        </td>
        <td>
          <Link to={`event/${transfer.eventId._id}/ticket/${transfer.ticketId._id}`}>{transfer.ticketId._id}</Link>
        </td>
        <td>
          {transfer.ticketId.type}
        </td>
        <td>
          {transfer.ticketId.barcode}
        </td>
        <td>
          {transfer.recieverId.email}
        </td>
        <td>
          {transfer.senderId.email}
        </td>
      </tr>
    );
  }
}

export default TransferEntry;
