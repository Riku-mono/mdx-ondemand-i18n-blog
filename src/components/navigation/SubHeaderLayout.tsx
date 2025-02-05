interface SubHeaderLayoutProps {
  mbOnly?: boolean;
  children: React.ReactNode;
}

const SubHeaderLayout = ({ mbOnly, children }: SubHeaderLayoutProps) => {
  if (mbOnly) {
    return (
      <aside className="sticky top-0 z-40 block bg-zinc-400 md:hidden dark:bg-zinc-900">
        <div className="w-full px-4">
          <div className="flex h-10 items-center justify-between">{children}</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sticky top-0 z-40 block bg-zinc-400 dark:bg-zinc-900">
      <div className="w-full px-4">
        <div className="flex h-10 items-center justify-between">{children}</div>
      </div>
    </aside>
  );
};

export default SubHeaderLayout;
