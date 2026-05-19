import type { Metadata } from "next";
import { ArticleLayout } from "@/components/article-layout";
import { getPage, getSectionPages } from "@/lib/content";
import { notFound } from "next/navigation";

const SECTION = "partie-logicielle";

export async function generateMetadata(): Promise<Metadata> {
  const page = getPage(SECTION);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/${SECTION}` },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: `/${SECTION}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
    },
  };
}

export default function SectionIndex() {
  const page = getPage(SECTION);
  if (!page) notFound();
  const related = getSectionPages(SECTION).map((p) => ({
    title: p.meta.title,
    href: `/${SECTION}/${p.meta.slug}`,
  }));
  return <ArticleLayout page={page} related={related} />;
}
