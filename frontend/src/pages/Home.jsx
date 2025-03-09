import Footer from './Footer';
import { useContext } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '../components/ui/navigation-menu';
import { ThemeToggle } from '../components/ui/navigation-menu';
import reactLogo from '../assets/react.svg'; // Importing the SVG image
import { AuthContext } from '../AuthContext'; // Importing AuthContext

export default function Home() {
  const { isAuthenticated, logout } = useContext(AuthContext); // Destructure isAuthenticated and logout from AuthContext

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <NavigationMenu className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className={`${navigationMenuTriggerStyle()} dark:text-white`}>
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            {isAuthenticated ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/dashboard" className={`${navigationMenuTriggerStyle()} dark:text-white`}>
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/donate" className={`${navigationMenuTriggerStyle()} dark:text-white`}>
                    Donations
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" onClick={logout} className={`${navigationMenuTriggerStyle()} dark:text-white`}>
                    Logout
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/login" className={`${navigationMenuTriggerStyle()} dark:text-white`}>
                    Login
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/signup" className={`${navigationMenuTriggerStyle()} dark:text-white`}>
                    Sign Up
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenu>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">GiveHopeNow</h1>
          <p className="text-lg mb-8 dark:text-gray-300">
            Support innovative projects and make a difference
          </p>
          <img src={reactLogo} alt="React Logo" className="mx-auto mb-4" /> {/* Adding the image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">Discover Projects</h2>
              <p className="dark:text-gray-300">Explore creative ideas and initiatives</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">Support Creators</h2>
              <p className="dark:text-gray-300">Back projects you believe in</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">Make an Impact</h2>
              <p className="dark:text-gray-300">Help bring innovative ideas to life</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer className="bg-gray-800 dark:bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Crowdfunding Platform. All rights reserved.</p>
        </div>
      </Footer>
    </div>
  );
}
