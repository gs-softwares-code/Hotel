"use client";

import { useState } from "react";
import { type Property } from "@/db";
import {
  upsertPropertyAction,
  togglePropertyStatusAction,
  deletePropertyAction,
  uploadMediaAction,
} from "@/app/(admin)/cms/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Building2,
  Plus,
  Trash2,
  UploadCloud,
  CheckCircle2,
  RefreshCw,
  Search,
  ExternalLink,
} from "lucide-react";

export function PropertiesManager({ initialProperties }: { initialProperties: Property[] }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [editing, setEditing] = useState<Partial<Property> | null>(null);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const filtered = properties.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase()) ||
    p.country.toLowerCase().includes(search.toLowerCase())
  );

  async function handleToggleStatus(prop: Property) {
    const res = await togglePropertyStatusAction(prop.id, prop.status as "DRAFT" | "PUBLISHED");
    if (res.success && res.status) {
      setProperties((prev) =>
        prev.map((item) => (item.id === prop.id ? { ...item, status: res.status as "DRAFT" | "PUBLISHED" } : item))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this property?")) return;
    const res = await deletePropertyAction(id);
    if (res.success) {
      setProperties((prev) => prev.filter((item) => item.id !== id));
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await uploadMediaAction(fd);
    setUploading(false);
    if (res.success && res.url) {
      setImageUrl(res.url);
    }
  }

  async function handleSubmit(formData: FormData) {
    if (imageUrl) {
      formData.set("featuredImageUrl", imageUrl);
    }
    const res = await upsertPropertyAction(formData);
    if (res.success) {
      alert("Property saved and Edge ISR revalidated successfully!");
      setEditing(null);
      setImageUrl("");
      window.location.reload();
    } else {
      alert(res.error || "Failed to save");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Hotel Portfolio Inventory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage properties, publish states, geo-coordinates, and media assets.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing({
              brandId: "aura-reserve",
              starRating: 5,
              status: "DRAFT",
              region: "apac",
              country: "japan",
            });
            setImageUrl("");
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs uppercase tracking-wider"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Property
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-slate-200">
        <Search className="h-4 w-4 text-slate-400 ml-2" />
        <Input
          placeholder="Filter by hotel name, city, or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none shadow-none focus-visible:ring-0 text-xs"
        />
      </div>

      {/* Edit / Create Modal Form */}
      {editing && (
        <Card className="border-amber-200 bg-amber-50/20">
          <CardHeader>
            <CardTitle className="text-lg">
              {editing.id ? "Edit Property Specifications" : "Onboard New Hotel Property"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4 text-xs">
              {editing.id && <input type="hidden" name="id" value={editing.id} />}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Property Name</label>
                  <Input
                    name="name"
                    defaultValue={editing.name || ""}
                    placeholder="Aura Reserve Kyoto"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">URL Slug</label>
                  <Input
                    name="slug"
                    defaultValue={editing.slug || ""}
                    placeholder="aura-reserve-kyoto"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Brand Classification</label>
                  <select
                    name="brandId"
                    defaultValue={editing.brandId || "aura-reserve"}
                    className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="aura-reserve">Aura Reserve (Ultra-Luxury)</option>
                    <option value="aura-regency">Aura Regency (Grand Heritage)</option>
                    <option value="aura-horizon">Aura Horizon (Coastal Resorts)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Region</label>
                  <select
                    name="region"
                    defaultValue={editing.region || "apac"}
                    className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-xs shadow-sm"
                  >
                    <option value="apac">APAC</option>
                    <option value="emea">EMEA</option>
                    <option value="americas">Americas</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Country</label>
                  <Input
                    name="country"
                    defaultValue={editing.country || ""}
                    placeholder="Japan"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">City</label>
                  <Input
                    name="city"
                    defaultValue={editing.city || ""}
                    placeholder="Kyoto"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Star Rating</label>
                  <Input
                    name="starRating"
                    type="number"
                    min="1"
                    max="5"
                    defaultValue={editing.starRating || 5}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Physical Address</label>
                  <Input
                    name="address"
                    defaultValue={editing.address || ""}
                    placeholder="12 Higashiyama Ward, Kyoto"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Latitude</label>
                  <Input
                    name="latitude"
                    type="number"
                    step="any"
                    defaultValue={editing.latitude || 34.9989}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Longitude</label>
                  <Input
                    name="longitude"
                    type="number"
                    step="any"
                    defaultValue={editing.longitude || 135.7807}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editing.description || ""}
                  placeholder="Sanctuary in the historic hills overlooking ancient temples..."
                  className="w-full rounded-md border border-slate-200 p-2 text-xs focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Native Storage Media Upload */}
              <div className="p-4 border border-dashed border-slate-300 rounded-lg bg-white space-y-2">
                <label className="font-semibold text-slate-700 flex items-center">
                  <UploadCloud className="h-4 w-4 mr-2 text-amber-600" />
                  Direct Edge Media Stream (Cloudflare R2 / Vercel Blob)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-xs"
                />
                {uploading && <p className="text-amber-600 animate-pulse">Streaming to bucket...</p>}
                {(imageUrl || editing.featuredImageUrl) && (
                  <p className="text-emerald-700 font-mono text-[11px] truncate">
                    Attached: {imageUrl || editing.featuredImageUrl}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="secondary">
                  Save & Purge Edge Cache
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Properties Table */}
      <div className="border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-3.5">Property</th>
              <th className="p-3.5">Brand</th>
              <th className="p-3.5">Location</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Stars</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  No properties registered. Click &quot;Add New Property&quot; to seed your portfolio.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-semibold text-slate-900">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-amber-600" />
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-600 uppercase font-mono text-[10px]">
                    {p.brandId}
                  </td>
                  <td className="p-3.5 text-slate-600">
                    {p.city}, {p.country}
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => handleToggleStatus(p)}
                      title="Click to toggle status"
                    >
                      <Badge variant={p.status === "PUBLISHED" ? "published" : "draft"}>
                        {p.status}
                      </Badge>
                    </button>
                  </td>
                  <td className="p-3.5 text-amber-500 font-bold">
                    {"★".repeat(p.starRating || 5)}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditing(p);
                        setImageUrl(p.featuredImageUrl || "");
                      }}
                      className="text-xs text-slate-600 hover:text-slate-900"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(p.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
