// components/Filter.js

// React module, which shows the filter bar on the main page of the app.

const Filter = ({ onTitleChange, onAuthorChange, onCategoriesChange }) => {
  return (
    <div id="searchBar">
      <form>
        <label htmlFor="titleBar">Title: </label>
        <input type="text" id="titleBar" onChange={onTitleChange} />

        <label htmlFor="authorBar">Author: </label>
        <input type="text" id="authorBar"  onChange={onAuthorChange} />

        <label htmlFor="categoriesBar">Categories: </label>
        <input type="text" id="categoriesBar" onChange={onCategoriesChange} />
      </form>
    </div>
  );
};

export default Filter;
