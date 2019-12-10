import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '14px',
  baseLineHeight: 1.5,
  headerFontFamily: ['Montserrat', 'sans-serif'],
  bodyFontFamily: ['Montserrat', 'sans-serif'],
  headerGray: 0,
  bodyGray: 0,
  blockMarginBottom: '0',
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['400', '400i', '700', '800'],
    },
  ],
  overrideStyles: ({ adjustFontSizeTo }) => ({
    h1: {
      ...adjustFontSizeTo('40px'),
      fontWeight: '800',
    },
    h2: {
      ...adjustFontSizeTo('34px'),
    },
  }),
});

export default typography;
