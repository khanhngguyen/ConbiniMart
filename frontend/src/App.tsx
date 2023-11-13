import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import { useAppDispatch } from './hooks/useAppDispatch'
import { fetchAllProducts, fetchCategories } from './redux/reducers/productsReducer'
// import cors from "cors";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    // dispatch(fetchAllProducts());
  }, [dispatch])

  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App;