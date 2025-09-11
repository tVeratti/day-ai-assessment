import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Root = styled.header`
  display: flex;
  padding: 1rem;
`;

export default function Header() {
  return (
    <Root>
      <Typography variant="h2">Weatherproof AI</Typography>
    </Root>
  );
}
