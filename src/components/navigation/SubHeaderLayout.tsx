interface SubHeaderLayoutProps {
  mbOnly?: boolean;
  children: React.ReactNode;
}

const SubHeaderLayout = ({ mbOnly, children }: SubHeaderLayoutProps) => {
  if (mbOnly) {
    return (
      <aside className="sticky top-0 z-40 block border-b-2 border-border bg-card lg:hidden">
        <div className="mx-auto w-full max-w-screen-lg px-4">
          <div className="flex h-10 items-center justify-between">{children}</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sticky top-0 z-40 block border-b-2 border-border bg-card">
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="flex h-10 items-center justify-between">{children}</div>
      </div>
    </aside>
  );
};

export default SubHeaderLayout;
