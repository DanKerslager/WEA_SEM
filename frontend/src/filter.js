
import debounce from 'lodash.debounce'

/**
 * This function delays the title, before it gets send to backend
 * @param {function} updateTitle function of searched title, that will be delayed 
 * @returns delayed function
 */
export const onTitleOnChange = (updateTitle) => debounce(updateTitle, 500)
/**
 * This function delays the authors, before it gets send to backend
 * @param {function} updateAuthors function of searched authors, that will be delayed 
 * @returns delayed function
 */
export const onAuthorsOnChange = (updateAuthors) => debounce(updateAuthors, 500)
/**
 * This function delays the categories, before it gets send to backend
 * @param {function} updateCategories function of searched categories, that will be delayed 
 * @returns delayed function
 */
export const onCategoriesOnChange = (updateCategories) => debounce(updateCategories, 500)