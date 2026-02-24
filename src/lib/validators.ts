import { z } from "zod/v4"

export const clientSchema = z.object({
  company_name: z.string().min(1, "회사명을 입력해주세요"),
  contact_name: z.string().optional(),
  email: z.email("올바른 이메일을 입력해주세요").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  business_registration_number: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["active", "inactive", "archived"]).default("active"),
})

export const projectSchema = z.object({
  name: z.string().min(1, "프로젝트명을 입력해주세요"),
  client_id: z.string().optional().or(z.literal("")),
  description: z.string().optional(),
  status: z.enum(["planning", "in_progress", "on_hold", "completed", "cancelled"]).default("planning"),
  start_date: z.string().optional().or(z.literal("")),
  end_date: z.string().optional().or(z.literal("")),
  budget: z.coerce.number().int().min(0).default(0),
  hourly_rate: z.coerce.number().int().min(0).optional(),
})

export const taskSchema = z.object({
  title: z.string().min(1, "태스크명을 입력해주세요"),
  description: z.string().optional(),
  is_completed: z.boolean().default(false),
  due_date: z.string().optional().or(z.literal("")),
})

export const invoiceItemSchema = z.object({
  description: z.string().min(1, "항목 설명을 입력해주세요"),
  quantity: z.coerce.number().min(0.01),
  unit_price: z.coerce.number().int().min(0),
})

export const invoiceSchema = z.object({
  client_id: z.string().min(1, "고객을 선택해주세요"),
  project_id: z.string().optional().or(z.literal("")),
  issue_date: z.string().min(1, "발행일을 입력해주세요"),
  due_date: z.string().min(1, "납부기한을 입력해주세요"),
  tax_rate: z.coerce.number().min(0).max(100).default(10),
  notes: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, "최소 1개 항목이 필요합니다"),
})

export const timeEntrySchema = z.object({
  project_id: z.string().min(1, "프로젝트를 선택해주세요"),
  task_id: z.string().optional().or(z.literal("")),
  description: z.string().optional(),
  start_time: z.string().min(1),
  end_time: z.string().optional().or(z.literal("")),
  duration_minutes: z.coerce.number().int().min(1).optional(),
  is_billable: z.boolean().default(true),
})

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "카테고리를 선택해주세요"),
  description: z.string().optional(),
  amount: z.coerce.number().int().min(1, "금액을 입력해주세요"),
  transaction_date: z.string().min(1, "날짜를 입력해주세요"),
  project_id: z.string().optional().or(z.literal("")),
  invoice_id: z.string().optional().or(z.literal("")),
})

export const profileSchema = z.object({
  full_name: z.string().min(1, "이름을 입력해주세요"),
  business_name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  business_registration_number: z.string().optional(),
  bank_name: z.string().optional(),
  bank_account: z.string().optional(),
  default_hourly_rate: z.coerce.number().int().min(0).default(0),
})

export type ClientFormData = z.infer<typeof clientSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
export type TaskFormData = z.infer<typeof taskSchema>
export type InvoiceFormData = z.infer<typeof invoiceSchema>
export type InvoiceItemFormData = z.infer<typeof invoiceItemSchema>
export type TimeEntryFormData = z.infer<typeof timeEntrySchema>
export type TransactionFormData = z.infer<typeof transactionSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
