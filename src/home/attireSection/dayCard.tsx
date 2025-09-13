import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fade,
  Typography,
  useTheme,
} from "@mui/material";

export interface DayCardProps {
  shortDescription: string;
  idealAttire: string;
  date: string;
  index: number;
}

const FADE_IN_TIME: number = 500;

const Root = styled.div`
  width: 20rem;
`;

export default function DayCard({
  shortDescription,
  idealAttire,
  date,
  index,
}: DayCardProps) {
  const theme = useTheme();
  let formattedDateParts = new Date(date)
    .toLocaleTimeString("en-us", {
      weekday: "long",
      month: "2-digit",
      day: "numeric",
    })
    .split(", ");

  // Remove the "Time" portion of the formatted date
  const formattedDate = formattedDateParts.slice(0, 2).join(" - ");

  return (
    <Fade in={true} timeout={index * FADE_IN_TIME}>
      <Root>
        <Card variant="outlined">
          <CardHeader title={formattedDate} subheader={shortDescription} />
          <CardContent>
            <Box
              sx={{
                padding: "1rem",
                borderRadius: theme.shape.borderRadius,
                background: theme.palette.secondary.main,
              }}
            >
              <Typography variant="body1" sx={{ flex: 1 }}>
                {idealAttire}
              </Typography>
            </Box>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Root>
    </Fade>
  );
}
