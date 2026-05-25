import Link from "next/link";

type AmbassadorCreditProps = {
  name: string;
  slug: string;
  role: string;       // "Ambasador Štajerske"
  region: string;
  bio?: string;       // kratko priporočilo
  isTop?: boolean;
};

export default function AmbassadorCredit({
  name, slug, role, region, bio, isTop,
}: AmbassadorCreditProps) {
  return (
    <div className="rounded-[28px] border border-[#c58b46]/25 bg-[#0b1a10] p-6">
      <div className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#c58b46]">
        Predlagal ambasador
      </div>

      <Link href={`/ambasadorji/${slug}`} className="group flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-[#07110b] text-2xl transition group-hover:border-[#c58b46]/40">
          🚴
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black text-white transition group-hover:text-[#f4d7ad]">
              {name}
            </span>
            {isTop && (
              <span className="rounded-full border border-[#c58b46]/40 bg-[#c58b46]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#f4d7ad]">
                TOP
              </span>
            )}
          </div>
          <div className="mt-0.5 text-xs text-zinc-500">{role}</div>
        </div>
      </Link>

      {bio && (
        <p className="mt-4 text-sm leading-7 text-zinc-400 border-t border-white/10 pt-4">
          "{bio}"
        </p>
      )}

      <Link
        href={`/ambasadorji/${slug}`}
        className="mt-4 inline-flex text-xs font-bold text-[#c58b46] hover:underline"
      >
        Poglej vse vsebine ambasadorja →
      </Link>
    </div>
  );
}
