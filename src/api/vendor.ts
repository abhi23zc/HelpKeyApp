import axios from 'axios'
import { onLoading } from '../store/features/authFeature/auth.slice';
import { failure, fetchNearbyVendor, fetchVendors } from '../store/features/vendorFeature/vendor.slice';

export const nearByVendors = async (locationDetails, dispatch) => {
    dispatch(onLoading(true));
    console.log("Fetching Vendors")
    try {
        const response = await axios.post("https://helpkeyapi.onrender.com/api/nearby-vendors", locationDetails);
        console.log(response.data);
        const { vendors } = response.data;

        dispatch(fetchNearbyVendor({vendors, error:false}));

    } catch (error) {
        console.log(error); 
        dispatch(failure({error, msg:"Something went wrong"}));
    }
};

export const fetchVendor = async (locationDetails, dispatch) => {
    dispatch(onLoading(true));
    console.log("Fetching Vendors")
    try {
        const response = await axios.post("https://helpkeyapi.onrender.com/api/nearby-vendors", locationDetails);
        // console.log("Searched Vendor List" , response.data?.vendors[0]);
        const vendors  = response.data?.vendors;
        if(!vendors)dispatch(fetchVendors({vendors:[], error:false}));
        dispatch(fetchVendors({vendors, error:false}));

    } catch (error) {
        // console.log(error); 
        dispatch(fetchVendors({vendors:[], error:false}));
        // dispatch(failure({error, msg:"Something went wrong"}));
    }
};