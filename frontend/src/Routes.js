// export components
export { default as Home } from './Pages/Home';
export { default as Auth } from './Pages/Auth';
export { default as Register } from './Pages/Register';
export { default as SearchResult } from './Pages/SearchResult';
export { default as ManageListing } from './Pages/ManageListing';
export { default as NewListing } from './Pages/NewListing';
export { default as ListingProfile } from './Pages/ListingProfile';
export { default as ViewListingProfile } from './Pages/ViewListingProfile';
export { default as BookingHistory } from './Pages/BookingHistory';

// export routes path
export const HOME = '/home';
export const AUTH = '/auth';
export const REGISTER = '/register';
export const SEARCH = '/search/:query';
export const MANAGELISTING = '/manage';
export const NEWLISTING = '/newlisting';
export const LISTINGPROFILE = '/listingProfile/:id';
export const VIEWLISTINGPROFILE = '/view/listingProfile/:id';
export const BOOKINGHISTORY = '/bookingHistory';
