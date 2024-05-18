import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StackSection = () => {
    const theme = useTheme();

    return (
    <Box sx={{ mt: 3, width: 250, display:'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', gap: 3}}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        // sx={{ flexWrap: 'wrap' }}
        alignItems={'center'}
      >
        <Item>
          <Box sx={{ width: 200 }}>
            <ElectricBoltIcon fontSize="large" /> Item 1
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 300, color: theme.palette.text.secondary }} variant="body1">Electronic</Typography>
          </Box>
        </Item>
        <Item>
          <Box sx={{ width: 200 }}>
            <ElectricBoltIcon fontSize="large" /> Item 1
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 300, color: theme.palette.text.secondary }} variant="body1">Electronic</Typography>
          </Box>
        </Item>
        <Item>
          <Box sx={{ width: 200 }}>
            <ElectricBoltIcon fontSize="large" /> Item 1
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 300, color: theme.palette.text.secondary }} variant="body1">Electronic</Typography>
          </Box>
        </Item>
      </Stack>
    </Box>
  );
};

export default StackSection;
