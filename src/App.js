import React, { useEffect, useState } from "react";

// Directly using your API key here
const API_KEY = "a38389b4b9e94edebb610b78a8248dcd";

const countries = {
  in: "India",
  us: "USA",
  gb: "UK",
  ca: "Canada",
  au: "Australia",
  de: "Germany",
  fr: "France",
  jp: "Japan",
};

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("in");

  const fetchNews = async (search = "", countryCode = "in") => {
    let url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${API_KEY}`;
    if (search) {
      url = `https://newsapi.org/v2/everything?q=${search}&language=en&apiKey=${API_KEY}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews("", country);
  }, [country]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query, country);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🌍 GlobalPulse</h1>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="country-select">Choose Country: </label>
        <select
          id="country-select"
          value={country}
          onChange={(e) => {
            setQuery("");
            setCountry(e.target.value);
          }}
        >
          {Object.entries(countries).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px", marginLeft: "10px" }}>
          Search
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
