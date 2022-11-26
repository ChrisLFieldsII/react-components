import {
  UseInfiniteQueryResult,
  UseMutateAsyncFunction,
  UseMutationResult,
} from '@tanstack/react-query';

export const renderNull = () => null;

/**
 * reps an infinite query that can be passed to component layer to decouple from any lib
 */
export type InfiniteQueryAdapter<TData, TError = unknown> = {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: TData[];
  fetchNextPage(): void;
  error?: TError;
};

/**
 * convert react-query infinite query to custom type for component layer
 */
export const infiniteQueryAdapter = <TData = unknown, TError = unknown>(
  query: UseInfiniteQueryResult<TData, TError>,
  fetchNextPage: () => void
): InfiniteQueryAdapter<TData, TError> => {
  return {
    hasNextPage: query.hasNextPage || false,
    isNextPageLoading: query.isLoading,
    items: query.data?.pages.flatMap(page => page) || [],
    fetchNextPage,
  };
};

/** reps a mutation that can be passed to component layer to decouple from any lib */
export type MutationAdapter<
  TData = unknown,
  TError = unknown,
  TVariables = void
> = {
  mutate: UseMutateAsyncFunction<TData, TError, TVariables, unknown>;
  error?: TError;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};

/**
 * convert react-query mutation to custom type for component layer
 * this allows us to directly pass mutations to components through this adapter.
 * those components can then easily mock mutation adapters in storybook w/o react-query.
 */
export const mutationAdapter = <
  TData = unknown,
  TError = unknown,
  TVariables = void
>(
  mutation: UseMutationResult<TData, TError, TVariables>
): MutationAdapter<TData, TError, TVariables> => {
  return {
    mutate: mutation.mutateAsync,
    isError: mutation.isError,
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error || undefined,
  };
};

/** standard props for a form component */
export type FormProps<T> = {
  /** @desc fn for saving form */
  onSave?: (data: T) => void;
  /** @desc fn every time form field is updated */
  onUpdate?: (data: T) => void;
  initValues?: Partial<T>;
};
