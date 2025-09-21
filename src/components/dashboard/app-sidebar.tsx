
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  FileText,
  LifeBuoy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'text-sky-500' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics', color: 'text-orange-500' },
  { href: '/dashboard/tourists', icon: Users, label: 'Tourists', color: 'text-green-500' },
  { href: '/dashboard/firs', icon: FileText, label: 'Filed FIRs', color: 'text-rose-500' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings', color: 'text-blue-500' },
  { href: '/dashboard/support', icon: LifeBuoy, label: 'Support', color: 'text-amber-500' },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-card sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image src="/logo.jpeg" alt="VIYO Logo" width={20} height={20} className="transition-all group-hover:scale-110" />
          <span className="sr-only">VIYO</span>
        </Link>
        <TooltipProvider>
        {navItems.map((item) => (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className={cn("h-5 w-5", pathname !== item.href && item.color)} />
                <span className="sr-only">{item.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
