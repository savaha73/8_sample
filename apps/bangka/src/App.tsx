/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Coffee, Heart, MapPin, Clock, Sparkles } from 'lucide-react';

interface MenuItem {
  id: string;
  category: string;
  englishName: string;
  name: string;
  description: string;
  ingredients: string;
  tasteNotes: string;
  basePriceKrw: number;
  imageUrl: string;
  imageAlt: string;
}

const HERO_SHOWCASE_IMAGE =
  '/assets/aistudio/hero-showcase.jpg';

const CAFE_INTERIOR_IMAGE =
  '/assets/aistudio/cafe-interior.jpg';

const CAFE_MOOD_LATTE_IMAGE =
  '/assets/aistudio/cafe-mood-latte.jpg';

const NEW_MENUS: MenuItem[] = [
  {
    id: 'mix-cream-latte',
    category: '믹스커피 기반',
    englishName: 'Mix Cream Latte',
    name: '방카 믹스 크림라떼',
    description:
      '한국식 믹스커피의 친숙한 달콤함을 쫀득한 수제 커피 크림으로 끌어올린 방카의 시그니처 라떼',
    ingredients: '방카 블렌드 믹스 베이스, 우유, 수제 바닐라 크림',
    tasteNotes: '부드러운 캐러멜 단맛과 입안을 감싸는 벨벳 텍스처',
    basePriceKrw: 4000,
    imageUrl:
      '/assets/aistudio/menu-mix-cream.jpg',
    imageAlt: '진한 휘핑 커피 크림이 올라간 방카 믹스 크림라떼',
  },
  {
    id: 'banana-shot-latte',
    category: '바나나우유 기반',
    englishName: 'Banana Shot Latte',
    name: '바나나 샷 라떼',
    description:
      '달콤한 바나나 베이스와 우유 위로 갓 추출한 스페셜티 에스프레소 샷이 어우러지는 층층이 라떼',
    ingredients: '리얼 바나나 퓨레, 우유, 스페셜티 에스프레소 2샷',
    tasteNotes: '은은하게 퍼지는 바나나의 단맛과 깔끔한 에스프레소 여운',
    basePriceKrw: 4500,
    imageUrl:
      '/assets/aistudio/menu-banana-shot.jpg',
    imageAlt: '바나나 퓨레와 우유, 에스프레소가 층을 이룬 바나나 샷 라떼',
  },
  {
    id: 'black-sesame-cream',
    category: '스페셜 커피',
    englishName: 'Black Sesame Cream',
    name: '방카 흑임자 크림커피',
    description:
      '고소하게 갈아낸 국산 흑임자 크림이 진한 에스프레소 라떼 위로 흘러내리는 묵직한 스페셜 메뉴',
    ingredients: '국산 흑임자 페이스트, 생크림, 다크 로스트 에스프레소',
    tasteNotes: '고소한 흑임자의 깊은 풍미와 다크 초콜릿 같은 산미',
    basePriceKrw: 4900,
    imageUrl:
      '/assets/aistudio/menu-black-sesame.jpg',
    imageAlt: '풍성한 흑임자 크림이 넘칠 듯 올려진 방카 흑임자 크림커피',
  },
];

const DISCOUNT_PERCENT = 20;

function formatKrw(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`;
}

function getDiscountedPrice(basePrice: number): number {
  return Math.round((basePrice * (100 - DISCOUNT_PERCENT)) / 100);
}

function ResilientPhoto({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFE4D3] to-[#E4CEAE] text-[#67452E]/65 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Coffee className="w-8 h-8 mb-2 opacity-60" aria-hidden="true" />
        <span className="text-xs font-medium">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
}

export default function App() {
  const [votes, setVotes] = useState<Record<string, number>>(() =>
    Object.fromEntries(NEW_MENUS.map((menu) => [menu.id, 0]))
  );
  const [lastVotedId, setLastVotedId] = useState<string | null>(null);

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  const handleVote = (menuId: string) => {
    setVotes((prev) => ({
      ...prev,
      [menuId]: (prev[menuId] ?? 0) + 1,
    }));
    setLastVotedId(menuId);
  };

  const rankings = [...NEW_MENUS]
    .map((menu) => {
      const count = votes[menu.id] ?? 0;
      const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
      return { ...menu, count, percentage };
    })
    .sort((a, b) => b.count - a.count);

  const topScore = rankings[0]?.count ?? 0;

  return (
    <div className="min-h-screen bg-[#F7F0E5] text-[#4A2E1B] flex flex-col">
      {/* Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-20 bg-[#F7F0E5]/95 backdrop-blur-sm border-b border-[#67452E]/12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-serif-display text-2xl font-semibold tracking-tight text-[#4A2E1B] whitespace-nowrap shrink-0"
          >
            BANGKA
          </a>

          <nav
            aria-label="주요 메뉴"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#67452E]/80"
          >
            <a
              href="#menu-voting"
              className="hover:text-[#4A2E1B] transition-colors whitespace-nowrap shrink-0"
            >
              신메뉴 3종
            </a>
            <a
              href="#live-ranking"
              className="hover:text-[#4A2E1B] transition-colors whitespace-nowrap shrink-0"
            >
              투표 현황
            </a>
            <a
              href="#cafe-info"
              className="hover:text-[#4A2E1B] transition-colors whitespace-nowrap shrink-0"
            >
              공간 안내
            </a>
          </nav>

          <div className="shrink-0">
            <a
              href="#menu-voting"
              className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-lg bg-[#67452E] text-[#F7F0E5] text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 hover:bg-[#523522] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C58A53]"
            >
              투표 참여하기
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Centered Title & Description Hero Section */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12">
          <div className="mx-auto max-w-2xl text-center space-y-4">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#9E5B24]">
              LAUNCHING EVENT · 7일간 신메뉴 전 품목 {DISCOUNT_PERCENT}% OFF
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#4A2E1B] text-balance">
              방카(BANGKA) 신메뉴 출시 이벤트
            </h1>
            <p className="text-base sm:text-lg text-[#67452E]/85 leading-relaxed">
              카페 방카의 신메뉴 3종 출시 기념 20% 할인 혜택과 매장 QR코드 기반 인기 투표에 참여해 보세요.
            </p>
          </div>

          {/* Editorial Hero Photo Frame */}
          <div className="mt-8 sm:mt-10 relative overflow-hidden rounded-2xl border border-[#67452E]/12 bg-[#E4CEAE]/40">
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative">
              <ResilientPhoto
                src={HERO_SHOWCASE_IMAGE}
                alt="햇살이 비추는 원목 벤치 위에 나란히 놓인 방카 시그니처 크림 라떼 3종"
                className="w-full h-full object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#362012]/75 via-[#362012]/20 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-[#F7F0E5]">
                <div className="space-y-1">
                  <p className="font-serif-display italic text-lg sm:text-xl text-[#E4CEAE]">
                    Every Cup Tells a Warm Story
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    한 잔의 커피에 마음을 담아 — 가장 마음에 드는 신메뉴에 하트를 눌러주세요
                  </p>
                </div>
                <p className="text-sm font-semibold tabular-nums text-[#F7F0E5]/95 whitespace-nowrap">
                  누적 참여 {totalVotes.toLocaleString('ko-KR')}표
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Menu Cards & Local Voting Section */}
        <section
          id="menu-voting"
          aria-label="신메뉴 투표 목록"
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 border-b border-[#67452E]/12">
            <div>
              <p className="font-serif-display text-sm tracking-widest text-[#9E5B24]">
                NEW SEASONAL SELECTION
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-[#4A2E1B]">
                신메뉴 3종 &amp; 인기 투표
              </h2>
            </div>
            <p className="text-sm text-[#67452E]/75">
              각 메뉴 카드 아래의 투표하기 버튼을 눌러 자유롭게 응원해 주세요.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {NEW_MENUS.map((menu) => {
              const discountedPrice = getDiscountedPrice(menu.basePriceKrw);
              const voteCount = votes[menu.id] ?? 0;
              const isJustVoted = lastVotedId === menu.id;
              const isLeading = topScore > 0 && voteCount === topScore;

              return (
                <article
                  key={menu.id}
                  className="flex flex-col rounded-xl bg-[#FCF9F4] border border-[#67452E]/12 overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFE4D3]">
                    <ResilientPhoto
                      src={menu.imageUrl}
                      alt={menu.imageAlt}
                      className="w-full h-full transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#67452E]/70">
                        <div className="flex items-center gap-2">
                          <span>{menu.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#9E5B24] font-semibold">
                            {DISCOUNT_PERCENT}% OFF
                          </span>
                        </div>
                        {isLeading && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#9E5B24]">
                            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                            현재 1위
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="font-serif-display italic text-sm text-[#67452E]/65">
                          {menu.englishName}
                        </p>
                        <h3 className="text-xl font-bold tracking-tight text-[#4A2E1B]">
                          {menu.name}
                        </h3>
                      </div>

                      <p className="text-sm leading-relaxed text-[#67452E]/85">
                        {menu.description}
                      </p>

                      <dl className="pt-3 space-y-1.5 text-xs text-[#67452E]/75 border-t border-[#67452E]/10">
                        <div>
                          <dt className="inline font-semibold text-[#4A2E1B]">주요 재료: </dt>
                          <dd className="inline">{menu.ingredients}</dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold text-[#4A2E1B]">맛 특징: </dt>
                          <dd className="inline">{menu.tasteNotes}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#67452E]/10 space-y-4">
                      {/* Price & Current Vote Count */}
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="flex items-baseline gap-2 tabular-nums">
                          <span className="text-lg font-bold text-[#4A2E1B]">
                            {formatKrw(discountedPrice)}
                          </span>
                          <span className="text-xs line-through text-[#67452E]/45">
                            {formatKrw(menu.basePriceKrw)}
                          </span>
                        </div>

                        <p
                          className="text-sm font-semibold text-[#4A2E1B] tabular-nums"
                          aria-live="polite"
                        >
                          현재 {voteCount.toLocaleString('ko-KR')}표
                        </p>
                      </div>

                      {/* Vote Button */}
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => handleVote(menu.id)}
                          className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#67452E] text-[#F7F0E5] text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-150 hover:bg-[#523522] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C58A53]"
                        >
                          <Heart
                            className={`w-4 h-4 shrink-0 ${
                              isJustVoted ? 'fill-[#C58A53] text-[#C58A53]' : ''
                            }`}
                            aria-hidden="true"
                          />
                          <span>투표하기</span>
                        </button>

                        {isJustVoted && (
                          <p className="text-xs text-center font-medium text-[#9E5B24]">
                            소중한 한 표가 반영되었습니다.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Live Share Summary */}
        <section
          id="live-ranking"
          aria-label="실시간 득표 현황"
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        >
          <div className="rounded-2xl bg-[#FCF9F4] border border-[#67452E]/12 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#67452E]/10">
              <div>
                <p className="font-serif-display text-sm tracking-widest text-[#9E5B24]">
                  LIVE POPULARITY
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-[#4A2E1B]">
                  실시간 신메뉴 득표 현황
                </h2>
              </div>
              <p className="text-sm font-medium text-[#67452E]/75 tabular-nums">
                총 {totalVotes.toLocaleString('ko-KR')}표 참여 중
              </p>
            </div>

            <div className="mt-6 space-y-5">
              {rankings.map((item, idx) => {
                const isFirst = topScore > 0 && item.count === topScore;
                return (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-serif-display text-lg font-semibold text-[#9E5B24] tabular-nums w-6 shrink-0">
                          0{idx + 1}
                        </span>
                        <span className="font-semibold text-[#4A2E1B] truncate">
                          {item.name}
                        </span>
                        {isFirst && (
                          <span className="text-xs font-semibold text-[#9E5B24] whitespace-nowrap">
                            · 인기 1위
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0 tabular-nums">
                        <span className="text-xs text-[#67452E]/70">
                          {item.count.toLocaleString('ko-KR')}표
                        </span>
                        <span className="font-bold text-[#4A2E1B] w-11 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>

                    <div className="h-2.5 w-full rounded-full bg-[#E4CEAE]/50 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-[width] duration-300 ${
                          isFirst ? 'bg-[#67452E]' : 'bg-[#C58A53]'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cafe Story & Space Showcase */}
        <section
          id="cafe-info"
          aria-label="카페 방카 공간 및 안내"
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 pb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-[#67452E]/12 bg-[#E4CEAE]/30">
              <ResilientPhoto
                src={CAFE_INTERIOR_IMAGE}
                alt="따뜻한 오후 햇살이 가득 들어오는 카페 방카 매장 내부"
                className="w-full h-full min-h-[280px] max-h-[420px]"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#FCF9F4] border border-[#67452E]/12 p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#67452E]/10">
                    <ResilientPhoto
                      src={CAFE_MOOD_LATTE_IMAGE}
                      alt="코르크 코스터 위에 놓인 아이스 라떼"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-serif-display text-sm tracking-widest text-[#9E5B24]">
                      OUR SPACE
                    </p>
                    <h2 className="text-xl font-bold text-[#4A2E1B]">카페 방카 (BANGKA)</h2>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-[#67452E]/85">
                  햇살이 스며드는 따뜻한 우드 톤 공간에서 정성껏 내린 커피와 신메뉴를 만나보세요. 출시 기간 동안 매장에서 신메뉴 3종 모두 20% 할인된 가격으로 즐길 수 있습니다.
                </p>
              </div>

              <div className="pt-4 border-t border-[#67452E]/10 space-y-3 text-sm text-[#67452E]/80">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 mt-0.5 text-[#9E5B24] shrink-0" aria-hidden="true" />
                  <span>이벤트 기간: 출시일로부터 7일간 (KST 기준)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#9E5B24] shrink-0" aria-hidden="true" />
                  <span>매장 위치 및 운영시간은 오픈 전 관리자 설정에서 확정됩니다.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#4A2E1B] text-[#F7F0E5]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#F7F0E5]/75">
          <p className="font-serif-display text-lg tracking-wide text-[#F7F0E5]">
            BANGKA COFFEE
          </p>
          <p>© 2026 CAFE BANGKA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
