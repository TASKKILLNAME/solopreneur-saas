import Link from "next/link"
import { DollarSign, FolderKanban, FileText, Clock, ArrowRight, Users, CheckCircle2, Circle } from "lucide-react"
import { getDashboardData } from "@/actions/dashboard"
import { PageHeader } from "@/components/layout/page-header"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { ko } from "@/dict/ko"
import { formatCurrency, formatDate } from "@/lib/utils"
import { PROJECT_STATUS, PROJECT_STATUS_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default async function DashboardPage() {
  const data = await getDashboardData()

  const isNewUser = data.activeProjects === 0 && data.monthlyRevenue === 0

  return (
    <div className="space-y-6">
      <PageHeader title={ko.dashboard.title} />

      {/* Quickstart Guide for New Users */}
      {isNewUser && (
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
          <h2 className="font-bold text-lg mb-2">SoloBiz 시작하기</h2>
          <p className="text-muted-foreground text-sm mb-4">
            아래 단계를 따라 비즈니스 관리를 시작하세요.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/clients/new" className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:shadow-md transition-all hover:border-primary/50">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-sm">1. 고객 등록</p>
                <p className="text-xs text-muted-foreground">거래처 정보 입력</p>
              </div>
            </Link>
            <Link href="/projects/new" className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:shadow-md transition-all hover:border-primary/50">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
                <FolderKanban className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-sm">2. 프로젝트 생성</p>
                <p className="text-xs text-muted-foreground">작업 단위 관리</p>
              </div>
            </Link>
            <Link href="/time-tracking" className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:shadow-md transition-all hover:border-primary/50">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-sm">3. 시간 추적</p>
                <p className="text-xs text-muted-foreground">작업 시간 기록</p>
              </div>
            </Link>
            <Link href="/invoices/new" className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:shadow-md transition-all hover:border-primary/50">
              <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="font-medium text-sm">4. 청구서 발행</p>
                <p className="text-xs text-muted-foreground">결제 요청</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{ko.dashboard.totalRevenue}</p>
              <p className="text-xl font-bold">{formatCurrency(data.monthlyRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <FolderKanban className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{ko.dashboard.activeProjects}</p>
              <p className="text-xl font-bold">{data.activeProjects}개</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
              <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{ko.dashboard.pendingInvoices}</p>
              <p className="text-xl font-bold">{data.pendingInvoiceCount}건</p>
              <p className="text-xs text-muted-foreground">{formatCurrency(data.pendingTotal)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{ko.dashboard.hoursThisWeek}</p>
              <p className="text-xl font-bold">{data.weeklyHours}시간</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <RevenueChart data={data.chartData} />

        {/* Recent Projects */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{ko.dashboard.recentProjects}</h3>
            <Link href="/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
              전체 보기 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {data.recentProjects.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">{ko.projects.noProjects}</p>
          ) : (
            <div className="space-y-3">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {data.recentProjects.map((p: any) => (
                <Link key={p.id} href={`/projects/${p.id}`} className="flex items-center justify-between py-2 hover:bg-muted/50 -mx-2 px-2 rounded-md transition-colors">
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.clients?.company_name}</p>
                  </div>
                  <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", PROJECT_STATUS_COLORS[p.status])}>
                    {PROJECT_STATUS[p.status as keyof typeof PROJECT_STATUS]}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pending Invoices */}
      {data.pendingInvoices.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{ko.dashboard.pendingPayments}</h3>
            <Link href="/invoices?status=sent" className="text-sm text-primary hover:underline flex items-center gap-1">
              전체 보기 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {data.pendingInvoices.map((inv: any) => (
              <div key={inv.invoice_number} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <span className="font-medium">{inv.invoice_number}</span>
                  <span className="text-muted-foreground ml-2">{inv.clients?.company_name}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">{formatCurrency(inv.total)}</span>
                  <span className="text-xs text-muted-foreground ml-2">마감: {formatDate(inv.due_date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
