import React from 'react';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => {
    return <textarea ref={ref} className="w-full p-2 border rounded" {...props} />;
  }
);

Textarea.displayName = 'Textarea';
