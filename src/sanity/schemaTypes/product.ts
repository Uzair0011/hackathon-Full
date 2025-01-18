//schema
import { defineType } from "sanity";
// structure of your content
export const Product = defineType({
  // backend
  name: "product",
  //   UI show
  title: "Product Shoes",
  //   document type
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "title",
      title: "Title Name",
      type: "string",
    },
    {
      name: "gender",
      title: "Gender Shoes",
      type: "string",
    },
    {
      name: "color",
      title: "Color",
      type: "string",
    },
    {
      name: "price",
      title: "Title Price",
      type: "number",
    },
    {
      name: "slug",
      title: "Product Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
      },
    },
  ],
});
