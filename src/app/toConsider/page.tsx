export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>This page serves as a list of things to consider during development
        </h1>
        <ul>
            <li>Overriding layouts: For screens such as login and settings, the root layout is not appropriate\n
                In this case, we need to override the root. Hopefully as simple as creating a new layout within the folder
            </li>
            <li>Data loading: Calendar data needs to be loaded and shared across screens.\n
                If possible, do in layout and pass through, or just pass between pages.\n
                Mitigation- If repeated events stored as one thing with repeat variable, could load entire dataset just fine\n
                Then apply loop within viewed range. Every n days (div sum from start), Set week day.\n
                For ease of calculation, set minimum bound, or at least "bookmark" a later date for ease of calculation
            </li>
            <li>How much to load: Load calendar relative to current selected area. Maybe one or two years in advance</li>
            <li>Calendar view: For ease of development, separate pages, but should not show in navbar as redirect\n
                Use a separate components? And switch within same page. Allows ease of passing data
            </li>
            <li>Passwords: While mainly a prototype, should still use proper practice for account creation/storage</li>
            <li>Graph API: Further research and preparation required</li>
            <li>Tailwind: Grain a basic understanding of Tailwind. Based on current observation, styling can be embedded directly in the classname.\n
                Standard CSS is still available as an alternative, and may be preferable
            </li>
            <li> Outlook only approach. Use Microsoft login authentication, then only read/update via Graph API.\n
              Removes SQL requirement, and passes login to a third party (if possible). Potential approch that requires further thought
            </li>
        </ul>
      </main>
    </div>
  );
}
