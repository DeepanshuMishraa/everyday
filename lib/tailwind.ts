import type { AccentColor } from "@/lib/types";

export const container =
  "mx-auto w-full max-w-[1200px] px-[clamp(1rem,3vw,2rem)]";

export const heading = {
  h1: "m-0 text-balance font-display text-[clamp(3rem,7vw,5.75rem)] font-normal leading-[1.02] tracking-[-0.035em] max-[720px]:text-[clamp(2.3rem,9vw,3rem)] max-[480px]:text-[clamp(2.35rem,12vw,3.25rem)]",
  h2: "m-0 text-balance font-ui text-[clamp(1.5rem,3vw,2.35rem)] font-medium leading-[1.12] tracking-[-0.025em] max-[480px]:text-[clamp(1.85rem,9vw,2.6rem)]",
  h3: "m-0 text-balance font-ui text-base font-medium leading-[1.3] tracking-[-0.025em]",
} as const;

export const eyebrow =
  "mb-[1.1rem] flex items-center gap-2 font-ui text-xs font-bold tracking-[0.035em] text-ink-2";

const buttonBase =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent px-5 font-ui text-sm font-medium tracking-[-0.005em] no-underline shadow-button transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-spring hover:shadow-button-hover active:scale-[0.985] active:shadow-button-active motion-reduce:transition-none";

export const button = {
  primary: `${buttonBase} bg-ink text-bg hover:-translate-y-px hover:bg-button-primary-hover`,
  secondary: `${buttonBase} border-line-2 bg-surface text-ink hover:-translate-y-px hover:border-ink`,
} as const;

export const textLink =
  "text-[0.88rem] font-medium underline-offset-4 hover:text-ink-2";

export const tag =
  "inline-flex min-h-7 items-center rounded-sm border border-line bg-surface px-[9px] py-1 font-ui text-[0.72rem] font-medium leading-none text-ink-2 max-[480px]:min-h-[30px]";

export const accentClass: Record<AccentColor, string> = {
  ochre: "[--accent:var(--color-ochre)]",
  blue: "[--accent:var(--color-blue)]",
  red: "[--accent:var(--color-red)]",
  plum: "[--accent:var(--color-plum)]",
  green: "[--accent:var(--color-green)]",
  ink: "[--accent:var(--color-ink)]",
};

export const skillRow =
  "group/skill relative grid animate-row-in grid-cols-[40px_minmax(0,1fr)_minmax(220px,0.55fr)_auto] items-center gap-5 border-b border-line px-2 py-[26px] no-underline transition-colors duration-[140ms] before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-ink before:transition-transform before:duration-[220ms] before:ease-spring hover:bg-surface hover:before:scale-y-100 focus-visible:bg-surface focus-visible:outline-none focus-visible:before:scale-y-100 motion-reduce:animate-none max-[980px]:grid-cols-[32px_minmax(0,1fr)_auto] max-[980px]:gap-x-3.5 max-[980px]:gap-y-2.5 max-[480px]:grid-cols-[minmax(0,1fr)_auto] max-[480px]:px-1 max-[480px]:py-5";

export const skillNumber =
  "font-ui text-xs tabular-nums text-ink-3 max-[980px]:row-span-2 max-[980px]:self-start max-[980px]:pt-[3px] max-[480px]:hidden";

export const skillMain =
  "grid min-w-0 gap-2 max-[980px]:col-start-2 max-[980px]:row-start-1 max-[480px]:col-start-1 [&>strong]:font-ui [&>strong]:text-base [&>strong]:font-bold [&>strong]:leading-[1.4] [&>strong]:tracking-[-0.015em] [&>span]:max-w-[62ch] [&>span]:text-pretty [&>span]:text-sm [&>span]:leading-[1.6] [&>span]:text-ink-2";

export const skillTags =
  "flex flex-wrap items-center gap-1.5 font-ui max-[980px]:col-start-2 max-[980px]:col-end-4 max-[980px]:row-start-2 max-[480px]:col-start-1 max-[480px]:col-end-3";

export const skillArrow =
  "text-xs font-bold text-ink-2 transition-[transform,color] duration-[220ms] ease-spring group-hover/skill:translate-x-0.5 group-hover/skill:text-ink max-[980px]:col-start-3 max-[980px]:row-start-1 max-[980px]:self-start max-[980px]:pt-[3px] max-[480px]:col-start-2";

export const breadcrumb =
  "flex flex-wrap items-center gap-2 pt-5 font-ui text-xs font-medium text-ink-3 [&_a]:no-underline [&_a]:transition-colors [&_a]:duration-[140ms] [&_a:hover]:text-ink";

export const sectionHeading =
  "mb-11 flex items-end justify-between gap-12 max-[980px]:flex-col max-[980px]:items-start max-[980px]:gap-4 [&>p]:max-w-[38ch] [&>p]:text-base [&>p]:leading-[1.6] [&>p]:text-ink-2";
