import React, { createContext, useContext, useState } from 'react';

export const PageContext = createContext()
export const PageConsumer = PageContext.Consumer;
export const PageProvider = ({ children }) => {
    const [bookDetail, setBookDetail] = useState(() => {
        const savedDetail = localStorage.getItem('detail');
        return savedDetail === 'true'; // Convert string back to boolean
      });
    const MoveToBookDetail = (bookItem) => setBookDetail(bookItem)
  return (
    <PageContext.Provider value={{bookDetail, MoveToBookDetail}}>
        {children}
    </PageContext.Provider>
  )
}

export const usePageContext = () => useContext(PageContext)