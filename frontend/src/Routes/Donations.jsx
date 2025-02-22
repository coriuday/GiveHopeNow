// import React from 'react';

export default function Donations() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-3xl font-bold">Donations</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Previous Donations</h2>
            <p className="dark:text-gray-300">Details about previous donations.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Current Donations</h2>
            <p className="dark:text-gray-300">Details about current donation opportunities.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Upcoming Donations</h2>
            <p className="dark:text-gray-300">Information about upcoming donation events.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Crowdfunding Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
