import { useParams, Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CategoryPage() {
  const params = useParams();
  const encodedCategoryName = params.category_name;

  console.log("[CategoryPage] Render - window.location.pathname:", window.location.pathname);
  console.log("[CategoryPage] Render - useParams():", params);
  console.log("[CategoryPage] Render - encodedCategoryName from params:", encodedCategoryName);

  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("[CategoryPage] useEffect - encodedCategoryName:", encodedCategoryName);

    if (encodedCategoryName === undefined || encodedCategoryName === null || encodedCategoryName.trim() === "") {
      console.error("[CategoryPage] useEffect - Encoded category name is missing or empty.");
      setError("Category name not provided in URL.");
      setIsLoading(false);
      setProducts([]);
      setCategoryName(""); // Ensure categoryName state is also cleared
      return;
    }

    let decodedName = "";
    try {
      decodedName = decodeURIComponent(encodedCategoryName);
      console.log("[CategoryPage] useEffect - Decoded category name:", decodedName);
      setCategoryName(decodedName); // Set the decoded name to state
    } catch (e) {
      console.error("[CategoryPage] useEffect - Error decoding category name:", e);
      setError("Invalid category name in URL (decoding failed).");
      setIsLoading(false);
      setProducts([]);
      setCategoryName("");
      return;
    }

    const fetchProductsByCategory = async (currentDecodedCategoryName) => {
      if (!currentDecodedCategoryName) {
        console.error("[CategoryPage] fetchProductsByCategory - Decoded category name is empty after all checks.");
        setError("Category name became empty unexpectedly.");
        setIsLoading(false);
        setProducts([]);
        return;
      }

      setIsLoading(true);
      setError(null); // Clear previous errors
      try {
        console.log(`[CategoryPage] Fetching products for: "${currentDecodedCategoryName}"`);
        // Use the search API endpoint with the categoryName as the query
        const response = await axios.get(
          `https://katsubook-backend.onrender.com/api/titles/search?query=${encodeURIComponent(currentDecodedCategoryName)}`
        );

        // The API returns results in response.data.title
        if (response.data && Array.isArray(response.data.title)) {
          setProducts(response.data.title);
          console.log(`[CategoryPage] Fetched ${response.data.title.length} products for "${currentDecodedCategoryName}"`);
        } else {
          console.warn(`[CategoryPage] No products found or API response format is unexpected for category: "${currentDecodedCategoryName}"`, response.data);
          setProducts([]);
        }
      } catch (err) {
        console.error(`[CategoryPage] Error fetching products for category "${currentDecodedCategoryName}":`, err);
        setError('Failed to fetch products. Please try again later.');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (decodedName) { // Only fetch if we successfully decoded a name
        fetchProductsByCategory(decodedName);
    }

  }, [encodedCategoryName]); // Depend only on encodedCategoryName from useParams

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        Loading products for category: "{categoryName || (encodedCategoryName ? decodeURIComponent(encodedCategoryName) : "Unknown")}"...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

   return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-center capitalize">
        {categoryName || "Category"}
      </h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            // _id, title_name, title_picture, authorInfo.author_name
            <div key={product._id || product.id} className="flex flex-col overflow-hidden rounded-lg border shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <RouterLink to={`/book/${product._id}`} className="block">
                <img
                  src={product.title_picture || '/placeholder-image.jpg'} // Use title_picture
                  alt={product.title_name || 'Book image'}
                  className="h-64 w-full object-cover sm:h-72 md:h-80"
                />
              </RouterLink>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <RouterLink to={`/book/${product._id}`} className="block">
                    <h2 className="mb-1 truncate text-lg font-semibold hover:text-[var(--color-primary)]" title={product.title_name}>
                      {product.title_name || 'Untitled Book'} {/* Use title_name */}
                    </h2>
                  </RouterLink>
                  <p className="mb-2 text-sm text-gray-600 truncate" title={product.authorInfo?.author_name}>
                    By: {product.authorInfo?.author_name || 'Unknown Author'} {/* Use authorInfo.author_name */}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="mb-3 text-xl font-bold text-[var(--color-accent)]">
                    {/* Price is not directly available from the searchTitle API's $group stage. */}
                    {/* You might need to adjust the API or fetch price separately if needed. */}
                    {/* For now, we'll omit price or show a placeholder. */}
                    {/* Example: product.price ? `$${product.price.toFixed(2)}` : 'Price N/A' */}
                  </p>
                  {/* <button className="w-full rounded bg-[var(--color-buttonBlue)] px-4 py-2 text-white hover:bg-opacity-80">
                    Add to Cart
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No products found in the "{categoryName}" category.
        </p>
      )}
    </div>
  );
}
