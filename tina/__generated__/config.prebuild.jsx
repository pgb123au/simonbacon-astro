// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Site Content",
        path: "content",
        format: "json",
        match: { include: "site" },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Text" },
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "ctaText", label: "Button Text" },
              { type: "string", name: "ctaLink", label: "Button Link" }
            ]
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              { type: "string", name: "paragraphs", label: "Paragraphs", list: true, ui: { component: "textarea" } },
              { type: "string", name: "imageCaption", label: "Image Caption" }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Details",
            fields: [
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "phoneLink", label: "Phone Link (tel format)" },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "office", label: "Office Address", ui: { component: "textarea" } },
              { type: "string", name: "hours", label: "Hours", ui: { component: "textarea" } },
              { type: "string", name: "consultations", label: "Consultations Text", ui: { component: "textarea" } },
              { type: "string", name: "formAction", label: "Form Action URL" },
              { type: "string", name: "pageSubtitle", label: "Page Subtitle" }
            ]
          },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              { type: "string", name: "title", label: "Page Title" },
              { type: "string", name: "description", label: "Meta Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "copyright", label: "Copyright" },
              { type: "string", name: "disclaimer", label: "Disclaimer" }
            ]
          }
        ]
      },
      {
        name: "career",
        label: "Career Timeline",
        path: "content",
        format: "json",
        match: { include: "career" },
        fields: [
          { type: "string", name: "subtitle", label: "Section Subtitle" },
          {
            type: "object",
            name: "items",
            label: "Timeline Items",
            list: true,
            fields: [
              { type: "string", name: "year", label: "Year / Period" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      {
        name: "expertise",
        label: "Areas of Expertise",
        path: "content",
        format: "json",
        match: { include: "expertise" },
        fields: [
          { type: "string", name: "subtitle", label: "Section Subtitle" },
          {
            type: "object",
            name: "items",
            label: "Expertise Cards",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          }
        ]
      },
      {
        name: "media",
        label: "Media & Features",
        path: "content",
        format: "json",
        match: { include: "media" },
        fields: [
          { type: "string", name: "subtitle", label: "Section Subtitle" },
          {
            type: "object",
            name: "items",
            label: "Media Items",
            list: true,
            fields: [
              { type: "string", name: "source", label: "Source" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "link", label: "Link URL" },
              { type: "string", name: "linkText", label: "Link Text" }
            ]
          }
        ]
      },
      {
        name: "publications",
        label: "Publications",
        path: "content",
        format: "json",
        match: { include: "publications" },
        fields: [
          {
            type: "object",
            name: "familyLawReview",
            label: "Family Law Review",
            fields: [
              { type: "string", name: "description", label: "Section Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "articles",
                label: "Articles",
                list: true,
                fields: [
                  { type: "string", name: "year", label: "Year" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "journal", label: "Journal Reference" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "lawInstituteJournal",
            label: "Law Institute Journal",
            fields: [
              {
                type: "object",
                name: "articles",
                label: "Articles",
                list: true,
                fields: [
                  { type: "string", name: "year", label: "Year" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "journal", label: "Journal Reference" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "podcasts",
            label: "Podcast Appearances",
            fields: [
              { type: "string", name: "description", label: "Section Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "episodes",
                label: "Episodes",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "link", label: "Link URL" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "news",
            label: "News Coverage",
            list: true,
            fields: [
              { type: "string", name: "source", label: "Source" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "link", label: "Link URL" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
