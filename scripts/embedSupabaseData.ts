import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

const TABLE_NAME = "market_insights";
const TEXT_COLUMN = "content";
const EMBEDDING_COLUMN = "embedding";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function createEmbedding(text: string): Promise<number[]> {
  const resp = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!resp.ok) {
    throw new Error(await resp.text());
  }

  const json = await resp.json();
  return json.data[0].embedding;
}

async function run() {
  const { data: rows, error } = await supabase
    .from(TABLE_NAME)
    .select(`id, ${TEXT_COLUMN}`)
    .is(EMBEDDING_COLUMN, null);

  if (error) throw error;
  if (!rows || rows.length === 0) return;

  for (const row of rows) {
    const embedding = await createEmbedding(row[TEXT_COLUMN]);

    const { error: updateError } = await supabase
      .from(TABLE_NAME)
      .update({ [EMBEDDING_COLUMN]: embedding })
      .eq("id", row.id);

    if (updateError) throw updateError;
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
