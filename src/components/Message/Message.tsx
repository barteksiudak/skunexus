import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import { IMessageReducerState } from '../../reducers/message';

import './message.css';

export default function Message() {
  const { message, color } = useSelector(
    (state: { message: IMessageReducerState }) => state.message
  );

  return (
    <div className="message-container">
      <Alert color={color} isOpen={!!message}>
        {message}
      </Alert>
    </div>
  );
}
