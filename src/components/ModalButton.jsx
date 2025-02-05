import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const ModalButton = (props) => {
  const navigation = useNavigate();

  return (
    <Stack spacing={2} direction='row'>
      <Button variant='text' onClick={props.close}>
        취소
      </Button>
      <Button
        variant='contained'
        onClick={() => {
          navigation(`/detail/${props.data.stock_code}`, {
            state: {
              stock_code: props.data.stock_code,
              stock_name: props.data.stock_name,
            },
          });
        }}
      >
        {' '}
        이동
      </Button>
    </Stack>
  );
};

export default ModalButton;
