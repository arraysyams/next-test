import { Metadata } from "next";
import { JSONFilePreset } from "lowdb/node";

export const metadata: Metadata = {
  title: "Low DB",
  description: "Low DB Example",
};

export type Category = {
  id: number;
  name: string;
};

export type Item = {
  id: number;
  name: string;
  category: number;
};

async function listCategories() {
  "use server";
  const db = await JSONFilePreset("categories.json", { categories: [] as Category[] });
  const { categories } = db.data;
  return categories;
}

async function listItems() {
  "use server";
  const db = await JSONFilePreset("items.json", { items: [] as Item[] });
  const { items } = db.data;
  return items;
}

export default async function LowDBDemo() {
  const categories = await listCategories();
  const items = await listItems();
  return (
    <div className="w-dvw h-dvh p-2 flex flex-col items-center">
      <div className="py-2">Example</div>
      {categories.map((category, keyCategory) => (
        <div key={keyCategory} className="bg-stone-200 dark:bg-stone-800 p-2 my-2">
          <h1 className="font-bold">{category.name}</h1>
          <ul className="list-disc list-inside">
            {items
              .filter((item) => item.category == category.id)
              .map((filteredItem, keyItem) => (
                <li key={keyItem}>{filteredItem.name}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
