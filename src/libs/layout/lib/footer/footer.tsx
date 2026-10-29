export const Footer = () => {
  return (
    <div className="py-1">
      <div className="fixed bottom-1 left-1 z-50 bg-background/80 px-2 py-1 shadow-xs text-[.5rem]">{import.meta.env.PACKAGE_VERSION}</div>
    </div>
  );
};
