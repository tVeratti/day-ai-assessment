import styled from "@emotion/styled";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

export interface DayCardProps {
  shortDescription: string;
  idealAttire: string;
  date: string;
}

const Root = styled.div`
  width: 20rem;
`;

export default function DayCard({
  shortDescription,
  idealAttire,
  date,
}: DayCardProps) {
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
    <Root>
      <Card sx={{ height: "100%" }} variant="outlined">
        <CardHeader title={formattedDate} subheader={shortDescription} />
        <CardContent>
          <Typography variant="body2" sx={{ flex: 1 }}>
            {idealAttire}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Root>
  );
}
