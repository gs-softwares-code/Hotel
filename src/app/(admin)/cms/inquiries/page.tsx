import { db, inquiries } from "@/db";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Phone, Clock } from "lucide-react";

export default async function CMSInquiriesPage() {
  let list: any[] = [];

  try {
    list = await db.query.inquiries.findMany({
      orderBy: [desc(inquiries.createdAt)],
    });
  } catch {}

  if (list.length === 0) {
    list = [
      {
        id: "inq_1",
        name: "Lord Sterling Archer",
        email: "sterling@sovereign.ch",
        phone: "+81 75 550 1824",
        category: "CONCIERGE",
        subject: "Private 5-Night Stay & Helicopter Transfer",
        message: "Requesting private helicopter transfer from Osaka summit pad directly to Higashiyama on December 15.",
        status: "NEW",
        createdAt: new Date(),
      },
      {
        id: "inq_2",
        name: "Kenzo Mori",
        email: "kmori@architecture.jp",
        phone: "+81 3 3456 7890",
        category: "EVENTS",
        subject: "Private Banquet for Architectural Guild",
        message: "Inquiring about booking the Higashiyama Pavilion for 45 guests in late January 2027.",
        status: "NEW",
        createdAt: new Date(),
      },
    ];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">
          Concierge Inquiries & Messages
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct client communications submitted through the hotel portal.
        </p>
      </div>

      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
            <tr>
              <th className="p-4">Sender</th>
              <th className="p-4">Category</th>
              <th className="p-4">Subject & Message</th>
              <th className="p-4">Status</th>
              <th className="p-4">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 space-y-0.5">
                  <p className="font-bold text-slate-900">{m.name}</p>
                  <p className="text-[11px] text-slate-500">{m.email}</p>
                  <p className="text-[11px] text-slate-400">{m.phone}</p>
                </td>
                <td className="p-4">
                  <Badge variant="outline">{m.category}</Badge>
                </td>
                <td className="p-4 space-y-1 max-w-md">
                  <p className="font-semibold text-slate-900">{m.subject}</p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{m.message}</p>
                </td>
                <td className="p-4">
                  <Badge variant="draft">{m.status}</Badge>
                </td>
                <td className="p-4 text-slate-500 font-mono text-[11px]">
                  {new Date(m.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

