import React from 'react';
import BookList from './components/BookList';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div>
      <SearchBar />
      <CategoryFilter />
      <BookList />
    </div>
  );
}

export default App; 