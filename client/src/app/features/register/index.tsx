import React from "react";

import * as S from "./styles";

export default function Register() {
  return (
    <S.Container>
      <S.FormContainer>
        <h1>Register</h1>
        <form>
          <div>
            <S.TextField required label="name" id="register-name" />
          </div>
          <div>
            <S.TextField required label="email" id="register-email" />
          </div>
          <div>
            <S.TextField required label="password" id="register-password" />
          </div>
          <div>
            <S.TextField
              required
              label="confirm password"
              id="register-confirm-password"
            />
          </div>
          <div>
            <S.Button variant="contained" color="primary">
              register
            </S.Button>
          </div>
        </form>
      </S.FormContainer>
    </S.Container>
  );
}
