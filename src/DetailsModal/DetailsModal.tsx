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
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="server-modal-title" variant="h6" component="h2">
          Server-side modal
        </Typography>
        <Typography id="server-modal-description" sx={{ pt: 2 }}>
          If you disable JavaScript, you will still see me.
        </Typography>
      </Box>
    </Modal>
  )
);

export default DetailsModal;