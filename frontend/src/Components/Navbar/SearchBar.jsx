import { IoSearch } from "react-icons/io5";

function SearchBar() {
  return (
    <>
      <button className="flex items-center justify-center text-gray-600  focus:outline-none rounded-l-full h-[40px] p-[7px] bg-white border border-gray-300 border-r-0">
        <IoSearch className="h-[40px]" />
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-r-full focus:outline-none h-[40px] p-[7px] border-l-0 pl-0 w-full"
      />
    </>
  );
}

export default SearchBar;
