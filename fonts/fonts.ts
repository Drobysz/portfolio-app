// Google fonts import
import { Inter, Bagel_Fat_One, Handjet } from 'next/font/google';

// Local font tool
import localFont from 'next/font/local'


// Google fonts
export const handjet = Handjet({
    weight: '400',
    subsets: ['latin']
  });

export const bagel_fat_one = Bagel_Fat_One({
    weight: '400',
    subsets: ['latin'],
  });

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
  });


// Local fonts
export const skp59 = localFont({
  src: "./SK_P59.ttf"
});

export const avenir = localFont({
  src: "./Avenir.ttf"
});

export const impact = localFont({
  src: "./impact.ttf"
});

export const doppelganger = localFont({
  src: "./Doppelganger-Display.ttf"
});

export const tronecal = localFont({
  src: "./TRONECAL.ttf"
});