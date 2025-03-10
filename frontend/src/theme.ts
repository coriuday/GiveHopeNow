// Our brand colors
const colors = {
  primary: {
    50: '#fbeaec',
    100: '#f5d0d4',
    200: '#eba6ad',
    300: '#e27c87',
    400: '#e63946', // Main primary color
    500: '#d92638',
    600: '#c01f30',
    700: '#a71a29',
    800: '#8e1623',
    900: '#75131d',
  },
  secondary: {
    50: '#e6f0f5',
    100: '#cce1eb',
    200: '#99c3d7',
    300: '#66a5c3',
    400: '#457b9d', // Main secondary color
    500: '#3b6a88',
    600: '#325973',
    700: '#28485e',
    800: '#1f3748',
    900: '#152633',
  },
  accent: {
    50: '#fef4e9',
    100: '#fde9d3',
    200: '#fbd3a7',
    300: '#f9bd7b',
    400: '#f4a261', // Main accent color
    500: '#f08c47',
    600: '#ec762e',
    700: '#d66116',
    800: '#b05012',
    900: '#8a3f0f',
  },
  darkBlue: '#1d3557',
  lightBlue: '#a8dadc',
  background: '#f1faee',
  white: '#ffffff',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
}

// Font styles
const fonts = {
  body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

// Component styles
const components = {
  Button: {
    variants: {
      primary: {
        bg: 'primary.400',
        color: 'white',
        _hover: { bg: 'primary.500' },
        borderRadius: 'full',
      },
      secondary: {
        bg: 'secondary.400',
        color: 'white',
        _hover: { bg: 'secondary.500' },
        borderRadius: 'full',
      },
      outline: {
        bg: 'transparent',
        color: 'primary.400',
        border: '2px solid',
        borderColor: 'primary.400',
        _hover: { bg: 'primary.50' },
        borderRadius: 'full',
      },
      donate: {
        bg: 'primary.400',
        color: 'white',
        _hover: { bg: 'primary.500', transform: 'translateY(-2px)' },
        borderRadius: 'full',
        px: 8,
        py: 6,
        fontSize: 'lg',
        fontWeight: 'medium',
        transition: 'all 0.3s',
        boxShadow: 'lg',
      }
    }
  },
  Heading: {
    baseStyle: {
      fontWeight: '700',
      lineHeight: '1.2',
    }
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        overflow: 'hidden',
        transition: 'all 0.3s',
        _hover: {
          transform: 'translateY(-8px)',
          boxShadow: 'xl'
        }
      }
    }
  }
}

// Theme configuration
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// Create and export the theme
const theme = { colors, fonts, components, config }
export default theme 