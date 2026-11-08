'use client'

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-330px)] items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-3xl flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-8">
        <div className="flex shrink-0 flex-col items-center">
          <img
            src="/photo.jpg"
            alt="Parichard Somroop"
            className="h-40 w-40 rounded-xl object-cover shadow-sm"
          />

          <div className="mt-3 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm">
            <h1 className="whitespace-nowrap font-bold">
              Parichard Somroop
            </h1>
          </div>
        </div>

        <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-6 text-left shadow-sm md:mt-0">
          <h1 className="text-xl font-bold">
            Currently studying
          </h1>

          <p className="mt-2">
            CSI205 Front-End Software Development
          </p>

          <ul className="ml-5 mt-2 list-disc">
            <li>UX/UI Fundamentals</li>
            <li>Traditional HTML/CSS/JS</li>
            <li>React Web Applications</li>
            <li>Back-End Preparation</li>
            <li>DevOps Fundamentals</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
