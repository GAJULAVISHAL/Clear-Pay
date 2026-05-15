import { type JSX } from "react";

export function Card({
  className,
  title,
  children
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className={`${className} p-4`}
      
    >
      <h2 className="font-bold">
        {title} 
      </h2>
      {children}
    </div>
  );
}
