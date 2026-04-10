import { PixelLabel } from '@/components/pixel-ui';

export function SectionHeading({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return (
    <div>
      <PixelLabel className="text-pixelCyan">{kicker}</PixelLabel>
      <h1 className="mt-3 font-[family-name:var(--font-pixel)] text-lg uppercase leading-[1.5] md:text-3xl">{title}</h1>
      {description ? <p className="mt-4 max-w-3xl text-sm uppercase tracking-[0.08em] text-[#d9d4b8]">{description}</p> : null}
    </div>
  );
}
