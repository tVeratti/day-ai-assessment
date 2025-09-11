import styled from "@emotion/styled";
import { Typography } from "@mui/material";

interface IntroductionProps {
  isFirstQuery: boolean;
}

const Root = styled.div`
  margin: 1rem 0;
`;

const INITIAL_INTRODUCTION_HEADER: string = "Get Started!";
const REPEAT_INTRODUCTION_HEADER: string = "Go Again!";

export default function Introduction({ isFirstQuery }: IntroductionProps) {
  return (
    <Root>
      <Typography variant="h2" component="h1">
        {isFirstQuery
          ? INITIAL_INTRODUCTION_HEADER
          : REPEAT_INTRODUCTION_HEADER}
      </Typography>
      <Typography variant="body1">
        Receive weather-appropriate attire recommendations for the next seven
        days based on your location.
      </Typography>
    </Root>
  );
}
