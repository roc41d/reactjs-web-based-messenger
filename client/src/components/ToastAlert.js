import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const ToastAlert = ({ trigger }) => {
  return trigger ? (
    <Snackbar
      open={Boolean(trigger)}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="error" variant="filled">
        { trigger }
      </Alert>
    </Snackbar>
  ) : '';
};

export default ToastAlert;