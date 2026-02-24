import Link from "next/link"
import { ArrowRight, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { getFinancialSummary } from "@/actions/transactions"
import { PageHeader } from "@/components/layout/page-header"
import { MonthlyChart } from "@/components/finances/monthly-chart"
import { ko } from "@/dict/ko"
import { formatCurrency } from "@/lib/utils"

export default async function FinancesPage() {
  const summary = await getFinancialSummary()

  return (
    <div className="space-y-6">
      <PageHeader title={ko.finances.title}>
        <Link href="/finances/transactions" className="inline-flex h-9 items-center gap-2 rounded-md border border-input px-4 text-sm font-medium hover:bg-accent transition-colors">
          {ko.finances.transactions}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">이번 달 {ko.finances.income}</p>
              <p className="text-xl font-bold">{formatCurrency(summary.monthlyIncome)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">연간: {formatCurrency(summary.yearlyIncome)}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">이번 달 {ko.finances.expense}</p>
              <p className="text-xl font-bold">{formatCurrency(summary.monthlyExpense)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">연간: {formatCurrency(summary.yearlyExpense)}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">이번 달 {ko.finances.netProfit}</p>
              <p className="text-xl font-bold">{formatCurrency(summary.monthlyNet)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">연간: {formatCurrency(summary.yearlyNet)}</p>
        </div>
      </div>

      {/* Chart */}
      <MonthlyChart data={summary.chartData} />
    </div>
  )
}
