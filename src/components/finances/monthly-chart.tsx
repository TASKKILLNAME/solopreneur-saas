"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface ChartData {
  month: string
  income: number
  expense: number
}

export function MonthlyChart({ data }: { data: ChartData[] }) {
  if (!data || data.length === 0) return null

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-semibold mb-4">월별 수입/지출</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor", fontSize: 12 }} />
            <YAxis className="text-xs" tick={{ fill: "currentColor", fontSize: 12 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`} />
            <Tooltip
              formatter={(value) => [`₩${Number(value).toLocaleString()}`, ""]}
              contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
            />
            <Legend />
            <Bar dataKey="income" name="수입" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name="지출" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
