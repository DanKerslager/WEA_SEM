// components/Filter.js

const Filter = ({ title, authors, categories, onTitleChange, onAuthorChange, onCategoriesChange }) => {
  return (
    <div id="searchBar">
      <form>
        <label htmlFor="titleBar">Title: </label>
        <input type="text" id="titleBar" value={title} onChange={onTitleChange} />
        
        <label htmlFor="authorBar">Author: </label>
        <input type="text" id="authorBar" value={authors} onChange={onAuthorChange} />
        
        <label htmlFor="categoriesBar">Categories: </label>
        <input type="text" id="categoriesBar" value={categories} onChange={onCategoriesChange} />
      </form>
    </div>
  );
};

export default Filter;
