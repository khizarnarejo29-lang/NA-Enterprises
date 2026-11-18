/**
 * Animated, decorative previews of each service (see src/app/demos.css).
 * They are illustrations only: hidden from assistive technology, and the
 * text inside them is sample text, not real client data.
 */
import type { CSSProperties, ReactNode } from "react";

type Props = { className?: string };

function Frame({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`demo ${className}`} data-animate aria-hidden="true">
      <div className="absolute inset-x-0 top-0 flex h-[9%] items-center gap-[1.2%] border-b border-white/10 bg-white/[0.03] px-[3%]">
        <i className="h-[0.7em] w-[0.7em] rounded-full bg-[#ff5f57]" />
        <i className="h-[0.7em] w-[0.7em] rounded-full bg-[#febc2e]" />
        <i className="h-[0.7em] w-[0.7em] rounded-full bg-[#28c840]" />
        <span className="ml-[2%] text-[0.85em] text-white/50">{label}</span>
      </div>
      <div className="absolute inset-x-0 top-[9%] bottom-0">{children}</div>
    </div>
  );
}

const v = (vars: Record<string, string>) => vars as CSSProperties;

/* 1. A website assembling itself, then the visitor clicks the call to action. */
function WebsiteDemo({ className }: Props) {
  return (
    <Frame label="" className={className}>
      {/* Address bar */}
      <div className="absolute top-[-8%] left-[22%] flex h-[6%] w-[56%] items-center rounded-full bg-white/[0.07] px-[3%] text-[0.85em] text-white/70">
        <span className="mr-[3%] text-[#28c840]">●</span>
        <span className="d-type">https://yourbusiness.pk</span>
      </div>
      <div className="absolute inset-[4%] flex flex-col gap-[4%]">
        <div className="s1 from-down d-panel flex h-[11%] items-center justify-between px-[3%]">
          <span className="d-grad h-[1.2em] w-[1.2em] rounded-[0.3em]" />
          <span className="flex w-[40%] gap-[8%]">
            <i className="d-bar flex-1" />
            <i className="d-bar flex-1" />
            <i className="d-bar flex-1" />
          </span>
          <span className="d-grad h-[1.6em] w-[16%] rounded-full" />
        </div>
        <div className="flex h-[44%] gap-[4%]">
          <div className="flex flex-1 flex-col justify-center gap-[7%]">
            <i className="s2 from-x d-bar hi h-[1.1em] w-[90%]" />
            <i className="s2 from-x d-bar hi h-[1.1em] w-[65%]" />
            <i className="s3 from-x d-bar w-[80%]" />
            <i className="s3 from-x d-bar w-[55%]" />
            <span className="s4 from-pop web-click d-grad mt-[4%] flex h-[1.9em] w-[42%] items-center justify-center rounded-full text-[0.8em] font-semibold text-white">
              Get started
            </span>
          </div>
          <div className="s4 from-zoom d-grad relative w-[44%] overflow-hidden rounded-[0.8em] opacity-90">
            <i className="absolute right-[12%] bottom-[-20%] h-[70%] w-[70%] rounded-full bg-white/25" />
            <i className="absolute top-[14%] left-[12%] h-[22%] w-[22%] rounded-[0.4em] bg-white/40" />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-[4%]">
          {["s5", "s6", "s7"].map((s) => (
            <div key={s} className={`${s} d-panel flex flex-col gap-[10%] p-[8%]`}>
              <span className="d-grad h-[1.3em] w-[1.3em] rounded-[0.35em]" />
              <i className="d-bar hi w-[80%]" />
              <i className="d-bar w-[60%]" />
            </div>
          ))}
        </div>
      </div>
      <span className="s8 from-pop absolute right-[5%] bottom-[6%] rounded-full bg-[#28c840] px-[3%] py-[1.2%] text-[0.85em] font-semibold text-[#03210c]">
        ✓ Website live
      </span>
      <svg className="web-cursor" viewBox="0 0 24 24" fill="#fff">
        <path d="M4 2l15 9-7 1.5L8.5 20z" stroke="#000" strokeWidth="1" />
      </svg>
    </Frame>
  );
}

/* 2. A logo mark drawn with the pen tool, filled, then the wordmark and palette. */
function LogoDemo({ className }: Props) {
  return (
    <Frame label="logo-design.ai" className={className}>
      <div
        className="s1 absolute inset-[6%] rounded-[0.8em] border border-dashed border-white/10"
        style={v({ backgroundImage: "linear-gradient(rgb(255 255 255/.04) 1px,transparent 1px),linear-gradient(90deg,rgb(255 255 255/.04) 1px,transparent 1px)", backgroundSize: "8% 10.6%" })}
      />
      <svg viewBox="0 0 100 100" className="absolute top-[10%] left-[34%] w-[32%] overflow-visible">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6d5dfc" />
            <stop offset=".5" stopColor="#a855f7" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path className="s5 from-zoom" d="M50 6 88 28v44L50 94 12 72V28z" fill="url(#logo-g)" opacity=".95" />
        <path className="d-draw" pathLength={1} d="M50 6 88 28v44L50 94 12 72V28z" fill="none" stroke="#a99cff" strokeWidth="2.5" strokeLinejoin="round" />
        <path className="d-draw late" pathLength={1} d="M34 68 50 30l16 38M40 55h20" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {[[50, 6], [88, 28], [88, 72], [50, 94], [12, 72], [12, 28]].map(([x, y], i) => (
          <rect key={i} className="s2 from-pop" x={x - 2.5} y={y - 2.5} width="5" height="5" fill="#0b0d1f" stroke="#22d3ee" strokeWidth="1.2" />
        ))}
      </svg>
      <div className="absolute top-[64%] inset-x-0 flex justify-center gap-[0.15em] text-[2.1em] font-extrabold tracking-[0.18em]">
        {"BRAND".split("").map((c, i) => (
          <span key={i} className={i < 3 ? "s6" : "s7"}>
            {c}
          </span>
        ))}
      </div>
      <p className="s7 absolute top-[78%] inset-x-0 text-center text-[0.8em] tracking-[0.4em] text-white/55">YOUR TAGLINE</p>
      <div className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 gap-[0.6em]">
        {["#6d5dfc", "#a855f7", "#22d3ee", "#f472b6", "#ffffff"].map((c) => (
          <i key={c} className="s8 from-pop h-[1.5em] w-[1.5em] rounded-full ring-2 ring-white/10" style={{ background: c }} />
        ))}
      </div>
    </Frame>
  );
}

/* 3. A business card is designed, then flips to show the back. */
function CardDemo({ className }: Props) {
  return (
    <Frame label="business-card.psd" className={className}>
      <div className="card-float absolute top-[22%] left-[14%] h-[46%] w-[58%] rounded-[0.8em] border border-white/10 bg-white/[0.04]" style={{ transform: "rotate(-8deg)" }} />
      <div className="card-scene absolute top-[18%] left-[22%] h-[52%] w-[58%]">
        <div className="card-3d relative h-full w-full">
          {/* Front */}
          <div className="card-face absolute inset-0 overflow-hidden rounded-[0.8em] bg-[#12142b] p-[7%] shadow-[0_2em_4em_-1em_rgb(0_0_0/0.8)] ring-1 ring-white/15">
            <i className="s1 from-x d-grad absolute inset-x-0 top-0 h-[6%]" />
            <i className="s2 from-pop d-grad absolute -right-[12%] -bottom-[30%] h-[80%] w-[45%] rounded-full opacity-60 blur-[0.4em]" />
            <span className="s2 from-pop d-grad flex h-[2.6em] w-[2.6em] items-center justify-center rounded-[0.6em] text-[0.9em] font-black">NA</span>
            <p className="s3 from-left mt-[9%] text-[1.4em] font-bold">Your Name</p>
            <p className="s3 from-left text-[0.85em] tracking-[0.2em] text-[#22d3ee]">CREATIVE DIRECTOR</p>
          </div>
          {/* Back */}
          <div className="card-face card-back absolute inset-0 overflow-hidden rounded-[0.8em] bg-gradient-to-br from-[#6d5dfc] via-[#8b5cf6] to-[#0891b2] p-[7%] ring-1 ring-white/20">
            <div className="flex h-full justify-between">
              <ul className="flex flex-col justify-center gap-[0.7em] text-[0.85em]">
                <li>☎ 0300 0000000</li>
                <li>✉ hello@yourbusiness.pk</li>
                <li>⌂ yourbusiness.pk</li>
              </ul>
              <div className="grid h-[3.8em] w-[3.8em] self-center grid-cols-5 gap-[0.12em] rounded-[0.3em] bg-white p-[0.3em]">
                {[1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1].map((b, i) => (
                  <i key={i} className={b ? "bg-[#0b0d1f]" : ""} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[5%] bottom-[6%] left-[5%] flex justify-between text-[0.8em] text-white/50">
        <span className="s4">90 × 54 mm</span>
        <span className="s5">Print-ready ✓</span>
      </div>
    </Frame>
  );
}

/* 4. A social post goes live: likes, comments and followers roll in. */
function SocialDemo({ className }: Props) {
  return (
    <Frame label="social-media-manager" className={className}>
      <div className="absolute top-[5%] left-1/2 h-[92%] w-[40%] -translate-x-1/2 overflow-hidden rounded-[1.4em] border-[0.35em] border-[#1c1f3a] bg-[#0e1026]">
        <div className="s1 flex items-center gap-[6%] p-[6%]">
          <span className="d-grad h-[2em] w-[2em] shrink-0 rounded-full ring-2 ring-[#f472b6]" />
          <span className="flex flex-1 flex-col gap-[0.3em]">
            <i className="d-bar hi w-[70%]" />
            <i className="d-bar w-[40%]" />
          </span>
        </div>
        <div className="s2 from-zoom d-grad relative mx-[6%] aspect-square overflow-hidden rounded-[0.6em]">
          <i className="absolute top-[14%] left-[14%] h-[30%] w-[30%] rounded-full bg-white/30" />
          <i className="absolute right-[-10%] bottom-[-10%] h-[60%] w-[70%] rounded-[40%] bg-[#0b0d1f]/40" />
          <span className="absolute bottom-[10%] left-[10%] text-[1.1em] font-black">SALE 50%</span>
        </div>
        <div className="s3 flex items-center gap-[8%] px-[6%] pt-[6%] text-[1.2em]">
          <span className="like-heart inline-block">♥</span>
          <span className="text-white/60">💬</span>
          <span className="text-white/60">↗</span>
        </div>
        <p className="s3 px-[6%] pt-[3%] text-[0.85em] font-semibold">
          <span className="ticker">
            <span>12</span>
            <span>486</span>
            <span>2,140</span>
            <span>8,925</span>
          </span>{" "}
          likes
        </p>
        <div className="flex flex-col gap-[0.35em] px-[6%] pt-[4%]">
          <i className="s4 from-x d-bar w-[85%]" />
          <i className="s5 from-x d-bar w-[60%]" />
        </div>
        {[["10%", "0s", "-1em"], ["30%", "0.8s", "1em"], ["55%", "1.6s", "-0.5em"], ["75%", "2.4s", "1.2em"]].map(([l, d, x]) => (
          <span key={l} className="float-heart text-[1.2em]" style={v({ left: l, "--d": d, "--x": x })}>
            ♥
          </span>
        ))}
      </div>
      <div className="s5 from-left d-panel absolute top-[20%] left-[3%] flex items-center gap-[0.5em] px-[0.8em] py-[0.5em] text-[0.8em]">
        <span className="h-[1.4em] w-[1.4em] rounded-full bg-[#f472b6]" />
        New follower
      </div>
      <div className="s6 from-right d-panel absolute top-[44%] right-[3%] flex items-center gap-[0.5em] px-[0.8em] py-[0.5em] text-[0.8em]">
        <span className="h-[1.4em] w-[1.4em] rounded-full bg-[#22d3ee]" />
        Post shared
      </div>
      <div className="s7 from-left d-panel absolute top-[66%] left-[5%] flex items-center gap-[0.5em] px-[0.8em] py-[0.5em] text-[0.8em]">
        <span className="h-[1.4em] w-[1.4em] rounded-full bg-[#a855f7]" />
        New comment
      </div>
    </Frame>
  );
}

/* 5. A search: your site climbs from fourth place to the top result. */
function SeoDemo({ className }: Props) {
  const row = "rank-row d-panel absolute inset-x-0 top-0 flex h-[22%] flex-col justify-center gap-[0.35em] px-[3%]";
  return (
    <Frame label="search" className={className}>
      <div className="absolute top-[6%] left-[6%] flex h-[11%] w-[62%] items-center gap-[3%] rounded-full bg-white/[0.07] px-[4%] text-[0.95em] ring-1 ring-white/10">
        <span className="text-white/50">⌕</span>
        <span className="d-type">digital agency karachi</span>
        <span className="d-caret" />
      </div>
      <div className="absolute top-[24%] bottom-[6%] left-[6%] w-[62%]">
        <div className={`${row} rank-a`}>
          <i className="d-bar w-[30%] !bg-[#22d3ee]/40" />
          <i className="d-bar hi w-[70%] !bg-white/40" />
          <i className="d-bar w-[90%]" />
        </div>
        <div className={`${row} rank-b`}>
          <i className="d-bar w-[35%] !bg-[#22d3ee]/40" />
          <i className="d-bar hi w-[55%] !bg-white/40" />
          <i className="d-bar w-[80%]" />
        </div>
        <div className={`${row} rank-c`}>
          <i className="d-bar w-[25%] !bg-[#22d3ee]/40" />
          <i className="d-bar hi w-[60%] !bg-white/40" />
          <i className="d-bar w-[85%]" />
        </div>
        <div className={`${row} rank-me z-10 !border-[#8b7bff] !bg-[#1a1640] shadow-[0_0_2em_-0.3em_#8b7bff]`}>
          <span className="text-[0.75em] text-[#22d3ee]">yourbusiness.pk</span>
          <span className="text-[0.95em] font-bold">Your Business – Best in Karachi</span>
          <i className="d-bar w-[85%]" />
        </div>
      </div>
      <div className="absolute top-[6%] right-[5%] bottom-[6%] w-[22%]">
        <div className="d-panel flex h-full flex-col p-[10%]">
          <span className="text-[0.75em] text-white/60">Rank</span>
          <span className="s8 from-pop text-[2.6em] leading-none font-black text-gradient">#1</span>
          <span className="mt-auto text-[0.75em] text-white/60">Traffic</span>
          <svg viewBox="0 0 60 40" className="mt-[8%] w-full overflow-visible">
            <path className="d-draw late" pathLength={1} d="M0 36 10 33 20 34 30 24 40 20 50 9 60 3" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Frame>
  );
}

/* 6. A document being written, with live word count and SEO score. */
function ContentDemo({ className }: Props) {
  return (
    <Frame label="blog-post.docx" className={className}>
      <div className="absolute top-[7%] bottom-[7%] left-[6%] w-[58%] rounded-[0.6em] bg-[#f5f6ff] p-[5%] text-[#14152b] shadow-[0_1em_3em_-1em_rgb(0_0_0/0.7)]">
        <p className="text-[1.25em] leading-tight font-extrabold">
          <span className="d-type inline-block">5 Ways to Grow Online</span>
          <span className="d-caret" />
        </p>
        <div className="mt-[6%] flex flex-col gap-[0.55em]">
          {[
            ["s2", "95%"],
            ["s3", "88%"],
            ["s3", "92%"],
            ["s4", "60%"],
          ].map(([s, w], i) => (
            <i key={i} className={`${s} from-x d-bar !bg-[#14152b]/20`} style={{ width: w }} />
          ))}
          <i className="s5 from-x mt-[0.5em] d-bar !h-[0.75em] w-[45%] !bg-[#6d5dfc]/70" />
          {[
            ["s5", "90%"],
            ["s6", "94%"],
            ["s6", "70%"],
          ].map(([s, w], i) => (
            <i key={i} className={`${s} from-x d-bar !bg-[#14152b]/20`} style={{ width: w }} />
          ))}
        </div>
      </div>
      <div className="absolute top-[7%] right-[5%] flex w-[27%] flex-col gap-[0.6em]">
        <div className="d-panel p-[0.7em]">
          <p className="text-[0.75em] text-white/60">Words</p>
          <p className="text-[1.5em] font-black">
            <span className="ticker">
              <span>0</span>
              <span>240</span>
              <span>610</span>
              <span>1,250</span>
            </span>
          </p>
        </div>
        <div className="d-panel p-[0.7em]">
          <p className="text-[0.75em] text-white/60">SEO score</p>
          <div className="mt-[0.5em] h-[0.6em] overflow-hidden rounded-full bg-white/10">
            <i className="meter-fill d-grad block h-full w-[92%] rounded-full" />
          </div>
        </div>
        <div className="s6 from-pop d-panel p-[0.7em] text-[0.8em]">
          <span className="text-[#4ade80]">●</span> Readability: Good
        </div>
        <div className="s7 from-pop d-panel p-[0.7em] text-[0.8em]">
          <span className="text-[#4ade80]">●</span> Keywords added
        </div>
      </div>
    </Frame>
  );
}

/* 7. A poster composed layer by layer, with the layers panel following along. */
function GraphicDemo({ className }: Props) {
  const layers = ["Background", "Shape", "Headline", "Button", "Details"];
  return (
    <Frame label="poster-design.ai" className={className}>
      <div className="absolute top-[7%] left-[3%] flex w-[7%] flex-col items-center gap-[0.6em] rounded-[0.6em] bg-white/[0.04] py-[0.6em] text-[0.9em] text-white/60">
        <span>↖</span>
        <span>✎</span>
        <span>T</span>
        <span>▢</span>
        <span>◯</span>
      </div>
      <div className="absolute top-[7%] bottom-[7%] left-[14%] w-[44%]">
        <div className="s1 from-zoom absolute inset-0 overflow-hidden rounded-[0.5em] bg-gradient-to-b from-[#1b1450] to-[#3b0f4f]">
          <i className="s2 from-pop absolute top-[12%] left-[24%] h-[42%] w-[52%] rounded-full bg-gradient-to-br from-[#f472b6] to-[#f59e0b]" />
          <i className="s2 from-pop absolute top-[34%] left-[12%] h-[16%] w-[16%] rotate-12 rounded-[0.3em] bg-[#22d3ee]/80" />
          <p className="s3 from-left absolute top-[56%] inset-x-[10%] text-center text-[1.7em] leading-none font-black tracking-tight">
            SUMMER
            <br />
            FESTIVAL
          </p>
          <span className="s4 from-pop absolute bottom-[12%] left-[30%] flex h-[9%] w-[40%] items-center justify-center rounded-full bg-white text-[0.75em] font-bold text-[#1b1450]">
            BOOK NOW
          </span>
          <span className="s5 absolute right-[6%] bottom-[3%] text-[0.6em] text-white/60">12 · 08 · 2026</span>
        </div>
        <div className="select-box pointer-events-none absolute rounded-[0.2em] border border-[#22d3ee]">
          {["-top-[0.25em] -left-[0.25em]", "-top-[0.25em] -right-[0.25em]", "-bottom-[0.25em] -left-[0.25em]", "-bottom-[0.25em] -right-[0.25em]"].map((p) => (
            <i key={p} className={`absolute h-[0.5em] w-[0.5em] bg-white ring-1 ring-[#22d3ee] ${p}`} />
          ))}
        </div>
      </div>
      <div className="d-panel absolute top-[7%] right-[4%] w-[32%] p-[0.7em]">
        <p className="mb-[0.5em] text-[0.75em] tracking-[0.15em] text-white/50">LAYERS</p>
        <div className="relative">
          <i className="layer-hi absolute inset-x-0 top-0 h-[20%] rounded-[0.35em] bg-[#6d5dfc]/40" />
          {layers.map((l, i) => (
            <p key={l} className={`relative flex h-[2em] items-center gap-[0.5em] px-[0.5em] text-[0.8em] s${i + 1}`}>
              <span className="text-white/40">◉</span>
              {l}
            </p>
          ))}
        </div>
      </div>
      <div className="d-panel absolute right-[4%] bottom-[7%] flex w-[32%] gap-[0.4em] p-[0.7em]">
        {["#1b1450", "#f472b6", "#f59e0b", "#22d3ee", "#ffffff"].map((c) => (
          <i key={c} className="s6 from-pop h-[1.4em] flex-1 rounded-[0.3em]" style={{ background: c }} />
        ))}
      </div>
    </Frame>
  );
}

/* 8. A video timeline with clips, captions, music and a moving playhead. */
function VideoDemo({ className }: Props) {
  const bars = [40, 70, 55, 90, 65, 80, 45, 75, 60, 95, 50, 70, 85, 55, 65, 90, 45, 70, 60, 80];
  return (
    <Frame label="promo-video.prproj" className={className}>
      <div className="absolute top-[5%] left-[18%] h-[50%] w-[64%] overflow-hidden rounded-[0.5em] bg-black ring-1 ring-white/10">
        <div className="hue-shift absolute inset-0 bg-gradient-to-br from-[#6d5dfc] via-[#a855f7] to-[#22d3ee]" />
        <i className="scene-ball absolute bottom-[20%] left-[8%] h-[30%] w-[22%] rounded-full bg-white/35 blur-[0.15em]" />
        <p className="s3 absolute inset-x-0 bottom-[8%] text-center text-[0.95em] font-semibold">
          <span className="rounded bg-black/60 px-[0.5em] py-[0.1em]">Your story, in motion.</span>
        </p>
        <span className="absolute top-[6%] left-[4%] rounded bg-black/50 px-[0.4em] text-[0.7em]">● REC 4K</span>
      </div>
      <div className="absolute inset-x-[4%] top-[60%] bottom-[5%] rounded-[0.6em] bg-white/[0.04] p-[1.5%] ring-1 ring-white/10">
        <div className="flex h-[14%] justify-between px-[1%] text-[0.6em] text-white/40">
          {["00:00", "00:05", "00:10", "00:15", "00:20", "00:25"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="mt-[1%] flex h-[24%] gap-[1%]">
          <i className="s1 from-x h-full w-[34%] rounded-[0.3em] bg-[#6d5dfc]" />
          <i className="s2 from-x h-full w-[28%] rounded-[0.3em] bg-[#a855f7]" />
          <i className="s3 from-x h-full w-[36%] rounded-[0.3em] bg-[#0891b2]" />
        </div>
        <div className="mt-[1%] flex h-[18%] gap-[1%] pl-[20%]">
          <i className="s4 from-x h-full w-[40%] rounded-[0.3em] bg-[#f59e0b]/80" />
          <i className="s5 from-x h-full w-[25%] rounded-[0.3em] bg-[#f472b6]/80" />
        </div>
        <div className="wave mt-[1%] flex h-[24%] items-center gap-[1.5%] px-[1%]">
          {bars.map((h, i) => (
            <i key={i} style={v({ "--h": `${h}%`, "--d": `${(i % 5) * 0.15}s` })} />
          ))}
        </div>
        <i className="playhead absolute top-[4%] bottom-[4%] w-[0.15em] bg-[#ff5f57] shadow-[0_0_0.6em_#ff5f57]" style={{ left: "60%" }} />
      </div>
    </Frame>
  );
}

const DEMOS: Record<string, (p: Props) => ReactNode> = {
  "website-development": WebsiteDemo,
  "logo-design": LogoDemo,
  "business-card-design": CardDemo,
  "social-media-marketing": SocialDemo,
  "search-engine-optimization": SeoDemo,
  "content-writing": ContentDemo,
  "graphic-design": GraphicDemo,
  "video-editing-animation": VideoDemo,
};

export function ServiceDemo({ slug, className }: { slug: string; className?: string }) {
  const Demo = DEMOS[slug];
  return Demo ? <Demo className={className} /> : null;
}
