import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "../components/HomePage.jsx";
import ShopPage from "../components/ShopPage.jsx";
import StoryPage from "../components/StoryPage.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function AppRoutes({
  activeCategory,
  searchQuery,
  favorites,
  onCategoryChange,
  onSearchChange,
  onToggleFavorite,
  onOpenProduct,
}) {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/shop"
          element={(
            <ShopPage
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              favorites={favorites}
              onCategoryChange={onCategoryChange}
              onSearchChange={onSearchChange}
              onToggleFavorite={onToggleFavorite}
              onOpenProduct={onOpenProduct}
            />
          )}
        />
        <Route path="/story" element={<StoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
