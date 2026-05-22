import { InputDto } from "@target/validations";

interface InputField<T> {
  value: T;
  valid: boolean;
  error: string | null;
}

export type InputState = { [K in keyof InputDto]: InputField<InputDto[K]> };

export interface Input {
  key: keyof InputDto;
  value: string | number;
}
