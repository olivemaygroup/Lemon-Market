
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import CottageIcon from '@mui/icons-material/Cottage';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import ConstructionIcon from '@mui/icons-material/Construction';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import PhoneIcon from '@mui/icons-material/Phone';


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

  let IconComponent;

  switch (metricName) {
    case "Cleanliness":
      IconComponent = CleanHandsIcon;
      break;
    case "Amenities":
      IconComponent = LocalConvenienceStoreIcon;
      break;
    case "Maintenance":
      IconComponent = ConstructionIcon;
      break;
    case "Value For Money":
      IconComponent = SavingsIcon;
      break;
    case "Deposit Handling":
      IconComponent = AccountBalanceWalletIcon;
      break;
    case "Landlord Responsiveness":
      IconComponent = PhoneIcon;
      break;
  };

  return (
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
        icon={React.createElement(IconComponent, { fontSize: "inherit" })}
        emptyIcon={React.createElement(IconComponent, { fontSize: "inherit" })}
      />
    </Box>
  );
};