interface TwoGridLayoutProps {
  children: React.ReactNode;
}

const TwoGridLayout = ({ children }: TwoGridLayoutProps) => {
  return <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">{children}</div>;
};

export default TwoGridLayout;
