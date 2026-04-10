import { cn } from '@/lib/utils';

const toneClasses = {
  cyan: 'border-pixelCyan bg-[#12192b]',
  pink: 'border-pixelPink bg-[#151021]',
  yellow: 'border-pixelGold bg-[#19150f]',
  slate: 'border-steel bg-panel',
  green: 'border-pixelGreen bg-[#102014]'
} as const;

type Tone = keyof typeof toneClasses;

export function PixelPanel({ children, tone = 'slate', className = '' }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return <div className={cn('border-4 shadow-pixel', toneClasses[tone], className)}>{children}</div>;
}

export function PixelButton({ label, tone = 'cyan', href, onClick }: { label: string; tone?: Exclude<Tone, 'green'>; href?: string; onClick?: () => void }) {
  const buttonTones = {
    cyan: 'border-pixelCyan bg-[#0f2430] text-pixelCyan',
    pink: 'border-pixelPink bg-[#21112a] text-pixelPink',
    yellow: 'border-pixelGold bg-[#2b2413] text-pixelGold',
    slate: 'border-steel bg-panel text-parchment'
  } as const;

  const classes = cn(
    'inline-flex items-center gap-2 border-2 px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] shadow-pixelSm transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
    buttonTones[tone],
    'font-[family-name:var(--font-pixel)]'
  );

  return href ? <a href={href} className={classes}>{label}</a> : <button type="button" onClick={onClick} className={classes}>{label}</button>;
}

export function StatusLight({ color = 'cyan', blink = false }: { color?: 'cyan' | 'pink' | 'yellow' | 'green'; blink?: boolean }) {
  const colors = {
    cyan: 'bg-pixelCyan shadow-[0_0_0_2px_#173a46]',
    pink: 'bg-pixelPink shadow-[0_0_0_2px_#3f1435]',
    yellow: 'bg-pixelGold shadow-[0_0_0_2px_#4f3d14]',
    green: 'bg-pixelGreen shadow-[0_0_0_2px_#17301d]'
  } as const;

  return <span className={cn('inline-block h-3 w-3', colors[color], blink && 'animate-pulse')} />;
}

export function PixelLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.16em]', className)}>{children}</div>;
}
