import styled, { css } from "styled-components";
import { default as ButtonUI } from "@material-ui/core/Button";
import { default as TextFieldUI } from "@material-ui/core/TextField";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const FormContainer = styled.div`
  margin-top: 16px;
  width: 400;
  padding: 64px;

  border-radius: 8px;

  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export const TextField = styled(TextFieldUI)`
  ${css`
    && {
      margin-top: 16px;
    }
  `}
`;

export const Button = styled(ButtonUI)`
  ${css`
    && {
      margin-top: 16px;
    }
  `}
`;
