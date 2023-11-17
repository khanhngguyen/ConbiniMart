export interface QueryOptions {
    search: string;
    category: string;
    orderBy: string;
    orderByDescending: boolean;
    pageNumber: number;
    pageSize: number;
}

const defaultQuery: QueryOptions = {
    search: "",
    category: "All",
    orderBy: "Newest first",
    orderByDescending: false,
    pageNumber: 0,
    pageSize: 30
}

export default defaultQuery;