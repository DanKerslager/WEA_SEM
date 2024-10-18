
import debounce from 'lodash.debounce'

export const onTitleOnChange = (updateTitle) => debounce(updateTitle, 500)
export const onAuthorsOnChange = (updateAuthors) => debounce(updateAuthors, 500)
export const onCategoriesOnChange = (updateCategories) => debounce(updateCategories, 500)