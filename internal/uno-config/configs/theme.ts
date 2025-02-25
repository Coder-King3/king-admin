import type { UserConfig } from 'unocss'

const uiColors = {
  // Part: color
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))',
    hover: 'hsl(var(--accent-hover))',
    lighter: 'has(val(--accent-lighter))'
  },
  background: {
    deep: 'hsl(var(--background-deep))',
    DEFAULT: 'hsl(var(--background))'
  },
  foreground: {
    DEFAULT: 'hsl(var(--foreground))'
  },
  heavy: {
    DEFAULT: 'hsl(var(--heavy))',
    foreground: 'hsl(var(--heavy-foreground))'
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))'
  },
  ring: 'hsl(var(--ring))',
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))'
  },

  // Part: element
  border: {
    DEFAULT: 'hsl(var(--border))'
  },
  card: {
    DEFAULT: 'hsl(var(--card))',
    foreground: 'hsl(var(--card-foreground))'
  },
  header: {
    DEFAULT: 'hsl(var(--header))'
  },
  sidebar: {
    deep: 'hsl(var(--sidebar-deep))',
    DEFAULT: 'hsl(var(--sidebar))'
  }
}

const themeColors = {
  destructive: {
    DEFAULT: 'hsl(var(--destructive))'
  },
  info: {
    DEFAULT: 'hsl(var(--info))'
  },
  primary: {
    DEFAULT: 'hsl(var(--primary))'
  },
  success: {
    DEFAULT: 'hsl(var(--success))'
  },
  warning: {
    DEFAULT: 'hsl(var(--warning))'
  }
}

const themeConfig: UserConfig = {
  theme: {
    borderRadius: {
      lg: 'var(--radius) /* 8px */',
      md: 'calc(var(--radius) - 2px) /* 6px */',
      sm: 'calc(var(--radius) - 4px) /* 4px */',
      xl: 'calc(var(--radius) + 4px) /* 12px */'
    },
    boxShadow: {
      float: `0 6px 16px 0 rgb(0 0 0 / 8%),
        0 3px 6px -4px rgb(0 0 0 / 12%),
        0 9px 28px 8px rgb(0 0 0 / 5%)`
    },
    colors: {
      ...uiColors,
      ...themeColors
    },
    fontFamily: {
      sans: [
        'var(--font-family)'
        //  theme('fontFamily.sans')
      ]
    }
  }
}

export { themeConfig }
