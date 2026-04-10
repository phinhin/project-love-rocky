import Link from 'next/link';
import { StatusLight } from '@/components/pixel-ui';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Launches', href: '/launches' },
  { label: 'Tracker', href: '/tracker' },
  { label: 'News', href: '/news' },
  { label: 'Jobs', href: '/jobs' }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b-4 border-pixelCyan bg-ink/95 backdrop-blur-sm shadow-[0_0_0_2px_#1a2238]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.24em] text-pixelCyan">Retro Mission Console</div>
            <Link href="/" className="mt-2 block font-[family-name:var(--font-pixel)] text-xl uppercase text-pixelPink flicker md:text-2xl">
              Project Love Rocky
            </Link>
          </div>
          <nav className="hidden gap-3 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 border-2 border-steel bg-[#12192b] px-3 py-2 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.14em] text-parchment shadow-pixelSm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              >
                <StatusLight color={index % 2 === 0 ? 'cyan' : 'pink'} blink />
                {item.label}
              </Link>
            ))}
          </nav>
          </div>
          <nav className="flex gap-3 overflow-x-auto pb-1 md:hidden">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 border-2 border-steel bg-[#12192b] px-3 py-2 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.14em] text-parchment shadow-pixelSm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              >
                <StatusLight color={index % 2 === 0 ? 'cyan' : 'pink'} blink />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-6 md:pt-14">{children}</main>
    </div>
  );
}
