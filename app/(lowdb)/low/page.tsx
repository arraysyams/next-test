import { Metadata } from "next";
// import { categories } from "./categories";
// import { items } from "./items";
// import { JSONFilePreset } from "lowdb/node";

export const metadata: Metadata = {
  title: "Low DB Alternative 2",
  description: "Basically, it's that same json file but hosted in public folder",
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

// async function listCategories() {
//   "use server";
//   const db = await JSONFilePreset("categories.json", { categories: [] as Category[] });
//   const { categories } = db.data;
//   return categories;
// }

// async function listItems() {
//   "use server";
//   const db = await JSONFilePreset("items.json", { items: [] as Item[] });
//   const { items } = db.data;
//   return items;
// }

async function getJSON(url: string) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export default async function LowDBDemo() {
  const rootURL = process.env.WEBSITE_ROOT;
  const { categories }: { categories: Category[] } = await getJSON(`${rootURL}/categories.json`);
  const { items }: { items: Item[] } = await getJSON(`${rootURL}/items.json`);
  // const categories = await listCategories();
  // const items = await listItems();

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
