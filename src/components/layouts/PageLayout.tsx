interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return <div className="mx-auto my-10 w-full max-w-screen-xl px-4 md:px-10">{children}</div>;
};
