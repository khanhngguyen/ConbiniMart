import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GlobalState } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector;