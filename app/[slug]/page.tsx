import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/article-layout";
import { getPage, getRootSlugs, getSectionPages } from "@/lib/content";

const SECTIONS = ["partie-materielle", "partie-logicielle"] as const;

export async function generateStaticParams() {
  return getRootSlugs()
    .filter((s) => s !== "accueil")
    .map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: `/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
    },
  };
}

export default async function RootPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  let related: { title: string; href: string }[] = [];
  if ((SECTIONS as readonly string[]).includes(slug)) {
    related = getSectionPages(slug).map((p) => ({
      title: p.meta.title,
      href: `/${slug}/${p.meta.slug}`,
    }));
  }

  return <ArticleLayout page={page} related={related} />;
}
