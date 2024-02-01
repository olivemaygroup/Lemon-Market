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

interface CustomizedRatingProps {
  TOPIC: string;
  rating: number;
  setRating: Function
}

// Apply TypeScript typings to function component props
export default function CustomizedRating({ TOPIC, rating, setRating }: CustomizedRatingProps) {
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <StyledRating
        name={`customized-color-${TOPIC}`} 
        value={rating} 
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setRating(newValue);
          }
        }}
        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={1}
        icon={<CottageIcon fontSize="inherit" />}
        emptyIcon={<CottageIcon fontSize="inherit" />}
      />
    </Box>
  );
};