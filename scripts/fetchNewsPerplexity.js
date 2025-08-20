// Install dependencies first:
// npm install openai node-fetch dotenv
// run with: node fetch_news.js

import dotenv from "dotenv";
import { themes, prompts } from "./themesAndPrompts.js";
import fs from "fs";
import { supabase } from "./supabase.js";

dotenv.config();

// Fetch articles related to a theme from Perplexity
export async function fetchHealthcareInnovationNews(theme) {
  const userPrompt = prompts[theme];
  console.log("userPrompt: ", userPrompt);

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'sonar-pro',
          messages: [
            // {
            //   role: 'system',
            //   content: 'You are a helpful assistant that fetches news articles from the web. Don\'t include anything beyond JSON.'
            // },
            {
              role: 'user',
              content: userPrompt
            }
          ]
        })
      });

    const data = await response.json();
    let text = data.choices[0].message.content;

    let results;
    // If the output starts with "```json" and ends with "```", remove the ```json and ```
    if (text.startsWith("```json") && text.endsWith("```")) {
      console.log("text starts with ```json and ends with ```");
      text = text.slice(7, -3);
    } else if (text.includes("```json") && text.includes("```")) {
      // Find the last occurrence of ``` to get the proper closing backticks
      const jsonStart = text.indexOf("```json") + 7;
      const jsonEnd = text.lastIndexOf("```");
      if (jsonEnd > jsonStart) {
        text = text.slice(jsonStart, jsonEnd);
      } else {
        console.log("Invalid JSON formatting - closing backticks before opening");
        console.log("text starts with: ", text.slice(0, 100));
        console.log("text ends with: ", text.slice(-100));
      }
    } else {
      console.log("text does not include ```json and ```");
      console.log("text starts with: ", text.slice(0, 100));
      console.log("text ends with: ", text.slice(-100));
    }

    console.log("text: ", text);

    text = text.trim(); // Remove any leading or trailing whitespace
    
    // Additional validation to prevent empty strings
    if (!text || text.length === 0) {
      console.error("Text is empty after processing - API response may be malformed");
      console.log("Original API response:", data.choices[0].message.content);
      return [];
    }

    try {
      results = JSON.parse(text);
      console.log("results: ", results);
      // Convert the articles to the format expected by Supabase (headline -> title, tags -> [], theme -> theme, isRead -> false, isBookmarked -> false)
      const articles = results.map(({headline, ...rest}) => ({
        ...rest,
        title: headline,
        tags: [],
        theme: theme,
      }));
      console.log("article as expected by Supabase: ", articles);
      return articles;
    } catch {
      console.error("Model output was not valid JSON, raw output below:");
      console.log(text);
      // return an empty array
      return [];
    }
  } catch (err) {
    console.error("Error calling Perplexity API:", err);
  }
}

// Fetch articles for all themes from Perplexity
export async function fetchAllArticles() {
    const allArticles = [];
    
    for (const theme of themes) {
      if (prompts[theme] && prompts[theme].trim() !== "") {
        console.log("Fetching articles for theme: ", theme);
        const articles = await fetchHealthcareInnovationNews(theme);
        if (articles && articles.length > 0) {
          allArticles.push(...articles);
        }
      } else {
        console.log(`Skipping theme "${theme}" - no prompt defined`);
      }
    }

    // Save articles to a JSON file
    fs.writeFileSync("scripts/articles.json", JSON.stringify(allArticles, null, 2));
    console.log("Articles saved to scripts/articles.json");
    
    return allArticles; // Return the articles
  }

// Upload articles to Supabase
export async function uploadArticlesToSupabase(articles) {
    // Convert the articles to the format expected by Supabase
    // This entails turning heading key into title and adding a sourceLogo field
    const { data, error } = await supabase
      .from('articles')
      .insert(articles);

    if (error) {
      console.error("Error uploading articles to Supabase:", error);
    } else {
      console.log("Articles uploaded to Supabase successfully");
    }
  }

// Fetch articles from Supabase
export async function fetchArticlesFromSupabase() {
  const { data, error } = await supabase
    .from('articles')
    .select('*');

  if (error) {
    console.error("Error fetching articles from Supabase:", error);
  } else {
    console.log("Articles fetched from Supabase successfully");
    return data;
  }
}