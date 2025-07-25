import EditArticleSection from "@/components/Admin/Articles/EditArticleSection";



export default async function EditArticlePage({ params }: {params: Promise<{ slug: string }>}) {
      const resolvedParams = await params;
      const { slug } = resolvedParams;
  return <EditArticleSection slug={slug} />;
}
