import { css } from "lit";

export const inputStyles = css`
  input {
    padding: 4px 6px;
    margin: 10px;
    outline: none;
    color: var(--ztcdt-middle-text-color);
    background: transparent;
    border-radius: var(--ztcdt-radius);
    border: 2px solid var(--ztcdt-middle-text-color);
  }
  input:hover,
  input:focus {
    border: 2px solid var(--ztcdt-primary-color);
  }
`;
