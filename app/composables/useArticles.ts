// composables/useArticles.ts

import articles_seed from './seed_articles.json'

export const useArticles = () => {
  const articles = ref(articles_seed as Article[]);

  // Helper to get a single article
  const getArticleBySlug = (slug: string) => {
    return articles.value.find(article => article.slug === slug)
  }

  return {
    articles,
    getArticleBySlug
  }
}