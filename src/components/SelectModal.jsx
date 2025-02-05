import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import ModalButton from './ModalButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// function ChildModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button onClick={handleOpen}>Open Child Modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='child-modal-title'
//         aria-describedby='child-modal-description'
//       >
//         <Box sx={{ ...style, width: 200 }}>
//           <h2 id='child-modal-title'>Text in a child modal</h2>
//           <p id='child-modal-description'>
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//           </p>
//           <Button onClick={handleClose}>Close Child Modal</Button>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

const SelectModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{
          border: 'none',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          style={{ fontSize: '1.3rem' }}
        />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby='parent-modal-title'
      >
        <Box
          sx={{
            ...style,
            width: 600,
            color: '#000',
            backgroundColor: '#fff',
          }}
        >
          <h2 id='parent-modal-title' style={{ fontSize: '1.6rem' }}>
            <b
              style={{
                color: 'var(--color-2)',
                fontWeight: 'bold',
                fontSize: '2rem',
              }}
            >
              '{props.stockName}'
            </b>{' '}
            종목을 선택하시겠습니까?
          </h2>
          <p id='parent-modal-description'>
            이동을 선택하면 분석 페이지로 이동합니다.
          </p>

          <ModalButton text={'이동'} data={props.data} close={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default SelectModal;
