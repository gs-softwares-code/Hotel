import { db, pressReleases } from "@/db";
import { desc } from "drizzle-orm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { upsertPressReleaseAction } from "@/app/(admin)/cms/actions";
import { FileText, PlusCircle } from "lucide-react";

export default async function CMSContentPage() {
  let releases: any[] = [];
  try {
    releases = await db.query.pressReleases.findMany({
      orderBy: [desc(pressReleases.publishDate)],
    });
  } catch {}

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">
          Corporate Governance & Press Dispatches
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Publish investor statements, regulatory filings, and brand narratives directly to Edge caches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Form */}
        <Card className="lg:col-span-1 border-slate-200">
          <CardHeader>
            <CardTitle className="text-sm">Publish New Dispatch</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData: FormData) => {
                "use server";
                await upsertPressReleaseAction(formData);
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Headline / Title</label>
                <Input name="title" placeholder="Aura Expands Sanctuary Portfolio..." required />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Slug</label>
                <Input name="slug" placeholder="aura-expands-sanctuary-portfolio" required />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Executive Summary</label>
                <textarea
                  name="summary"
                  rows={2}
                  className="w-full rounded-md border border-slate-200 p-2 text-xs"
                  placeholder="Key highlight for investors and press..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Body Content (Markdown)</label>
                <textarea
                  name="content"
                  rows={6}
                  className="w-full rounded-md border border-slate-200 p-2 text-xs font-mono"
                  placeholder="# FOR IMMEDIATE RELEASE..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Publication Status</label>
                <select
                  name="status"
                  className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="PUBLISHED">PUBLISHED (Edge Immediate)</option>
                </select>
              </div>

              <Button type="submit" variant="secondary" className="w-full">
                Broadcast Dispatch
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Dispatches List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-slate-700">Recent Dispatches</h2>
          {releases.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-xs text-slate-400">
                No dispatches on record. Use the form to issue your first corporate release.
              </CardContent>
            </Card>
          ) : (
            releases.map((r) => (
              <Card key={r.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm text-slate-900">{r.title}</span>
                      <Badge variant={r.status === "PUBLISHED" ? "published" : "draft"}>
                        {r.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">{r.summary}</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Slug: /{r.slug} • Published: {new Date(r.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
