import React from "react";

export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Prox: 高速プロキシ検索エンジン</h1>
      <form method="GET" action="/api/search">
        <input
          type="text"
          name="q"
          placeholder="検索ワードを入力..."
          style={{ width: "80%", padding: "0.5rem", fontSize: "1rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem", marginLeft: "1rem" }}>
          検索
        </button>
      </form>
    </div>
  );
}
