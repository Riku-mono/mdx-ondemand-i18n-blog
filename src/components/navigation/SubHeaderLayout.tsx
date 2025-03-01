import clsx from 'clsx';

interface SubHeaderLayoutProps {
  mbOnly?: boolean;
  children: React.ReactNode;
}

const SubHeaderLayout = ({ mbOnly, children }: SubHeaderLayoutProps) => {
  return (
    <aside
      className={clsx(
        `bg-card/80 sticky top-0 z-40 block border-b backdrop-blur-sm ${mbOnly ? 'lg:hidden' : ''}`
      )}
    >
      <div className="mx-auto w-full max-w-screen-lg px-4">
        <div className="flex h-10 items-center justify-between">{children}</div>
      </div>
    </aside>
  );
};

export default SubHeaderLayout;
