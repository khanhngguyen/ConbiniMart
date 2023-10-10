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
    <div>
        <p>Categories:</p>
        <ul>
            {categories.map((c) => (
                <li key={c.name}>
                    <p>{c.name}</p>
                    <img src={`${c.image}`}  alt={c.name} width="400" height="300"/>
                </li>
            ))}
        </ul>
        {/* <ul>
            {[1, 2, 3, 4].map((value) => (
                <li key={value}>{value}</li>
            ))}
        </ul> */}
    </div>
  )
}

export default Categories;