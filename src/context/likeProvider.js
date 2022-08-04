import { LikeContext } from "./likeSending";

export default function LikeUserProvider(props) {
    return(
        <LikeContext.Provider value={}>
            {props.children}
        </LikeContext.Provider>
    )
}
