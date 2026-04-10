import type { Metadata } from 'next';
import { Press_Start_2P, VT323 } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/app-shell';

const pixel = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel'
});

const mono = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Project Love Rocky',
  description: 'Retro mission console for U.S. launches, aerospace news, tracker views, and jobs.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${pixel.variable} ${mono.variable} bg-ink text-parchment font-mono`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
