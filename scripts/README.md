# News Fetching Scripts

This directory contains Python scripts for fetching news articles using the Perplexity API.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Set up your Perplexity API key:
   - Get your API key from [Perplexity AI](https://www.perplexity.ai/settings/api)
   - Set it as an environment variable:
     ```bash
     export PERPLEXITY_API_KEY="your-api-key-here"
     ```
   - Or create a `.env` file in this directory:
     ```
     PERPLEXITY_API_KEY=your-api-key-here
     ```

## Usage

### Basic Usage

```python
from fetch_news import fetch_articles_from_perplexity

# Fetch articles
articles = fetch_articles_from_perplexity("artificial intelligence", max_results=5)

# Print results
for article in articles["articles"]:
    print(f"Title: {article['title']}")
    print(f"Source: {article['source']}")
    print(f"URL: {article['url']}")
    print("---")
```

### Command Line Usage

Run the script directly to see example usage:

```bash
python fetch-news.py
```

### Function Parameters

- `query` (str): Search query for articles
- `api_key` (str, optional): Perplexity API key (defaults to environment variable)
- `max_results` (int): Maximum number of results (default: 10)
- `focus` (str): Focus area - "news", "academic", "writing", "youtube", "reddit", "wolfram", "finance" (default: "news")
- `timezone` (str): Timezone for results (default: "UTC")

### Output Format

The function returns a dictionary with the following structure:

```json
{
  "articles": [
    {
      "title": "Article title",
      "url": "Article URL", 
      "source": "Source name",
      "published_date": "YYYY-MM-DD",
      "summary": "Brief summary",
      "content": "Main content"
    }
  ],
  "query": "search query",
  "total_results": 5,
  "search_timestamp": "2024-01-01T12:00:00"
}
```

## Error Handling

The script includes comprehensive error handling for:
- Missing API key
- Network errors
- Invalid responses
- JSON parsing errors

## Output Files

Articles can be saved to JSON files using the `save_articles_to_file()` function. Files are saved in the `output/` directory with timestamps. 