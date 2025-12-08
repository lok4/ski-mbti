```
import { supabase } from "@/lib/supabaseClient";
import HomeContent from "@/components/home/HomeContent";

// Revalidate data every 60 seconds to keep count fresh but performant
export const revalidate = 60;

export default async function Home() {
  const BASE_COUNT = 988;
  let totalCount = BASE_COUNT;

  try {
    const { count, error } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    if (!error && count !== null) {
      totalCount = BASE_COUNT + count;
    }
  } catch (e) {
    console.error("Failed to fetch count", e);
  }

  return <HomeContent participantCount={totalCount} />;
}
```
