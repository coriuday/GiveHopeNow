export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Learn more about our company and our mission.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Our Mission
              </h3>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                We are dedicated to providing innovative solutions that empower
                our users and make their lives easier. Our mission is to create
                technology that is both powerful and accessible to everyone.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Our Team
              </h3>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                Our team consists of passionate professionals who are experts in
                their fields. We work together to create products that we are
                proud to share with the world.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Our Values
            </h3>
            <ul className="mt-4 space-y-4 text-gray-500 dark:text-gray-300">
              <li>• Innovation: We constantly push boundaries to create better solutions</li>
              <li>• Integrity: We believe in doing the right thing, always</li>
              <li>• Collaboration: We work together to achieve great things</li>
              <li>• Customer Focus: Our users are at the heart of everything we do</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
