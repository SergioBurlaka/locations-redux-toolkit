import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
  shop: [],
  name: 'Shop store'
};

const shopsSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
  
    addProduct: {
      reducer(state, action) {
        state.shop.push(action.payload);
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            soldOut: false,
          },
        };
      },
    },
    setProducts(state, action) {
      state.shop = action.payload;
    },

    deleteProduct(state, action) {
      const newShop = state.shop.filter((item) => {
        return item.id !== action.payload;
      });
      state.shop = newShop;
    },
    updateProduct(state, action) {
      const { productId } = action.payload;
      const newShop = state.shop.map((item) =>
        item.id === productId ? { ...action.payload } : { ...item }
      );

      state.shop = newShop;
    },
  },
});

export const { addProduct, deleteProduct, updateProduct, setProducts } =
  shopsSlice.actions;

export default shopsSlice.reducer;
