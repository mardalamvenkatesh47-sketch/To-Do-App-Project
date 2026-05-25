import { useState } from "react";
import "./App.css";

function App() {

  const [name, setName] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [products, setProducts] =
    useState([]);

  // Add Product
  const addProduct = () => {

    if (
      name === "" ||
      category === "" ||
      price === "" ||
      stock === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {

      id: Date.now(),

      name,

      category,

      price,

      stock
    };

    setProducts([
      ...products,
      newProduct
    ]);

    setName("");
    setCategory("");
    setPrice("");
    setStock("");
  };

  // Delete Product
  const deleteProduct = (id) => {

    const updated =
      products.filter(
        (item) =>
          item.id !== id
      );

    setProducts(updated);
  };

  // Search
  const filteredProducts =
    products.filter((item) =>

      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="container">

      <h1>
        React Day 96 - Product Inventory
      </h1>

      {/* Form */}
      <div className="form-section">

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <button
          onClick={addProduct}
        >
          Add Product
        </button>

      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search product..."
        className="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Total */}
      <div className="count-box">

        Total Products:
        {products.length}

      </div>

      {/* Cards */}
      <div className="product-grid">

        {filteredProducts.map((item) => (

          <div
            className="product-card"
            key={item.id}
          >

            <h2>
              {item.name}
            </h2>

            <p>
              📂 {item.category}
            </p>

            <h3>
              ₹ {Number(item.price).toLocaleString()}
            </h3>

            <h4>

              Stock:
              {item.stock}

            </h4>

            <button
              onClick={() =>
                deleteProduct(item.id)
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default App;