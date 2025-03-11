import React from 'react';
import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/searchbar';

const Home = () => {
  return (
    <>
   <div className="flex">
    <Sidebar />
   </div>

   <div className="flex-grow-1">
    <SearchBar />
   </div>
   </>
  );
}
export default Home;