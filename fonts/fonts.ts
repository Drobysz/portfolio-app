// Google fonts import
import { Climate_Crisis, Cinzel, Jersey_15, Jersey_25, Courier_Prime, B612_Mono, Audiowide, Baumans, Inter, Odibee_Sans, Bagel_Fat_One, Bebas_Neue, Handjet } from 'next/font/google';

// Local font tool
import localFont from 'next/font/local'


// Google fonts
export const climate_crisis = Climate_Crisis({
    subsets: ['latin'],
    display: 'swap',
  });

export const bebas_neue = Bebas_Neue({
    weight: '400',
    subsets: ['latin']
  });

export const handjet = Handjet({
    weight: '400',
    subsets: ['latin']
  });

export const bagel_fat_one = Bagel_Fat_One({
    weight: '400',
    subsets: ['latin'],
  });

export const odibee_sans = Odibee_Sans({
    weight: '400',
    subsets: ['latin'],
  });

export const cinzel = Cinzel({
    subsets: ['latin'],
    display: 'swap',
  });

export const jersey_15 = Jersey_15({
    weight: '400',
    subsets: ['latin'],
  });

export const jersey_25 = Jersey_25({
    weight: '400',
    subsets: ['latin'],
  });

export const courier_prime = Courier_Prime({
    weight: '700',
    subsets: ['latin'],
  });

export const b216 = B612_Mono({
    weight: '700',
    subsets: ['latin'],
  });

export const audiowide = Audiowide({
    weight: '400',
    subsets: ['latin'],
  });

export const baumans = Baumans({
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

export const fs163 = localFont({
  src: "./Freestyle163.ttf"
});

export const kiloy = localFont({
  src: "./Kiloy.ttf"
});

export const p_idols = localFont({
  src: "./Punk_Idols.ttf"
});

export const tronecal = localFont({
  src: "./TRONECAL.ttf"
});