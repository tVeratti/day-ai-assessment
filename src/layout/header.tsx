import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Root = styled.header`
  display: flex;
  padding: 1rem;
`;

const LogoAnchor = styled.a`
  color: #333;
  text-decoration: none;
`;

export default function Header() {
  return (
    <Root>
      <LogoAnchor href="/">
        <Typography variant="h4" component="span">
          Weatherproof AI
        </Typography>
      </LogoAnchor>
    </Root>
  );
}
