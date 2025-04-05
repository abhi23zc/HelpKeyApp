import { configureStore} from '@reduxjs/toolkit'
import { authReducer } from './features/authFeature/auth.slice'
import { vendorReducer } from './features/vendorFeature/vendor.slice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        vendor:vendorReducer
    }
})
