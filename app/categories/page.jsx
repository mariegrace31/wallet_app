"use client";

import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

export default function CategoriesPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState({ income: [], expense: [] });
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    if (user) {
      const savedTransactions = JSON.parse(localStorage.getItem(user.email)) || [];

      const organizedCategories = savedTransactions.reduce(
        (acc, transaction) => {
          const { category, subcategory, amount } = transaction;
          if (!acc[category]) {
            acc[category] = {};
          }
          if (!acc[category][subcategory]) {
            acc[category][subcategory] = 0;
          }
          acc[category][subcategory] += Number(amount) || 0;
          return acc;
        },
        {}
      );

      setCategories({
        income: organizedCategories.income || {},
        expense: organizedCategories.expense || {},
      });
    }
  }, [user]);

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (!user) {
    return (
      <div className="flex">
        <Sidebar />
        <p className="text-[15px] lg:text-[20px] text-center flex justify-center mx-auto mt-64">
          Please log in to see your categories.
        </p>
      </div>
    );
  }

  return (
    <div className="flex relative">
      <Sidebar />
      <div className="p-8 pt-16 lg:pt-8 mx-auto w-full pl-4 lg:pl-80">
        <h2 className="text-lg lg:text-2xl font-semibold text-wallet_red_100">
          Categories
        </h2>
        {Object.entries(categories).map(([category, subcategories]) => (
          <div key={category} className="mt-4">
            
            <div
              onClick={() => toggleCategory(category)}
              className="flex items-center cursor-pointer"
            >
              <span className={`mr-2 -z-10 ${openCategories[category] ? "rotate-90" : ""}`}>
                ▶
              </span>
              <h3 className="text-md lg:text-xl text-wallet_black">{category.toUpperCase()}</h3>
            </div>

          
            {openCategories[category] && (
              <ul className="list-disc pl-5 mt-2">
                {Object.entries(subcategories).length > 0 ? (
                  Object.entries(subcategories).map(([sub, total]) => (
                    <li key={sub} className="text-gray-700">
                      {sub}: <span className="text-gray-500">${(Number(total) || 0).toFixed(2)}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No subcategories</li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
