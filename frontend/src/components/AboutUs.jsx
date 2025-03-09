export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          About GiveHopeNow
        </h1>
        <div className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          <p className="mb-6">
            GiveHopeNow is a donation platform built to make giving simple and impactful. 
            Our mission is to connect donors with causes that matter, ensuring every contribution 
            is handled with transparency and efficiency.
          </p>
          <p className="mb-6">
            Whether you care about health, education, or poverty alleviation, 
            GiveHopeNow empowers you to support meaningful change with confidence.
          </p>
          <p>
            Join us in making a difference, one donation at a time.
          </p>
        </div>
      </div>
    </div>
  );
}