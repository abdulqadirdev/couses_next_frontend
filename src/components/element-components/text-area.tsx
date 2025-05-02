import { forwardRef } from "react";

const TextArea = forwardRef(({ className, ...props }: any, ref) => {
  return (
    <textarea
      ref={ref}
      className={`resize-none ${className}`}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
