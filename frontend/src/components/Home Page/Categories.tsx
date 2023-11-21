import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import Error from "../Shared/Error";
import Loading from "../Shared/Loading";

const Categories = () => {
    const { loading, error, categories } = useAppSelector(state => state.productsReducer);
    if (loading) {
        return (<><Loading /></>)
    } else if (error) {
        return (<><Error error={error} /></>)
    }

  return (
    <section className="categories">
        <div className="categories__container">
            <ul>
                {categories.map((c) => (
                    <li key={c.name} className="categories__container__category">
                        <div className="categories__container__category__content">
                            <h4>Always fresh & healthy</h4>
                            <h2>{c.name}</h2>
                            <button>
                                <NavLink to="products">Shop now</NavLink>
                            </button>
                        </div>

                        <div className="categories__container__category__image">
                            <a href="products"><img src={`${c.image}`}  alt={c.name} width="200" height="200" loading="lazy" /></a>
                            {/* <img src={`${c.image}`}  alt={c.name} width="200" height="200" loading="lazy"/> */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </section>
  )
}

export default Categories;