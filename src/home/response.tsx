import styled from "@emotion/styled";

interface ResponseProps {
  text?: string;
  /** Text will stream in, indicate if it's still loading... */
  isLoading: boolean;
}

interface RootProps {
  isLoading: boolean;
}

const Root = styled.div<RootProps>`
  color: ${(props) => (props.isLoading ? "red" : "black")};

  ${(props) =>
    props.isLoading
      ? "animation: loadingAnimation 1s infinite alternate;"
      : ""};

  @keyframes loadingAnimation {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default function Response({ text, isLoading }: ResponseProps) {
  return <Root isLoading={isLoading}>{text}</Root>;
}
