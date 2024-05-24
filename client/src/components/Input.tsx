import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  width: 100%
  border: 3px solid pink;
`;

interface InputProps {
  readonly?: any;
  type: string;
  placeholder?: string;
  value?: string;
  defaultvalue?: string;
  name: string;
  classname?: string;
  id?: string;
  onChange?: any;
  required?: boolean;
  autocomplete?: string;
  minlength?: number;
  list?: string;
}

const Input: React.FC<InputProps> = ({
  readonly,
  type,
  placeholder,
  value,
  defaultvalue,
  name,
  classname,
  onChange,
  autocomplete,
  required,
  minlength,
  list,
}) => {
  return (
    <>
      <StyledInput
        readOnly={readonly}
        type={type}
        placeholder={placeholder}
        value={value || ""}
        defaultValue={defaultvalue}
        name={name}
        className={classname}
        onChange={onChange}
        required={required}
        autoComplete={autocomplete}
        minLength={minlength}
        list={list}
      />
    </>
  );
};

export default Input;
