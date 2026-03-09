import { useState } from "react";
import { CATEGORY_COLORS, CATEGORIES } from "../interfaces/recipeInterface";

export default function RecipeCard({ recipe, onDelete, onEdit }) {
  const [hovered, setHovered] = useState(false);
  const colorClass = CATEGORY_COLORS[recipe.category] || "bg-gray-100 text-gray-700";
  const categoryEmoji = CATEGORIES.find((c) => c.name === recipe.category)?.emoji || "🍴";

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
    ));
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3 border-2 border-transparent
        transition-all duration-300 cursor-pointer
        ${hovered ? "shadow-2xl -translate-y-1 border-orange-300 scale-[1.02]" : ""}
      `}
      style={{ transform: hovered ? "translateY(-4px)" : "translateY(0)" }}
    >
      {/* Üst Kısım */}
      <div className="flex justify-between items-center">
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${colorClass}`}>
          {categoryEmoji} {recipe.category}
        </span>
        <span className="text-gray-400 text-sm font-medium">⏱ {recipe.cookTime}</span>
      </div>

      {/* Başlık */}
      <h3 className="text-xl font-extrabold text-gray-800">{recipe.name}</h3>

      {/* Yıldızlar */}
      <div className="flex gap-1">{renderStars(recipe.rating || 0)}</div>

      {/* Malzemeler */}
      <div className="bg-orange-50 rounded-xl p-3">
        <p className="text-xs font-bold text-orange-500 mb-1">🧂 MALZEMELER</p>
        <p className="text-sm text-gray-600">{recipe.ingredients}</p>
      </div>

      {/* Yapılış */}
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-xs font-bold text-gray-500 mb-1">👨‍🍳 YAPILIŞI</p>
        <p className="text-sm text-gray-600 line-clamp-3">{recipe.instructions}</p>
      </div>

      {/* Butonlar */}
      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={() => onEdit(recipe)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-2 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-blue-200"
        >
          ✏️ Düzenle
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold py-2 rounded-xl transition-all duration-200 text-sm shadow-md hover:shadow-red-200"
        >
          🗑️ Sil
        </button>
      </div>
    </div>
  );
}