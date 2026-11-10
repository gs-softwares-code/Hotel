"use client";

import { useFormState } from "react-dom";
import { loginAction, type AuthState } from "../auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function CMSLoginPage() {
  const [state, formAction] = useFormState<AuthState | null, FormData>(loginAction, null);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-100 tracking-wide uppercase">
            Aura Conglomerate
          </h1>
          <p className="text-xs text-slate-400">Headless CMS & Executive Governance Portal</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/90 text-slate-100 shadow-2xl backdrop-blur">
          <CardHeader>
            <CardTitle className="text-slate-100 text-lg">Staff Authentication</CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Direct DB-backed Lucia Auth session. No external SaaS.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              {state?.error && (
                <div className="p-3 text-xs rounded-md bg-red-950/50 border border-red-800 text-red-200">
                  {state.error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Corporate Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="executive@aurahotels.internal"
                  required
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Access Key / Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  required
                  className="border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500"
                />
              </div>

              <Button
                type="submit"
                variant="secondary"
                className="w-full font-semibold uppercase tracking-wider text-xs h-10 mt-2"
              >
                Authenticate Session
              </Button>

              <div className="pt-2 flex items-center justify-center space-x-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                <span>Cloudflare Edge / Vercel Edge Runtime Active</span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

