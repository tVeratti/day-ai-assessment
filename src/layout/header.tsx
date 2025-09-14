import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Root = styled.header`
  display: flex;
  padding: 1rem;
  background: #083743;
`;

const LogoAnchor = styled.a`
  color: #049dbf;
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
