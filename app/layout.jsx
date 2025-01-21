import { Poppins } from 'next/font/google';
import { AuthProvider } from './context/AuthContext';
import "./globals.css";

const poppins = Poppins({
  weight: ['100', '200','300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
         <AuthProvider>
         {children}
         </AuthProvider>
      </body>
    </html>
  );
}
