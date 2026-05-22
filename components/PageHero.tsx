import Link from "next/link";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  titleClassName?: string;
  description: string;
  image: string;
  mobileImage?: string;
  imageAlt: string;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  imagePosition?: string;
};

export default function PageHero({
  eyebrow,
  title,
  titleClassName = "",
  description,
  image,
  mobileImage,
  imageAlt,
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
  imagePosition = "center",
}: PageHeroProps) {
  return (
    <section className="relative min-h-[680px] overflow-hidden border-b border-white/10 md:min-h-[720px]">
      <picture>
        {mobileImage ? (
          <source media="(max-width: 767px)" srcSet={mobileImage} />
        ) : null}
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          style={{ objectPosition: imagePosition }}
        />
      </picture>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#07110b]/25 to-[#07110b]/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07110b]/45 via-[#07110b]/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-32 md:px-6 md:pt-36 lg:pt-40">
        <div className="max-w-5xl">
          <div className="mb-5 text-xs uppercase tracking-[0.35em] text-[#c58b46]">
            {eyebrow}
          </div>

          <h1 className={`max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.045em] md:text-7xl lg:text-8xl ${titleClassName}`}>
            {title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-200 md:text-xl md:leading-9">
            {description}
          </p>

          {(ctaHref || secondaryHref) && (
            <div className="mt-9 flex flex-wrap gap-4">
              {ctaHref && ctaLabel && (
                <Link
                  href={ctaHref}
                  className="rounded-full bg-[#c58b46] px-7 py-4 text-sm font-bold text-black transition hover:bg-[#d9a35d]"
                >
                  {ctaLabel}
                </Link>
              )}

              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="rounded-full border border-white/15 bg-black/20 px-7 py-4 text-sm font-bold text-white transition hover:border-[#c58b46]/50"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
