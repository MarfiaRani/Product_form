import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SimpleProductForm() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;
    const validationRules = {
      name: /^[a-zA-Z\s]+$/,
      price: /^\d+(\.\d{1,2})?$/,
      quantity: /^[1-9]\d*$/,
      pid: /^[a-zA-Z0-9-]+$/,
      releaseDate: /^\d{4}-\d{2}-\d{2}$/,
     
    };

    const requiredFields = ['name', 'price', 'quantity'];

    for (const key in currentProduct) {
      if (requiredFields.includes(key) && !currentProduct[key]?.trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        isValid = false;
      }
      if (validationRules[key] && currentProduct[key] && !validationRules[key].test(currentProduct[key])) {
        newErrors[key] = `Invalid ${key} format`;
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      setProducts([...products, currentProduct]);
      setCurrentProduct({}); 
      alert('Product added!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        
      <div className="mb-3">
          <label htmlFor="sku" className="form-label">Product Id</label>
          <input type="text" className={`form-control ${errors.pid ? 'is-invalid' : ''}`} name="pid" onChange={handleChange} />
          {errors.pid && <div className="invalid-feedback">{errors.pid}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" onChange={handleChange} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" name="description" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input type="text" className="form-control" name="category" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="text" className={`form-control ${errors.price ? 'is-invalid' : ''}`} name="price" onChange={handleChange} />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} name="quantity" onChange={handleChange} />
          {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
        </div>


        <div className="mb-3">
          <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
          <input type="text" className="form-control" name="manufacturer" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">Release Date (YYYY-MM-DD)</label>
          <input type="date" className={`form-control ${errors.releaseDate ? 'is-invalid' : ''}`} name="releaseDate" onChange={handleChange} />
          {errors.releaseDate && <div className="invalid-feedback">{errors.releaseDate}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      {products.length > 0 && (
        <div className="mt-4">
          <h3>Products Added</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {Object.entries(product).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {value || 'N/A'}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SimpleProductForm;