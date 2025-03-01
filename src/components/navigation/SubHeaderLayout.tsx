interface SubHeaderLayoutProps {
  mbOnly?: boolean;
  children: React.ReactNode;
}

const SubHeaderLayout = ({ mbOnly, children }: SubHeaderLayoutProps) => {
  if (mbOnly) {
    return (
      <aside className="bg-card sticky top-0 z-40 block border-b-2 lg:hidden">
        <div className="mx-auto w-full max-w-(--breakpoint-lg) px-4">
          <div className="flex h-10 items-center justify-between">{children}</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="bg-card sticky top-0 z-40 block border-b-2">
      <div className="max-w-wide mx-auto w-full px-4">
        <div className="flex h-10 items-center justify-between">{children}</div>
      </div>
    </aside>
  );
};

export default SubHeaderLayout;
