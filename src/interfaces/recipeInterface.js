export const createRecipe = (id, name, ingredients, instructions, category, cookTime, rating) => ({
  id, name, ingredients, instructions, category, cookTime, rating,
});

export const CATEGORIES = [
  { name: "Kahvaltı", emoji: "🍳" },
  { name: "Ana Yemek", emoji: "🍽️" },
  { name: "Çorba", emoji: "🥣" },
  { name: "Tatlı", emoji: "🍰" },
  { name: "Salata", emoji: "🥗" },
  { name: "İçecek", emoji: "🥤" },
];

export const CATEGORY_COLORS = {
  "Kahvaltı": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Ana Yemek": "bg-red-100 text-red-700 border-red-300",
  "Çorba": "bg-orange-100 text-orange-700 border-orange-300",
  "Tatlı": "bg-pink-100 text-pink-700 border-pink-300",
  "Salata": "bg-green-100 text-green-700 border-green-300",
  "İçecek": "bg-blue-100 text-blue-700 border-blue-300",
};