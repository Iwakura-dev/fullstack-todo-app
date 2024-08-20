import type { ReactNode } from "react";

export const Main = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <main className="flex flex-col justify-center items-center gap-5 py-6">
      <div>
        <h1 className="text-2xl">{title}</h1>
      </div>
      {children}
    </main>
  );
};
