import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 14px;
  border-radius: 6px;

  background: rgba(247, 247, 248, 0.872);
  color: #000;
  padding: 0.5rem 1rem;
  font-weight: 400;
  line-height: 130.3%; /* 18.242px */
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

interface buttonProps {
  value: string;
  className?: string;
  type?: any;
  isLoading?: any;
  onclick?: any;
  style?: object
}

const Button: React.FC<buttonProps> = ({
  value,
  className,
  type,
  isLoading,
  onclick,
  style,
}) => {
  return (
    <>
      <StyledButton
        value={value}
        type={type}
        className={className}
        disabled={isLoading}
        onClick={onclick}
        style={style}
      >
        {isLoading ? "Loading..." : value}
      </StyledButton>
    </>
  );
};

export default Button;
