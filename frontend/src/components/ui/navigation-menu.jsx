import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import PropTypes from 'prop-types';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../../App';
import { useContext } from 'react';

const NavigationMenu = React.forwardRef(({ className, children, isAuthenticated, onLogout, ...props }, ref) => (



  <NavigationMenuPrimitive.Root
    ref={ref}
    className={className}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

NavigationMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,








};

const NavigationMenuList = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={className}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.List>
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

NavigationMenuList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

const NavigationMenuLink = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={className}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Link>
));
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

NavigationMenuLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-gray-900 dark:text-gray-100" />
      ) : (
        <Moon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
      )}
    </button>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
};
