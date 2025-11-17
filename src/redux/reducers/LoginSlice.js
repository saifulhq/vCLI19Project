import { createSlice } from "@reduxjs/toolkit"

const LoginStore = {
    username: '',
    password: null,
    token: '',
    token_access: '',
    name: '',
    phone_number: '',
    email: '',
    remember_me: false,
    roles: []
}

const LoginSlice = createSlice({
    name: 'Login',
    initialState: Object.assign({}, LoginStore),
    reducers: {
        SignIn: (state, action) => {
            return action.payload; // replace state
        },
        SignOut: () => {
            return LoginSlice.initialState; // replace to initial value
        }
    }
})

export const { SignIn, SignOut } = LoginSlice.actions;
export default LoginSlice.reducer;