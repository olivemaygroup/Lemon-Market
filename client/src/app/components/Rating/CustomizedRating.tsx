
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import CottageIcon from '@mui/icons-material/Cottage';

interface CustomizedRatingProps {
  ratingState: number,
  ratingSetter: React.Dispatch<React.SetStateAction<number>>,
  metricName: string,
  onRating: Function
};

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#FAE301',
  },
  '& .MuiRating-iconHover': {
    color: '#FAE301',
  }
});


export default function CustomizedRating({ ratingState, ratingSetter, onRating }: CustomizedRatingProps) {

  return (
    <div>
      <Box sx={{ '& > legend': { mt: 2 } }}>
        <StyledRating
          value={ratingState} 
          onChange={(event, newValue) => {
            if (newValue !== null) {
              ratingSetter(newValue);
            }
          }}
          getLabelText={(value: number) => `${value} House${value !== 1 ? 's' : ''}`}
          precision={1}
          icon={<CottageIcon style={{ fontSize: 45 }} />}
          emptyIcon={<CottageIcon style={{ fontSize: 45 }} />}
          />
      </Box>
    </div>
  );
};