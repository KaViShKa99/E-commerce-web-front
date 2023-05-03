import React, { useState } from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { filteredProductsAction, productSelector } from "../slices/productSlice";

const Search = () => {

  const { allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };



  const handleSubmit = (event) => {
    setSearchTerm(event.target.value);

    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    dispatch(filteredProductsAction(filteredProducts));
  }

  const handleCloseSearch = () => {
    dispatch(filteredProductsAction([]));
  }



  return (
    <div >
      <form action="#" className="search">
        <div className="input-group">
          <input
            id="search"
            name="search"
            type="text"
            className="form-control"
            placeholder="Search"
            required
          />
          <label className="visually-hidden" htmlFor="search"></label>
          <button
            className="btn btn-primary text-white"
            type="submit"
            aria-label="Search"
            onSubmit={handleSubmit}
            style={{ marginRight: '20px' }}
          >
            <IconSearch />
          </button>
          <button onClick={handleCloseSearch}>
            X
          </button>

        </div>
      </form>


    </div>
  );
};
export default Search;
