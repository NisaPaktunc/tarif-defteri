import { useState, useEffect } from "react";
import RecipeForm from "../components/recipeForm";
import RecipeList from "../components/recipeList";
import { CATEGORIES } from "../interfaces/recipeInterface";

export default function HomePage() {
  const [recipes, setRecipes] = useState(() => {
    // Sayfa açılınca localStorage'dan tarifleri yükle
    const saved = localStorage.getItem("tarifler");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [search, setSearch] = useState("");

  // Tarifler değişince localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("tarifler", JSON.stringify(recipes));
  }, [recipes]);

  const handleAdd = (recipe) => setRecipes([...recipes, recipe]);

  const handleDelete = (id) => {
    if (window.confirm("Bu tarifi silmek istediğine emin misin?")) {
      setRecipes(recipes.filter((r) => r.id !== id));
    }
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = (updatedRecipe) => {
    setRecipes(recipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r)));
    setEditingRecipe(null);
  };

  const filtered = recipes
    .filter((r) => selectedCategory === "Tümü" || r.category === selectedCategory)
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-pink-50">
      <header className="bg-linear-to-r from-orange-500 to-pink-500 text-white py-10 shadow-xl">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow">🍳 Tarif Defterim</h1>
          <p className="text-orange-100 mt-2 text-lg">Tüm tariflerini bir yerde topla, puan ver, keşfet!</p>
          <div className="flex gap-6 mt-4">
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-extrabold">{recipes.length}</p>
              <p className="text-xs text-orange-100">Toplam Tarif</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-extrabold">{CATEGORIES.length}</p>
              <p className="text-xs text-orange-100">Kategori</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <RecipeForm
          onAdd={handleAdd}
          editingRecipe={editingRecipe}
          onUpdate={handleUpdate}
          onCancel={() => setEditingRecipe(null)}
        />

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedCategory("Tümü")}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 ${
              selectedCategory === "Tümü"
                ? "bg-orange-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
            }`}
          >
            🍴 Tümü
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 ${
                selectedCategory === cat.name
                  ? "bg-orange-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-orange-50 border border-gray-200"
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <input
            className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-orange-400 transition shadow-sm"
            placeholder="🔍 Tarif ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p className="text-gray-500 mb-4 font-semibold">
          📋 {filtered.length} tarif listeleniyor
        </p>

        <RecipeList recipes={filtered} onDelete={handleDelete} onEdit={handleEdit} />
      </main>
    </div>
  );
}