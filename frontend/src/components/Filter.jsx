// components/Filter.js
import { useTranslation } from 'react-i18next';
// React module, which shows the filter bar on the main page of the app.

const Filter = ({  onIsbnChange, onTitleChange, onAuthorChange, onCategoriesChange }) => {
  const { t } = useTranslation();
  return (
    <div id="search-bar" >
      <form>
        <label htmlFor="isbnBar">ISBN 13: </label>
        <input type="text" id="isbnBar" onChange={onIsbnChange} />

        <label htmlFor="titleBar">{t('title')}: </label>
        <input type="text" id="titleBar" onChange={onTitleChange} />

        <label htmlFor="authorBar">{t('authors')}: </label>
        <input type="text" id="authorBar"  onChange={onAuthorChange} />

        <label htmlFor="categoriesBar">{t('categories')}: </label>
        <input type="text" id="categoriesBar" onChange={onCategoriesChange} />
      </form>
    </div>
  );
};

export default Filter;
