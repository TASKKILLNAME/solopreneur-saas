import { getTransactions } from "@/actions/transactions"
import { getProjects } from "@/actions/projects"
import { PageHeader } from "@/components/layout/page-header"
import { TransactionList } from "@/components/finances/transaction-list"
import { ko } from "@/dict/ko"

export default async function TransactionsPage() {
  const [transactions, projects] = await Promise.all([getTransactions(), getProjects()])

  return (
    <div className="space-y-6">
      <PageHeader title={ko.finances.transactions} />
      <TransactionList transactions={transactions || []} projects={projects || []} />
    </div>
  )
}
