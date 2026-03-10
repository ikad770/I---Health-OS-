import { DocumentType } from "@prisma/client";
import { addDocumentAction } from "@/features/documents/actions";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function DocumentsPage() {
  const user = await requireUser();
  const dbUser = await prisma.user.findUniqueOrThrow({ where: { email: user.email! } });
  const docs = await prisma.labDocument.findMany({ where: { userId: dbUser.id }, orderBy: { uploadedAt: "desc" } });

  return <main className="space-y-4"><form action={addDocumentAction.bind(null,dbUser.id)} className="glass grid gap-2 p-4 md:grid-cols-2"><input name="title" placeholder="Title" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"/><input name="provider" placeholder="Provider" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"/><select name="documentType" className="rounded-xl border border-white/20 bg-transparent px-3 py-2">{Object.keys(DocumentType).map((v)=><option key={v}>{v}</option>)}</select><input name="file" type="file" accept=".pdf,.png,.jpg,.jpeg" className="rounded-xl border border-white/20 bg-transparent px-3 py-2"/><textarea name="notes" placeholder="Notes" className="md:col-span-2 rounded-xl border border-white/20 bg-transparent px-3 py-2"/><button className="md:col-span-2 rounded-xl bg-blue-500 px-4 py-2">Upload (private)</button></form><section className="space-y-2">{docs.map((d: (typeof docs)[number])=><article key={d.id} className="glass p-4"><p className="font-semibold">{d.title}</p><p className="text-sm text-slate-400">{d.fileName} · {d.mimeType} · {(d.fileSize/1024).toFixed(0)}KB</p><p className="text-xs text-blue-300">Stored as: {d.fileKey} (signed URL retrieval foundation)</p></article>)}</section></main>;
}
