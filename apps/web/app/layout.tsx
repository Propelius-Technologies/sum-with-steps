import '../styles/global.css'
import {Toaster} from "components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='min-h-screen mx-auto flex items-center'>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
