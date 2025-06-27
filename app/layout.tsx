import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LocationProvider } from '@/providers/LocationProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PlaceHive - Your Relocation Companion',
  description: 'Find accommodation, restaurants, transport routes and manage your budget while relocating to a new city.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LocationProvider>
            {children}
            <Toaster />
          </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}