export default function ArchiveIndexLayout({
  children,
  reader,
}: LayoutProps<'/archive'>) {
  return (
    <>
      {children}
      {reader}
    </>
  );
}
