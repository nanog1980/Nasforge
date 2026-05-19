import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/article-layout";
import { getPage, getSectionPages, getSectionSlugs } from "@/lib/content";

const SECTION = "partie-logicielle";

export async function generateStaticParams() {
  return getSectionSlugs(SECTION).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug, SECTION);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/${SECTION}/${slug}` },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: `/${SECTION}/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
    },
  };
}

export default async function SectionArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPage(slug, SECTION);
  if (!page) notFound();

  const related = getSectionPages(SECTION)
    .filter((p) => p.meta.slug !== slug)
    .map((p) => ({
      title: p.meta.title,
      href: `/${SECTION}/${p.meta.slug}`,
    }));

  return <ArticleLayout page={page} related={related} />;
}
