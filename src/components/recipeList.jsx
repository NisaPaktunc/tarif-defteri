import RecipeCard from "./recipeCard";

export default function RecipeList({ recipes, onDelete, onEdit }) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-6xl mb-4">🍽️</p>
        <p className="text-xl font-semibold">Henüz tarif eklenmedi!</p>
        <p className="text-sm mt-2">Yukarıdan yeni bir tarif ekleyebilirsin.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}