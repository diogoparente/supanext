import { PropsWithChildren } from "react";

export const PageCenter = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex-grow w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
};
