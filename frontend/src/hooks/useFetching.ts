import { useState } from "react";

export const useFetching = (callback: () => Promise<void>): [() => Promise<void>, boolean, string] => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e: any) {  // Using `any` here to handle all possible error types
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};
