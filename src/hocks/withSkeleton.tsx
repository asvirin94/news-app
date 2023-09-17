import Skeleton from "../components/skeleton/skeleton";

export default function withSkeleton<P>(Component: (props: P) => JSX.Element, type: string, count: number) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function WithSkeleton(props: any) {
        const {isLoading, ...restProps} = props;

        if(isLoading) {
            return <Skeleton type={type} count={count} />
        }

        return <Component {...restProps}/>
    }
}