import { forwardRef, useImperativeHandle, useRef } from "react";

// export default function Input({ id, type, title }) {
const Input = forwardRef(({ id, type, title }, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      get() {
        return inputRef.current.value;
      },
      set(value) {
        inputRef.current.value = value;
      },
      select() {
        inputRef.current.focus();
      },
    };
  });
  return (
    <>
      <label htmlFor={id}>{title}</label>
      <input type={type} id={id} ref={inputRef} />
    </>
  );
});
// }

export default Input;
