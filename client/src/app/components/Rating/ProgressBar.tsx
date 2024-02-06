import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface LinearDeterminateInterface {
  cleanliness: number,
  maintenance: number,
  value_for_money: number,
  deposit_handling: number,
  amenities: number,
  landlord_responsiveness: number
}

export const LinearDeterminate: React.FC<LinearDeterminateInterface> = ({
  cleanliness,
  maintenance,
  value_for_money,
  deposit_handling,
  amenities,
  landlord_responsiveness
  }) => {

  const [progress, setProgress] = React.useState(0);

  return (
    <Box sx={{ width: '8.5%', height: '5%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}