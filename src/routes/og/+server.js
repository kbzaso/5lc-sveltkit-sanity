import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import NotoSans from "$lib/NotoSans-Regular.ttf";
import { html as toReactNode } from "satori-html";
import OGCard from "$lib/components/OGCard.svelte";

const height = 315;
const width = 600;

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
  const message = url.searchParams.get("message") ?? undefined;
  const result = OGCard.render({ message });
  const element = toReactNode(
    `${result.html}<style>${result.css.code}</style>`
  );

  const svg = await satori(element, {
    fonts: [
      {
        name: "Noto Sans",
        data: Buffer.from(NotoSans),
        style: "normal",
      },
    ],
    height,
    width,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
  });

  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: {
      "content-type": "image/png",
    },
  });
};
