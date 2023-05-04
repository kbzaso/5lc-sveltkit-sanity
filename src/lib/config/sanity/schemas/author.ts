import { UserIcon } from "@sanity/icons";
import { defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Fotografo/a",
  icon: UserIcon,
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Image URL",
      name: "imageUrl",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    },
  ],
});
