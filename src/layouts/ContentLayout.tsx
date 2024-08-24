import { ReactNode } from "react";

type ContentLayoutProps = {
  first: ReactNode;
  second: ReactNode;
};
const ContentLayout = ({ first, second }: ContentLayoutProps) => {
  return (
    <div className="grid h-full w-full grid-rows-[auto_auto] gap-4 p-4 md:grid-cols-[1fr_1fr] md:grid-rows-1">
      {first}
      {second}
    </div>
  );
};

export default ContentLayout;
