import { MonthlyArchive } from "@/components/MonthlyArchive";
import { PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <main className="p-4 flex justify-between">
      <div className="w-4/6">{children}</div>
      <aside className="w-1/5">
        {/* @ts-expect-error Server Component */}
        <MonthlyArchive />
      </aside>
    </main>
  );
}
