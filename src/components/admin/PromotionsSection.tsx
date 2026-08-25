import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DOMAINS } from "@/lib/constants";
import type { CouponRow } from "@/lib/coupons";
import {
  Percent, Plus, Search, Edit, Trash2, CheckCircle2, XCircle, Clock, Copy, Sparkles,
} from "lucide-react";

const defaultForm = {
  code: "", description: "", discount_type: "percentage" as "percentage" | "fixed",
  discount_value: 10, max_uses: 0, min_amount: 0, max_discount_amount: "",
  expires_at: "", applicable_domains: [] as string[],
};

export function PromotionsSection() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: coupons, isLoading } = useQuery({
    queryKey: ["admin-coupons"],
    queryFn: async () => {
      const { data } = await supabase.from("coupons" as any).select("*").order("created_at" as any, { ascending: false });
      return (data ?? []) as CouponRow[];
    },
  });

  const filtered = useMemo(() => {
    if (!search) return coupons;
    const q = search.toLowerCase();
    return coupons?.filter((c) =>
      c.code.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [coupons, search]);

  const openNew = () => {
    setEditId(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };

  const openEdit = (c: CouponRow) => {
    setEditId(c.id);
    setForm({
      code: c.code,
      description: c.description,
      discount_type: c.discount_type,
      discount_value: c.discount_value,
      max_uses: c.max_uses,
      min_amount: c.min_amount,
      max_discount_amount: c.max_discount_amount?.toString() ?? "",
      expires_at: c.expires_at ? new Date(c.expires_at).toISOString().slice(0, 16) : "",
      applicable_domains: c.applicable_domains ?? [],
    });
    setDialogOpen(true);
  };

  const toggleActive = async (c: CouponRow) => {
    const { error } = await supabase.from("coupons" as any).update({ is_active: !c.is_active }).eq("id" as any, c.id);
    if (error) { toast.error(error.message); return; }
    toast.success(`Coupon ${c.is_active ? "deactivated" : "activated"}`);
    qc.invalidateQueries({ queryKey: ["admin-coupons"] });
  };

  const deleteCoupon = async (c: CouponRow) => {
    if (!confirm(`Delete coupon "${c.code}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("coupons" as any).delete().eq("id" as any, c.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Coupon deleted");
    qc.invalidateQueries({ queryKey: ["admin-coupons"] });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied");
  };

  const saveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) { toast.error("Coupon code is required"); return; }
    setSaving(true);
    try {
      const payload: Record<string, any> = {
        code: form.code.trim().toUpperCase(),
        description: form.description.trim(),
        discount_type: form.discount_type,
        discount_value: form.discount_value,
        max_uses: form.max_uses,
        min_amount: form.min_amount,
        max_discount_amount: form.max_discount_amount ? parseFloat(form.max_discount_amount) : null,
        expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
        applicable_domains: form.applicable_domains.length > 0 ? form.applicable_domains : null,
      };

      if (editId) {
        const { error } = await supabase.from("coupons" as any).update(payload).eq("id" as any, editId);
        if (error) throw error;
        toast.success("Coupon updated");
      } else {
        const { error } = await supabase.from("coupons" as any).insert(payload);
        if (error) throw error;
        toast.success("Coupon created");
      }
      setDialogOpen(false);
      qc.invalidateQueries({ queryKey: ["admin-coupons"] });
    } catch (err: any) {
      if (err?.code === "23505") toast.error("A coupon with this code already exists");
      else toast.error(err?.message || "Failed to save coupon");
    } finally {
      setSaving(false);
    }
  };

  const domainToggle = (slug: string) => {
    setForm((f) => ({
      ...f,
      applicable_domains: f.applicable_domains.includes(slug)
        ? f.applicable_domains.filter((d) => d !== slug)
        : [...f.applicable_domains, slug],
    }));
  };

  const remaining = (c: CouponRow) => c.max_uses > 0 ? c.max_uses - c.current_uses : Infinity;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2"><Percent className="size-5" /> Promotions & Coupons</h2>
          <p className="text-sm text-muted-foreground mt-1">Create and manage promotional coupon codes for discounts.</p>
        </div>
        <Button onClick={openNew} className="brand-gradient text-white border-0 rounded-xl gap-1.5 h-10">
          <Plus className="size-4" /> New Coupon
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-border/50 bg-white/60 dark:bg-white/5">
          <CardContent className="p-4 text-center"><p className="text-2xl font-bold">{coupons?.length ?? 0}</p><p className="text-xs text-muted-foreground mt-1">Total Coupons</p></CardContent>
        </Card>
        <Card className="border-border/50 bg-white/60 dark:bg-white/5">
          <CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-600">{coupons?.filter((c) => c.is_active).length ?? 0}</p><p className="text-xs text-muted-foreground mt-1">Active</p></CardContent>
        </Card>
        <Card className="border-border/50 bg-white/60 dark:bg-white/5">
          <CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-600">{coupons?.filter((c) => !c.is_active).length ?? 0}</p><p className="text-xs text-muted-foreground mt-1">Inactive</p></CardContent>
        </Card>
        <Card className="border-border/50 bg-white/60 dark:bg-white/5">
          <CardContent className="p-4 text-center"><p className="text-2xl font-bold">{coupons?.reduce((s, c) => s + c.current_uses, 0) ?? 0}</p><p className="text-xs text-muted-foreground mt-1">Total Uses</p></CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search coupons..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-10 rounded-xl bg-white/60 dark:bg-white/5 border-border/50"
        />
      </div>

      {/* Coupon List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-2xl bg-white/60 animate-pulse dark:bg-white/5" />)}
        </div>
      ) : filtered?.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Percent className="size-10 mx-auto mb-3 opacity-40" />
          <p>{search ? "No coupons match your search" : "No coupons yet. Create your first one!"}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered?.map((c) => {
            const usesLeft = remaining(c);
            const isExpired = c.expires_at && new Date(c.expires_at) < new Date();
            return (
              <div key={c.id} className="rounded-2xl border border-border/50 bg-white/60 dark:bg-white/5 p-4 transition hover:shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="rounded-lg bg-[#07284a]/10 dark:bg-white/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider">{c.code}</code>
                      <Badge className={`text-[10px] ${c.is_active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300"}`}>
                        {c.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {isExpired && <Badge className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">Expired</Badge>}
                      <Badge className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
                        {c.discount_type === "percentage" ? `${c.discount_value}% OFF` : `₹${c.discount_value} OFF`}
                      </Badge>
                    </div>
                    {c.description && <p className="text-xs text-muted-foreground mt-2">{c.description}</p>}
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground flex-wrap">
                      {c.applicable_domains && c.applicable_domains.length > 0
                        ? <span>Domains: {c.applicable_domains.length}</span>
                        : <span>All domains</span>}
                      <span className="flex items-center gap-1"><Copy className="size-3" /> Used {c.current_uses}x</span>
                      {c.max_uses > 0 && <span>{usesLeft} remaining</span>}
                      {c.expires_at && <span className="flex items-center gap-1"><Clock className="size-3" /> Expires {new Date(c.expires_at).toLocaleDateString("en-IN")}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button size="icon" variant="ghost" className="size-8 rounded-lg" onClick={() => copyCode(c.code)} title="Copy code"><Copy className="size-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="size-8 rounded-lg" onClick={() => openEdit(c)} title="Edit"><Edit className="size-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="size-8 rounded-lg" onClick={() => toggleActive(c)} title={c.is_active ? "Deactivate" : "Activate"}>
                      {c.is_active ? <XCircle className="size-3.5 text-amber-500" /> : <CheckCircle2 className="size-3.5 text-green-500" />}
                    </Button>
                    <Button size="icon" variant="ghost" className="size-8 rounded-lg hover:text-red-500" onClick={() => deleteCoupon(c)} title="Delete"><Trash2 className="size-3.5" /></Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
            <DialogDescription>
              {editId ? "Modify the coupon details below." : "Set up a new promotional coupon code."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={saveCoupon} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <Label>Coupon Code</Label>
                <Input
                  value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                  placeholder="e.g. DIWALI50" required className="mt-1 font-mono"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label>Discount Type</Label>
                <Select value={form.discount_type} onValueChange={(v) => setForm((f) => ({ ...f, discount_type: v as "percentage" | "fixed" }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Discount Value</Label>
                <Input
                  type="number" min={1} value={form.discount_value}
                  onChange={(e) => setForm((f) => ({ ...f, discount_value: parseInt(e.target.value) || 0 }))}
                  required className="mt-1"
                />
              </div>
              <div>
                <Label>Max Discount (₹, optional)</Label>
                <Input
                  type="number" min={0} value={form.max_discount_amount}
                  onChange={(e) => setForm((f) => ({ ...f, max_discount_amount: e.target.value }))}
                  placeholder="Leave empty for no cap" className="mt-1"
                />
              </div>
              <div>
                <Label>Max Uses (0 = unlimited)</Label>
                <Input
                  type="number" min={0} value={form.max_uses}
                  onChange={(e) => setForm((f) => ({ ...f, max_uses: parseInt(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Min Amount (₹)</Label>
                <Input
                  type="number" min={0} value={form.min_amount}
                  onChange={(e) => setForm((f) => ({ ...f, min_amount: parseInt(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label>Expires At (optional)</Label>
                <Input
                  type="datetime-local" value={form.expires_at}
                  onChange={(e) => setForm((f) => ({ ...f, expires_at: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Textarea
                value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Internal note about this coupon..." className="mt-1 h-20"
              />
            </div>
            <div>
              <Label>Applicable Domains (leave empty for all)</Label>
              <div className="mt-1 flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                {DOMAINS.map((d) => {
                  const selected = form.applicable_domains.includes(d.slug);
                  return (
                    <button key={d.slug} type="button" onClick={() => domainToggle(d.slug)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-medium border transition ${
                        selected
                          ? "bg-[#07284a]/10 border-[#07284a]/30 text-[#07284a] dark:text-white dark:bg-white/10"
                          : "bg-transparent border-border/50 text-muted-foreground hover:border-border"
                      }`}
                    >
                      {d.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <Button type="submit" className="w-full brand-gradient text-white border-0 rounded-xl h-11" disabled={saving}>
              {saving ? "Saving..." : editId ? "Update Coupon" : "Create Coupon"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
