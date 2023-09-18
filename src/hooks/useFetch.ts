/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect} from 'react';

export const useFetch = (fetchFunction: any, params?: any) => {
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>();

    const stringParams = params ? new URLSearchParams(params).toString() : '';

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const result: any = await fetchFunction(params);

                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        })()
    }, [fetchFunction, stringParams]);

    return {data, isLoading, error}
}