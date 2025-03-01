interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return <div className="max-w-content mx-auto my-10 w-full px-4 md:px-10">{children}</div>;
};
