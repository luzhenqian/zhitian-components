import { css } from "lit";

export const inputStyles = css`
  input {
    border-color: transparent;
    background-color: rgb(79, 85, 102);
    color: var(--ztcdt-text-color);
    outline: none;
    margin: 4px;
    width: 80px;
    border-radius: 2px;
    border-width: 2px;
    padding: 2px 4px;
  }
  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    appearance: none;
  }

  input:hover,
  input:focus {
    border-color: var(--ztcdt-primary-color);
  }

  input:focus {
    box-shadow: 0 0 6px 0 var(--ztcdt-primary-color);
  }
`;

export const textAreaStyles = css`
  textarea {
    padding: 4px 6px;
    margin: 10px;
    outline: none;
    color: var(--ztcdt-middle-text-color);
    background: transparent;
    border-radius: var(--ztcdt-radius);
    border: 2px solid var(--ztcdt-middle-text-color);
  }
  textarea:hover,
  textarea:focus {
    border: 2px solid var(--ztcdt-primary-color);
  }
`;

export const iconStyles = css`
  .icon {
    width: 1rem;
    height: 1rem;
    fill: var(--ztcdt-primary-color);
  }
`;
