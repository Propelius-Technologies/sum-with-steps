import '../styles/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='min-h-screen mx-auto flex items-center'>{children}</body>
    </html>
  );
}
