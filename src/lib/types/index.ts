import type { InputValue } from "@portabletext/svelte/ptTypes";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Staff {
  staffType: string;
  _id: string;
  title: string;
  pseudonym: string;
  staffImage: SanityImageSource;
  slug: string;
  imageTitle: SanityImageSource;
  description: InputValue;
  seo_description: string;
  gallery: {
    images: SanityImageSource[];
    author: string[];
  };
  data: {
    weight: number;
    height: number;
    date: string;
  };
  principalPhotographer: {
    photographer: {
      name: string;
      imageUrl: string;
    };
  };
  social: {
    instagram: string;
    twitter: string;
    youtube: string;
    facebook: string;
    tiktok: string;
    other: string;
  };
}

export interface Event {
  gallery: {
    images: SanityImageSource[];
    author: string[];
  };
  _id: string;
  name: string;
  title: string;
  seo_description: string;
  date: string;
  boveda: boolean;
  venue: {
    venueName: string;
    venueUrl: string;
    venueAdress: string;
  };
  ticket: {
    firsts_tickets: {
      price: number;
      amount: number;
    };
    seconds_tickets: {
      price: number;
      amount: number;
    };
    thirds_tickets: {
      price: number;
      amount: number;
    };
  };
  description: InputValue;
  result: InputValue;
  active: boolean;
  extract: string;
  poster: SanityImageSource;
  slug: string;
  videoUrl: string;
  disclaimers: [];
  sell: boolean;
}

export interface Settings {
  title: string;
  description: string;
}

export interface Welcome {
  pretitle: string;
  imageTitle: SanityImageSource;
  textTitle: string;
  description: InputValue;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  total_tickets: number;
  tickets_sold: number;
  assistance: number;
  playlist: string;
}
