import styled from "@emotion/styled";
import { Typography } from "@mui/material";

interface IntroductionProps {
  isFirstQuery: boolean;
}

const Root = styled.div``;

const INITIAL_INTRODUCTION_HEADER: string = "Get Started!";
const REPEAT_INTRODUCTION_HEADER: string = "Go Again!";

export default function Introduction({ isFirstQuery }: IntroductionProps) {
  return (
    <Root>
      <Typography variant="h3" component="h1">
        {isFirstQuery
          ? INITIAL_INTRODUCTION_HEADER
          : REPEAT_INTRODUCTION_HEADER}
      </Typography>
      <Typography variant="h5" sx={{ opacity: 0.8 }}>
        Describe your location, then receive weather-appropriate attire
        recommendations for the next seven days based on your location.
      </Typography>
    </Root>
  );
}
