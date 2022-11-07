import { ValidationErrors } from "@angular/forms";

export type LeafPasswordForgottenState = "SendPassword" | "PasswordChange";

export type LeafPasswordForgotten_SendPasswordChangeError = {
  email: ValidationErrors;
};

export type LeafPasswordForgotten_PasswordChangeError = {
  passwordChangeKey: ValidationErrors;
  password: ValidationErrors;
};

export type LeafPasswordForgottenError = {
  state: LeafPasswordForgottenState;
} & (
  | LeafPasswordForgotten_SendPasswordChangeError
  | LeafPasswordForgotten_PasswordChangeError
);
