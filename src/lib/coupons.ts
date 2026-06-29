import { supabase } from "@/integrations/supabase/client";
import { PAYMENT } from "./constants";

export type CouponResult = {
  valid: boolean;
  code?: string;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  discountAmount?: number;
  originalAmount: number;
  finalAmount: number;
  error?: string;
};

export type CouponRow = {
  id: string;
  code: string;
  description: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  max_uses: number;
  current_uses: number;
  min_amount: number;
  max_discount_amount: number | null;
  expires_at: string | null;
  is_active: boolean;
  applicable_domains: string[] | null;
  created_at: string;
};

export function calculateDiscountedAmount(
  originalAmount: number,
  discountType: "percentage" | "fixed",
  discountValue: number,
  maxDiscountAmount?: number | null,
): number {
  let discount = discountType === "percentage"
    ? (originalAmount * discountValue) / 100
    : discountValue;
  if (maxDiscountAmount != null && discount > maxDiscountAmount) {
    discount = maxDiscountAmount;
  }
  if (discount > originalAmount) discount = originalAmount;
  return Math.round((originalAmount - discount) * 100) / 100;
}

export function formatDiscount(
  discountType: "percentage" | "fixed",
  discountValue: number,
): string {
  return discountType === "percentage" ? `${discountValue}%` : `₹${discountValue}`;
}

export async function validateCoupon(
  code: string,
  domain?: string,
  amount?: number,
): Promise<CouponResult> {
  const originalAmount = amount ?? PAYMENT.amount;

  const { data: rows, error } = await supabase
    .from("coupons" as any)
    .select("*")
    .ilike("code" as any, code.trim());

  if (error || !rows || rows.length === 0) {
    return { valid: false, originalAmount, finalAmount: originalAmount, error: "Invalid coupon code." };
  }

  const c = rows[0] as unknown as CouponRow;

  if (!c.is_active) {
    return { valid: false, originalAmount, finalAmount: originalAmount, error: "This coupon is no longer active." };
  }

  if (c.expires_at && new Date(c.expires_at) < new Date()) {
    return { valid: false, originalAmount, finalAmount: originalAmount, error: "This coupon has expired." };
  }

  if (c.max_uses > 0 && c.current_uses >= c.max_uses) {
    return { valid: false, originalAmount, finalAmount: originalAmount, error: "This coupon has reached its usage limit." };
  }

  if (c.min_amount > 0 && originalAmount < c.min_amount) {
    return { valid: false, originalAmount, finalAmount: originalAmount, error: `Minimum order amount is ₹${c.min_amount}.` };
  }

  if (c.applicable_domains && c.applicable_domains.length > 0 && domain) {
    if (!c.applicable_domains.includes(domain)) {
      return { valid: false, originalAmount, finalAmount: originalAmount, error: "This coupon is not applicable to your domain." };
    }
  }

  const discountAmount = originalAmount - calculateDiscountedAmount(
    originalAmount, c.discount_type, c.discount_value, c.max_discount_amount,
  );

  return {
    valid: true,
    code: c.code,
    discountType: c.discount_type,
    discountValue: c.discount_value,
    discountAmount: Math.round(discountAmount * 100) / 100,
    originalAmount,
    finalAmount: originalAmount - Math.round(discountAmount * 100) / 100,
  };
}
