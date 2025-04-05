import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vendors: [],
    searchVendors :[],
    error: '',
    msg: '',
    isHotelLoading: false,
    hotels: [],
    selectedHotel:{},
    selectedLocation : null
  };
  

  const vendorSlice = createSlice({
    name:'vendor',
    initialState,
    reducers:{
        fetchNearbyVendor :(state , action)=> {
            state.vendors = action.payload?.vendors,
            state.error = action.payload?.error,
            state.isHotelLoading = false
        },
        fetchVendors :(state , action)=> {
            state.searchVendors = action.payload?.vendors,
            state.error = action.payload?.error,
            state.isHotelLoading = false
        },
        failure:(state, action) =>{
            state.error = action.payload?.error,
            state.msg = action.payload?.msg
        },
        selectLocation :(state, action)=>{
            state.selectedLocation = action?.payload
        },
        selectHotel :(state, action)=>{
            state.selectedHotel = action?.payload
        }
    }

  })

  export const {fetchNearbyVendor, failure, selectLocation, fetchVendors, selectHotel} = vendorSlice.actions 

  export const vendorReducer = vendorSlice.reducer