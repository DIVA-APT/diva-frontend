import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import SelectModal from '../SelectModal';

const StockHint = (props) => {
  const naviation = useNavigate();

  const handleButtonClick = () => {
    naviation(`/detail/${props.data.stock_code}`, {
      state: {
        stock_code: props.data.stock_code,
        stock_name: props.data.stock_name,
      },
    });
  };

  return (
    <div
      className='card-body py-3'
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '75%',
        margin: '0 auto',
        borderTop: '1px solid #d6dbd6',
        backgroundColor: 'white',
        ...props.style,
      }}
    >
      <strong
        className='d-inline-block'
        style={{ width: '30%', fontSize: '1rem', color: 'var(--color-2)' }}
      >
        {props.data.stock_name}
      </strong>
      <p
        className='text-muted m-0'
        style={{ fontWeight: '600', fontSize: '1rem' }}
      >
        KOSPI
      </p>
      <SelectModal
        stockName={props.data.stock_name}
        data={props.data}
        close={props.close}
      />
    </div>
  );
};

export default StockHint;
