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

interface ReadonlyRatingProps {
  rating: number | undefined;
}

export default function ReadonlyRating({ rating }: ReadonlyRatingProps) {
  return (
    <Box sx={{ '& > legend': { mt: 2 } }} >
      <StyledRating
        data-testid='readonly-rating'
        name={`rating`} 
        value={rating} 
        getLabelText={(value: number) => `${value}`}
        precision={1}
        icon={<CottageIcon fontSize="inherit" />}
        emptyIcon={<CottageIcon fontSize="inherit" />}
        readOnly={true}
      />
    </Box>
  );
};