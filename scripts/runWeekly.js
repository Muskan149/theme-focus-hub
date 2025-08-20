import { fetchAllArticles, uploadArticlesToSupabase } from "./fetchNewsPerplexity.js";

// Run the function weekly 
  export async function runWeekly() {
    const articles = await fetchAllArticles();
    if (articles?.length) {
      console.log("Articles fetched from Perplexity successfully: ", articles);
      await uploadArticlesToSupabase(articles);
      console.log("Articles uploaded to Supabase successfully");
    } else {
      console.log("No articles to upload this run.");
    }
  }

  // Only run when executed directly: `node runWeekly.js`
if (import.meta && import.meta.url === `file://${process.argv[1]}`) {   
  runWeekly().catch(console.error);
}