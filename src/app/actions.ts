"use server";

import { Sort } from "../types/memory";
import { db, memories } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { z } from "zod";

const MemorySchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  image: z.string().url(),
  date: z.string(),
});

export async function createMemory(data: z.infer<typeof MemorySchema>) {
  const parsed = MemorySchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid input");

  await db.insert(memories).values(parsed.data);
}

export async function updateMemory(
  id: number,
  data: z.infer<typeof MemorySchema>
) {
  const parsed = MemorySchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid input");

  await db.update(memories).set(parsed.data).where(eq(memories.id, id));
}

export async function getMemory(id: number) {
  const memory = await db.select().from(memories).where(eq(memories.id, id));
  return memory.length > 0 ? memory[0] : null;
}

export async function getMemories(page: number, limit: number, sort: Sort) {
  const offset = (page - 1) * limit;

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(memories);

  const data = await db
    .select()
    .from(memories)
    .orderBy(sort === "oldest" ? memories.date : desc(memories.date))
    .limit(Number(limit))
    .offset(Number(offset));

  return {
    memories: data,
    total: Number(count),
  };
}

export async function deleteMemory(id: number) {
  await db.delete(memories).where(eq(memories.id, id));
}
