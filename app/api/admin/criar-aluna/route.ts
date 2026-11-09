import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { requerMentora } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  await requerMentora();

  const { email, nome } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ erro: "Email obrigatório." }, { status: 400 });
  }

  const password = process.env.PASSWORD_INICIAL ?? randomBytes(9).toString("base64url");
  const admin = createAdminClient();

  const { data, error } = await admin.auth.admin.createUser({
    email: email.trim().toLowerCase(),
    password,
    email_confirm: true,
    user_metadata: nome ? { nome } : undefined,
  });

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, id: data.user?.id, password });
}
