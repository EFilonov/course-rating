import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { DetailsModalProps } from './DetailsModal.props';


const DetailsModal = React.forwardRef<HTMLDivElement, DetailsModalProps>(
  ({ open = true, onClose }, ref) => (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300, // выше layout
      }}
    >
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          borderRadius: 2,
          m: 2,
          width: 'fit-content',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          '[data-theme="dark"] &': {
            bgcolor: 'var(--primary)',
          },
        }}
      >
        <Typography id="server-modal-title" variant="h6" component="h2" sx={{fontSize: 'clamp(12px, 4vw, 16px)'}}>
          Переход на страницу провайдера курсов!!!
        </Typography>
        <Typography id="server-modal-description" 
        sx={{ pt: 2, color: 'green', fontSize: 'clamp(10px, 3vw, 14px)', textAlign: 'right', mt: 2,
          '[data-theme="dark"] &': {
            color: '#4aff00',
          },
         }}>
          Клик на оверлее вне области модального окна - для закрытия...
        </Typography>
      </Box>
    </Modal>
  )
);

export default DetailsModal;