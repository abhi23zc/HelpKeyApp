import { configureStore} from '@reduxjs/toolkit'
import { authReducer } from './features/authFeature/auth.slice'

export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})
