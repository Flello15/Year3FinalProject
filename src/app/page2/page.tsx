export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Welcome to the second page. Contents from the layout are still present.\n
          Now to learn how to pass from the layout into the child.\n
          Alternatively, Just read in on initial load and pass around
        </p>
      </main>
    </div>
  );
}
