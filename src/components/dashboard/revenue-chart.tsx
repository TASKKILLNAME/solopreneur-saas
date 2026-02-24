"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartData {
  month: string
  revenue: number
}

export function RevenueChart({ data }: { data: ChartData[] }) {
  if (!data || data.length === 0) return null

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-semibold mb-4">월별 수입</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" tick={{ fill: "currentColor", fontSize: 12 }} />
            <YAxis tick={{ fill: "currentColor", fontSize: 12 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`} />
            <Tooltip
              formatter={(value) => [`₩${Number(value).toLocaleString()}`, "수입"]}
              contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
            />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
