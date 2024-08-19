import type { ReactNode } from "react";

export const Main = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <main>
      <div>
        <h1>{title}</h1>
      </div>
      {children}
    </main>
  );
};
