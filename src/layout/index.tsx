import styled from "@emotion/styled";
import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Main = styled.div`
  flex: 1;
  padding: 2rem;
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <Root>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Root>
  );
}
