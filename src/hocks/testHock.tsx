import { paginationProps } from "../components/paginaton/pagination";

type testProps = {
    totalPages: number;
    currentPage: number;
    handleNextPageClick: () => void;
    handlePreviousPageClick: () => void;
    handlePageClick: (pageNumber: number) => void;
    testData: boolean;
}

export function testHock(Component: (props: paginationProps) => JSX.Element) {
    return function HockwithComponent(props: testProps) {
        const {testData, ...restProps} = props;
        if(testData) {
            return <Component {...restProps} />
        }
        
        console.log(testData)
    }
}