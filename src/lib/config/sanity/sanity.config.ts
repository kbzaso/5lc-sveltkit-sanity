import { defineConfig, type Slug } from "sanity";
import { DataPreview } from "./components/DataPreview";
import app from "../app";
import { myStructure } from "./deskStructure";
import {media} from 'sanity-plugin-media'

/*-------------- PLUGINS --------------*/
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
/*------------------------------------*/

/*-------------- SCHEMAS --------------*/
import authorType from "$lib/config/sanity/schemas/author";
import staffType from "$lib/config/sanity/schemas/staff";
import eventType from "$lib/config/sanity/schemas/event";
import settingType from "$lib/config/sanity/schemas/settings";
import welcomeType from "$lib/config/sanity/schemas/welcome";
import disclaimerType from "$lib/config/sanity/schemas/disclaimer";
import discountType from "$lib/config/sanity/schemas/discountCodes";
import faqType from "$lib/config/sanity/schemas/faq";
import agendaType from "$lib/config/sanity/schemas/agenda";
import attractionType from "$lib/config/sanity/schemas/Attraction";
/*------------------------------------*/

export default defineConfig({
  basePath: "/studio",
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  title: app.appName + " - Studio",
  schema: {
    // If you want more content types, you can add them to this array
    types: [staffType, authorType, settingType, welcomeType, eventType, disclaimerType, discountType, faqType, agendaType, attractionType],
  },
  plugins: [
    deskTool({
      structure: myStructure,
      // `defaultDocumentNode is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === "staff" || schemaType === "event") {
          return S.document().views([
            S.view.form(),
            S.view.component(DataPreview).title("Preview"),
          ]);
        }
        return null;
      },
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: "2022-08-08",
    }),
    media(),
  ],
  document: {
    productionUrl: async (prev, { document }) => {
      const url = new URL("/api/preview", location.origin);
      const secret = import.meta.env.VITE_SANITY_PREVIEW_SECRET;
      if (secret) {
        url.searchParams.set("secret", secret);
      }
      try {
        switch (document._type) {
          case "event":
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            url.searchParams.set("slug", (document.slug as Slug).current!);
            url.searchParams.set("type", document._type);
            break;
          case "staff":
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            url.searchParams.set("slug", (document.slug as Slug).current!);
            url.searchParams.set("type", document._type);
            break;
          default:
            return prev;
        }
        return url.toString();
      } catch {
        return prev;
      }
    },
  },
});
