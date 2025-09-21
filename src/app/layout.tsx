import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider';
import { MapSettingsProvider } from '@/contexts/map-settings-context';
import { FIRProvider } from '@/contexts/fir-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'VIYO',
  description: 'Smart Tourist Safety Monitoring & Incident Response System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MapSettingsProvider>
            <FIRProvider>
              {children}
            </FIRProvider>
          </MapSettingsProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
