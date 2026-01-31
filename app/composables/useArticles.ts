// composables/useArticles.ts

import articles_seed from './seed_articles.json'

export const useArticles = () => {
  const articles = ref(articles_seed as Article[]);

  // Logic for the Carousel: Latest + 4 Random (Max 5)
  const carouselArticles = computed(() => {
    if (articles.value.length === 0) return []
    const latest = articles.value[0]!
    const others = articles.value.slice(1)
    const shuffled = [...others].sort(() => 0.5 - Math.random())
    return [latest, ...shuffled].slice(0, 5) as Article[]
  })


  // Helper to get a single article
  const getArticleBySlug = (slug: string) => {
    return articles.value.find(article => article.slug === slug)
  }

  return {
    articles,
    carouselArticles,
    getArticleBySlug
  }
}