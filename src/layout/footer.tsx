import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Root = styled.footer`
  padding: 1rem;
  color: #ffffff33;
  background: #222;
  text-align: center;
`;

export default function Footer() {
  return (
    <Root>
      <Typography>
        weatherproof ai prototype - &copy;2025 tatianaveratti@gmail.com - no
        rights reserved
      </Typography>
    </Root>
  );
}
