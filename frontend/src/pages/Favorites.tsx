import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch';
import { Badge } from '@mui/material';
import { HighlightOffOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import { emptyFavorites, removeFromFavorites } from '../redux/reducers/favoritesReducer';

const Favorites = () => {
  const { favProducts } = useAppSelector(state => state.favoritesReducer);
  const dispatch = useAppDispatch();

  const handleEmptyFavorites = () => {
    dispatch(emptyFavorites());
  }

  return (
    <section className='favorites'>
      <div className='container'>
        <p className='favorites__title'> -- Favorites -- </p>

        <table className='favorites__table'>
          <thead className='favorites__table__header'>
            <tr className='favorites__table__row'>
              <th className='favorites__table__data--left'>Products</th>
              <th className='favorites__table__data'>Price</th>
              <th className='favorites__table__data'>Note</th>
            </tr>
          </thead>

          <tbody className='favorites__table__body'>
            {favProducts.length === 0 && 
              <tr className='favorites__table__row'>
                <td colSpan={3} className='favorites__table__data--middle'>No favorite products in list</td>
              </tr>
            }

            {favProducts.map(item => (
              <tr key={item.id.toString()} className='favorites__table__row'>
                <td className='favorites__table__data--left'>
                  {item.title}
                  <button
                  onClick={() => dispatch(removeFromFavorites(item))}
                  >
                    <Badge>
                      <HighlightOffOutlined fontSize='large' />
                    </Badge>
                  </button>
                </td>
                <td className='favorites__table__data'>{item.price} €</td>
                <td className='favorites__table__data'>{item.inventory > 5 ? "Available in stock" : "Only a few items left!!" }</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <p className='favorites__empty'>
          Empty Favorites List
          <button onClick={handleEmptyFavorites}>
            <Badge>
              <DeleteForeverOutlined fontSize='large' />
            </Badge>
          </button>
        </p>

      </div>
    </section>
  )
}

export default Favorites