const baselightTheme = {
  direction: 'ltr',
  palette: {
    primary: {
      main: '#1976d2',
      light: '#ECF2FF',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#e3c3e9',
      dark: '#7b1fa2',
    },
    success: {
      main: '#2e7d32',
      light: '#b7e0b8',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288d1',
      light: '#EBF3FE',
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#FDEDE8',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ed6c02',
      light: '#FEF5E5',
      dark: '#e65100',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    background: {
      default: '#F0F4F9',
      // default: '#fff',
      paper: '#fff',
      paper_material: '#F0F4F9',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547',
    },
    text: {
      primary: '#2A3547',
      secondary: '#2A3547',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
  },
};

const baseDarkTheme = {
  direction: 'ltr',
  palette: {
    primary: {
      main: '#1976d2',
      light: '#0d3d73',
      dark: '#3a91e8',
    },
    secondary: {
      main: '#9c27b0',
      light: '#4a1361',
      dark: '#be3ed4',
    },
    success: {
      main: '#2e7d32',
      light: '#103813',
      dark: '#40af46',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288d1',
      light: '#01345d',
      dark: '#12aafd',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#771818',
      dark: '#dc5959',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ed6c02',
      light: '#8a3100',
      dark: '#e37a7a',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#333F55',
      200: '#465670',
      300: '#7C8FAC',
      400: '#DFE5EF',
      500: '#EAEFF4',
      600: '#F2F6FA',
    },
    text: {
      primary: '#EAEFF4',
      secondary: '#7C8FAC',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#333F55',
    },
    divider: '#333F55',
    background: {
      default: '#333438',
      // default: '#282828',
      dark: '#535353',
      paper: '#282828',
      paper_material: '#333438',
    },
  },
};

export { baseDarkTheme, baselightTheme };
