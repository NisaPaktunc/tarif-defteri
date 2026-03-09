import { useState } from "react";
import { CATEGORIES } from "../interfaces/recipeInterface";

export default function RecipeForm({ onAdd, editingRecipe, onUpdate, onCancel }) {
  const [form, setForm] = useState(
    editingRecipe || { name: "", ingredients: "", instructions: "", category: "Ana Yemek", cookTime: "", rating: 0 }
  );

  const handleSubmit = () => {
    if (!form.name || !form.ingredients || !form.instructions) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    if (editingRecipe) {
      onUpdate(form);
    } else {
      onAdd({ ...form, id: Date.now() });
    }
    setForm({ name: "", ingredients: "", instructions: "", category: "Ana Yemek", cookTime: "", rating: 0 });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-100">
      <h2 className="text-2xl font-extrabold text-orange-500 mb-6">
        {editingRecipe ? "✏️ Tarifi Güncelle" : "➕ Yeni Tarif Ekle"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-orange-400 transition"
          placeholder="🍴 Tarif Adı"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-orange-400 transition"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.emoji} {cat.name}
            </option>
          ))}
        </select>

        <input
          className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-orange-400 transition"
          placeholder="⏱ Pişirme Süresi (örn: 30 dk)"
          value={form.cookTime}
          onChange={(e) => setForm({ ...form, cookTime: e.target.value })}
        />

        <input
          className="border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-orange-400 transition"
          placeholder="🧂 Malzemeler (virgülle ayır)"
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        />

        <textarea
          className="border-2 border-gray-200 rounded-xl p-3 md:col-span-2 focus:outline-none focus:border-orange-400 transition"
          placeholder="👨‍🍳 Yapılış Tarifleri..."
          rows={3}
          value={form.instructions}
          onChange={(e) => setForm({ ...form, instructions: e.target.value })}
        />

        {/* Yıldız Puanlama */}
        <div className="md:col-span-2">
          <p className="text-sm font-bold text-gray-500 mb-2">⭐ Puan Ver:</p>
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setForm({ ...form, rating: i + 1 })}
                className={`text-3xl transition-transform hover:scale-125 ${
                  i < form.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-200"
        >
          {editingRecipe ? "✅ Güncelle" : "➕ Tarif Ekle"}
        </button>
        {editingRecipe && (
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 active:scale-95 text-gray-700 font-bold py-3 px-8 rounded-xl transition-all duration-200"
          >
            İptal
          </button>
        )}
      </div>
    </div>
  );
}