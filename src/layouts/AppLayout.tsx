import { ReactNode } from "react";

type AppLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};
const AppLayout = ({ header, children }: AppLayoutProps) => {
  return (
    <div className="grid h-full grid-rows-[42px_auto] overflow-auto bg-slate-900 text-white">
      {header}
      {children}
    </div>
  );
};

export default AppLayout;
