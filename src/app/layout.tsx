import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider';
import { MapSettingsProvider } from '@/contexts/map-settings-context';
import { FIRProvider } from '@/contexts/fir-context';
import AppSidebar from '@/components/dashboard/app-sidebar';
import Header from '@/components/dashboard/header';

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
                <div className="flex min-h-screen w-full flex-col bg-muted/40">
                  <AppSidebar />
                  <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <Header />
                    <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                      {children}
                    </main>
                  </div>
                </div>
            </FIRProvider>
          </MapSettingsProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
