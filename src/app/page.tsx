import Link from "next/link"
import {
  Users,
  FolderKanban,
  FileText,
  Clock,
  Wallet,
  BarChart3,
  ArrowRight,
  Check,
  Moon,
  Smartphone,
} from "lucide-react"

const features = [
  { icon: Users, title: "고객 관리", desc: "고객 정보, 연락처, 메모를 한 곳에서 체계적으로 관리하세요." },
  { icon: FolderKanban, title: "프로젝트 관리", desc: "프로젝트와 태스크를 추적하고 진행 상황을 한눈에 파악하세요." },
  { icon: FileText, title: "청구서 발행", desc: "전문적인 청구서를 만들고 결제 상태를 추적하세요." },
  { icon: Clock, title: "시간 추적", desc: "프로젝트별 작업 시간을 기록하고 청구 가능 시간을 관리하세요." },
  { icon: Wallet, title: "수입/지출 관리", desc: "수입과 지출을 기록하고 월별 리포트로 재무를 파악하세요." },
  { icon: BarChart3, title: "대시보드", desc: "핵심 비즈니스 지표를 한눈에 확인하는 실시간 대시보드." },
]

const extras = [
  { icon: Moon, title: "다크 모드", desc: "눈의 피로를 줄여주는 다크 모드 지원" },
  { icon: Smartphone, title: "반응형 디자인", desc: "모바일, 태블릿, 데스크톱 어디서든" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">S</span>
            </div>
            SoloBiz
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              로그인
            </Link>
            <Link href="/signup" className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              무료로 시작
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground mb-6">
            프리랜서 & 1인 기업을 위한 비즈니스 도구
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            1인 기업을 위한<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              올인원 비즈니스 관리
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            고객, 프로젝트, 청구서, 시간 추적, 수입/지출을 한 곳에서 관리하세요.
            복잡한 도구 대신 심플하고 강력한 하나의 플랫폼으로 비즈니스에 집중하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              무료로 시작하기
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input px-8 text-base font-medium hover:bg-accent transition-colors">
              로그인
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">비즈니스에 필요한 모든 것</h2>
            <p className="text-muted-foreground">하나의 플랫폼에서 모든 업무를 관리하세요</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 mt-6 max-w-2xl mx-auto">
            {extras.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">합리적인 요금제</h2>
            <p className="text-muted-foreground">무료로 시작하고, 필요할 때 업그레이드하세요</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            <div className="rounded-xl border border-border bg-card p-8">
              <h3 className="font-bold text-xl mb-1">Free</h3>
              <p className="text-sm text-muted-foreground mb-4">시작하기에 충분한 기능</p>
              <p className="text-4xl font-bold mb-6">₩0<span className="text-base font-normal text-muted-foreground">/월</span></p>
              <ul className="space-y-3 mb-8">
                {["고객 10명까지", "프로젝트 5개까지", "기본 청구서", "시간 추적", "수입/지출 관리"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="inline-flex h-10 w-full items-center justify-center rounded-md border border-input text-sm font-medium hover:bg-accent transition-colors">
                무료로 시작
              </Link>
            </div>
            <div className="rounded-xl border-2 border-primary bg-card p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                추천
              </div>
              <h3 className="font-bold text-xl mb-1">Pro</h3>
              <p className="text-sm text-muted-foreground mb-4">성장하는 비즈니스를 위한</p>
              <p className="text-4xl font-bold mb-6">₩19,900<span className="text-base font-normal text-muted-foreground">/월</span></p>
              <ul className="space-y-3 mb-8">
                {["무제한 고객", "무제한 프로젝트", "PDF 청구서 + 자동 번호", "상세 리포트", "우선 지원", "데이터 내보내기"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Pro 시작하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">비즈니스 관리를<br />더 스마트하게 시작하세요</h2>
          <p className="text-muted-foreground mb-8">가입은 30초, 신용카드 필요 없음</p>
          <Link href="/signup" className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            무료로 시작하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">S</span>
            </div>
            SoloBiz
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2026 SoloBiz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
