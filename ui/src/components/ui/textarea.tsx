import * as React from "react";

import { cn } from "@/lib/utils";
import { type KeyboardEventHandler, useCallback, useEffect, useImperativeHandle, useRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoSize?: boolean;
  submitOnEnter?: boolean;
}

interface ExtraProps {
  rows?: number;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
}

const ENTER_KEY_CODE = "Enter";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoSize = false, submitOnEnter = false, ...props }, outerRef) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(outerRef, () => innerRef.current as HTMLTextAreaElement, []);

    // biome-ignore lint/correctness/useExhaustiveDependencies: this seems to be the most optimal way to update on value change but also on initial value and value changes that were not caused by user input
    useEffect(() => {
      if (!autoSize || !innerRef.current) return;
      innerRef.current.style.height = "0px";
      innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
    }, [props.value]);

    const handleSubmitOnEnter = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
      (e, ...args) => {
        if (e.key === ENTER_KEY_CODE && !e.shiftKey) {
          if (!e.repeat) {
            e.currentTarget.form?.requestSubmit();
          }

          e.preventDefault();
        }

        if (typeof props.onKeyDown === "function") {
          props.onKeyDown.apply(this, [e, ...args]);
        }
      },
      [props.onKeyDown],
    );

    const extraProps: ExtraProps = {};

    if (autoSize && !("rows" in props)) {
      extraProps.rows = 1;
    }

    if (submitOnEnter) {
      extraProps.onKeyDown = handleSubmitOnEnter;
    }

    return (
      <textarea
        className={cn(
          "overflow-hidden flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          !autoSize && "min-h-[80px]",
          className,
        )}
        {...props}
        {...extraProps}
        ref={innerRef}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
