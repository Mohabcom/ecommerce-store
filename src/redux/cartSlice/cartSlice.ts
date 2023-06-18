import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type item = {
    id: string;
    quantity?: number;
    stock?: number;
};

export interface CartState {
    cart: string[];
}

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        AddToCart: (state, action: PayloadAction<item>) => {
            const isInCart = state.cart.find(
                (item) => item.id === action.payload.id,
            );
            if (!isInCart) {
                state.cart = [...state.cart, action.payload];
            }
        },
        RemoveFromCart: (state, action: PayloadAction<item>) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload.id,
            );
        },
        ChangeQuantity: (state, action: PayloadAction<item>) => {
            const isInCart = state.cart.find(
                (item) => item.id === action.payload.id,
            );
            if (!isInCart) {
                state.cart = [...state.cart, action.payload];
            } else {
                const newItem = {
                    ...isInCart,
                    quantity: action.payload.quantity,
                };
                state.cart = state.cart.filter(
                    (item) => item.id !== action.payload.id,
                );
                state.cart = [...state.cart, newItem];
            }
        },
        ResetCart: (state) => {
            return {
                ...state,
                cart: [],
            };
        },
    },
});

export const { AddToCart, RemoveFromCart, ResetCart } = cartSlice.actions;
export default cartSlice.reducer;
// const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'ADD_TO_CART':
//             return {
//                 ...state,
//                 cart: [...state.cart, action.payload],
//             };
//         case 'REMOVE_FROM_CART':
//             return {
//                 ...state,
//                 cart: state.cart.filter((task) => task.id !== action.payload),
//             };
//         case 'RESET_CART':
//             return {
//                 ...state,
//                 cart: [],
//             };
//         default:
//             return state;
//     }
// };

// export default cartReducer;
