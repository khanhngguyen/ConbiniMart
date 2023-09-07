import { useAppSelector } from "../../hooks/useAppSelector";

const Categories = () => {
    const { categories } = useAppSelector(state => state.productsReducer);
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