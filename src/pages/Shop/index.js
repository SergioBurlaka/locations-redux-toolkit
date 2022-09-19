import React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  addProduct,
  deleteProduct,
  setProducts,
} from "../../redux/features/Shop/shopSlice";

function Shop() {
  const [nweProduct, setNewProduct] = useState("");
  const { shop, name } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const addTodoHandler = () => {
    dispatch(addProduct(nweProduct));
    setNewProduct("");
  };

  const deleteHandler = (productId) => dispatch(deleteProduct(productId));

  const soldOutHandler = (productId) => {
    const newProduct = shop.map((item) => {
      return item.id === productId
        ? { ...item, soldOut: !item.soldOut }
        : { ...item };
    });

    dispatch(setProducts(newProduct));
  };

  const editHandler = (productId) => {
    const newProduct = shop.map((item) => {
      return item.id === productId ? { ...item, isEdit: true } : { ...item };
    });
    dispatch(setProducts(newProduct));
  };

  const saveHandler = (productId) => {
    const newProduct = shop.map((item) => {
      return item.id === productId ? { ...item, isEdit: false } : { ...item };
    });
    dispatch(setProducts(newProduct));
  };

  const onChangeProductName = (newProductName, productId) => {
    const newProduct = shop.map((item) => {
      return item.id === productId
        ? { ...item, title: newProductName }
        : { ...item };
    });
    dispatch(setProducts(newProduct));
  };



  return (
    <div>
      <div>Name from store {name}</div>
      <div>Create product</div>
      <input
        type="text"
        value={nweProduct}
        onChange={(event) => setNewProduct(event.target.value)}
      />

      <button onClick={addTodoHandler}>Add todo</button>



      <div>
        <ul>
          {shop &&
            shop.map((item) => {
              return (
                <li key={item.id} className="card">
                  <div className="card__box">
                    <span>Done</span>
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => soldOutHandler(item.id)}
                    />
                  </div>
                  {item?.isEdit ? (
                    <input
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        onChangeProductName(event.target.value, item.id)
                      }
                    />
                  ) : (
                    <div className="card__content">{item.title}</div>
                  )}

                  <div className="card__handler">
                    <button onClick={() => deleteHandler(item.id)}>
                      delete
                    </button>
                    {item?.isEdit ? (
                      <button onClick={() => saveHandler(item.id)}>Save</button>
                    ) : (
                      <button onClick={() => editHandler(item.id)}>Edit</button>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
        Shop list
      </div>
    </div>
  );
}

export default Shop;
