import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PageMeta = {
  title: string;
  description: string;
  slug: string;
  section: string | null;
};

export type Page = {
  meta: PageMeta;
  content: string;
};

function readPage(filePath: string, section: string | null): Page {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);
  const fm = parsed.data as Partial<PageMeta>;
  return {
    meta: {
      title: fm.title ?? path.basename(filePath, ".mdx"),
      description: fm.description ?? "",
      slug: fm.slug ?? path.basename(filePath, ".mdx"),
      section,
    },
    content: parsed.content,
  };
}

export function getPage(slug: string, section: string | null = null): Page | null {
  const dir = section ? path.join(CONTENT_DIR, section) : CONTENT_DIR;
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return readPage(filePath, section);
}

export function getSectionPages(section: string): Page[] {
  const dir = path.join(CONTENT_DIR, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readPage(path.join(dir, f), section))
    .sort((a, b) => a.meta.title.localeCompare(b.meta.title));
}

export function getRootSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getSectionSlugs(section: string): string[] {
  const dir = path.join(CONTENT_DIR, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
