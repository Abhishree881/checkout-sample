import { useDispatch, useSelector, useStore } from "react-redux";
// all necessary hooks from redux
export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
export const useAppStore = useStore.withTypes();
