export default function Loading() {
  return (
    <main className="p-4 min-h-[80vh] sm:px-6  pb-8  mt-5  lg:px-10 ">
      <section className="grid gap-5 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from(Array(4), (_, i) => i).map((i) => (
          <div
            key={i}
            className="h-48 w-full flex p-5 flex-col gap-5 rounded-lg md:max-w-sm bg-slate-300 border border-slate-400 animate-pulse dark:bg-slate-900 dark:border-slate-800"
          >
            <span className="block bg-slate-400 h-10 w-10 rounded-full animate-pulse delay-100 dark:bg-slate-800" />
            <span className="block bg-slate-400 h-5 w-full rounded-full animate-pulse delay-200 dark:bg-slate-800" />
            <span className="block bg-slate-400 h-5 w-full rounded-full animate-pulse delay-300 dark:bg-slate-800" />
          </div>
        ))}
      </section>
    </main>
  );
}
