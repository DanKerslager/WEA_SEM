import React, { createContext, useContext, useState } from 'react';

export const PageContext = createContext()
export const PageConsumer = PageContext.Consumer;
export const PageProvider = ({ children }) => {
  const [bookId, setBookId] = useState('');
  const [bookDetail, setBookDetail] = useState(() => {
    const savedDetail = localStorage.getItem('detail');
    return savedDetail === 'true'; // Convert string back to boolean
  });
  const MoveToBookDetail = (bookItem) => setBookDetail(bookItem)
  const SetBookDatailId = (bookId) => setBookId(bookId)
  return (
    <PageContext.Provider value={{ bookDetail, MoveToBookDetail, bookId, SetBookDatailId }}>
      {children}
    </PageContext.Provider>
  )
}
export const usePageContext = () => useContext(PageContext)