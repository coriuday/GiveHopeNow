import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold text-gray-700 dark:text-gray-300">Links</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link to="/" className="hover:underline text-gray-600 dark:text-gray-400">Home</Link>
              </li>
              <li className="mt-2">
                <Link to="/about" className="hover:underline text-gray-600 dark:text-gray-400">About</Link>
              </li>
              <li className="mt-2">
                <Link to="/donate" className="hover:underline text-gray-600 dark:text-gray-400">Donate</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold text-gray-700 dark:text-gray-300">Legal</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link to="/terms" className="hover:underline text-gray-600 dark:text-gray-400">Terms</Link>
              </li>
              <li className="mt-2">
                <Link to="/privacy" className="hover:underline text-gray-600 dark:text-gray-400">Privacy</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold text-gray-700 dark:text-gray-300">Social</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <a href="#" className="hover:underline text-gray-600 dark:text-gray-400">Facebook</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline text-gray-600 dark:text-gray-400">Twitter</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline text-gray-600 dark:text-gray-400">Instagram</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold text-gray-700 dark:text-gray-300">Company</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link to="/contact" className="hover:underline text-gray-600 dark:text-gray-400">Contact</Link>
              </li>
              <li className="mt-2">
                <Link to="/careers" className="hover:underline text-gray-600 dark:text-gray-400">Careers</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center py-4 bg-gray-200 dark:bg-gray-700">
        <p className="text-sm text-gray-700 dark:text-gray-300">© 2023 GiveHopeNow. All rights reserved.</p>
      </div>
    </footer>
  );
}