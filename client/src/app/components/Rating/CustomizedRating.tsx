
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
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
  ratingState: number,
  ratingSetter: Function,
  metricName: string,
}

export default function CustomizedRating({ ratingState, ratingSetter, metricName }: CustomizedRatingProps) {

  return (
    <div>
      <Box sx={{ '& > legend': { mt: 2 } }}>
        <StyledRating
          name={`customized-color-${metricName}`} 
          value={ratingState} 
          onChange={(event, newValue) => {
            if (newValue !== null) {
              ratingSetter(newValue);
            }
          }}
          getLabelText={(value: number) => `${value} House${value !== 1 ? 's' : ''}`}
          precision={1}
          icon={<CottageIcon style={{ fontSize: 50 }} />}
          emptyIcon={<CottageIcon style={{ fontSize: 50 }} />}
          />
      </Box>
    </div>
  );
};