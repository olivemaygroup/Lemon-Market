import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import CottageIcon from '@mui/icons-material/Cottage';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FAE301',
  },
  '& .MuiRating-iconHover': {
    color: '#FAE301',
  },
});

export default function CustomizedRating({ rating, setRating }) {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      {/* <Typography component="legend">Rate ...</Typography> */}
      <StyledRating
        name="customized-color"
        defaultValue={0}
        getLabelText={(rating: number) => `${rating} Heart${rating !== 1 ? 's' : ''}`}
        precision={1}
        icon={<CottageIcon fontSize="inherit" />}
        emptyIcon={<CottageIcon fontSize="inherit" />}
      />
    </Box>
  );
};