/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'pastel': {
          'green' : '#d2e7d6',
          'black' : '#1d1c1a',
        }, 
        
      },
      fontFamily: {
        pBlack: ["PoppinsBlack", "sans-serif"],
        pBold: ["PoppinsBold", "sans-serif"],
        pEbold: ["PoppinsExtraBold", "sans-serif"],
        pElight: ["PoppinsExtraLight", "sans-serif"],
        pLight: ["PoppinsLight", "sans-serif"],
        pMedium: ["PoppinsMedium", "sans-serif"],
        pRegular: ["PoppinsRegular", "sans-serif"],
        pSemiBold: ["PoppinsSemiBold", "sans-serif"],
        pThin: ["PoppinsThin", "sans-serif"],
      },
      borderRadius: {
        'custom': '28px',
      },
    },
  },
  plugins: [],
}

