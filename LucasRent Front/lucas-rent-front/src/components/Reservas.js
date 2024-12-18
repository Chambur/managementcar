import { Box, Typography } from '@mui/material';

function Reservas() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Reservas</Typography>
      <Typography variant="body1">No hay reservas disponibles en este momento.</Typography>
      {/* Aquí puedes agregar más lógica para mostrar reservas cuando estén disponibles */}
    </Box>
  );
}

export default Reservas; 