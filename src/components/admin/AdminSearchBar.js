import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Shared search bar used across the admin pages.
 *
 * Controlled by the parent: typing fires `onChange`, submitting the form
 * (Enter or the Search button) fires `onSubmit`, and the clear icon fires
 * `onClear`. Pages backed by a server query keep the committed value in a
 * separate state; pages that filter already-loaded data can filter directly
 * off the value they pass in.
 */
const AdminSearchBar = ({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = "Search...",
  className = "",
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit?.(e);
    }}
    className={`mb-6 flex gap-3 ${className}`}
    role="search"
  >
    <div className="relative flex-1 max-w-md">
      <SearchIcon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        fontSize="small"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon fontSize="small" />
        </button>
      )}
    </div>
    <button
      type="submit"
      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold rounded-xl text-sm shadow hover:opacity-90 transition"
    >
      Search
    </button>
  </form>
);

export default AdminSearchBar;
