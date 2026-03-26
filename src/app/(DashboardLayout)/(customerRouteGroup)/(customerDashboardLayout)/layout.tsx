export default function PatientDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      Customer Dashboard Layout
      {children}
    </>
  );
}