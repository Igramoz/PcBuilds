import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissibleExample({ErrorHeader, ErrorBody}) {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{ErrorHeader}</Alert.Heading>
          <p>
            {ErrorBody}
          </p>
        </Alert>
      );
    }
  }
  
export default AlertDismissibleExample;