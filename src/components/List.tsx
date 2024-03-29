import {
  List as ChakraList,
  ListItem as ChakraListItem,
  ListProps as ChakraListProps,
} from '@chakra-ui/react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import React from 'react';
import { getArrayItemMetadata } from '@chrisfieldsii/ts-utils';

import { InfiniteQueryAdapter, renderNull } from '../utils';

export type ListProps<T> = ChakraListProps & {
  items?: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  /** will not render f */
  renderItemSeparator?: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index?: number) => string;
};

export function List<T>({
  items = [],
  renderItem,
  renderItemSeparator = renderNull,
  keyExtractor = (item: any, index?: number) => {
    return item.id || index?.toString();
  },
  ...restProps
}: ListProps<T>) {
  return (
    <ChakraList {...restProps}>
      {items.map((item, index) => {
        const { isLast } = getArrayItemMetadata(items, index);
        const canRenderSeparator = !isLast;

        return (
          <>
            <ChakraListItem key={keyExtractor(item, index)}>
              {renderItem(item, index)}
            </ChakraListItem>

            {canRenderSeparator ? renderItemSeparator(item, index) : null}
          </>
        );
      })}
    </ChakraList>
  );
}

export type InfiniteListProps<T> = ListProps<T> &
  InfiniteQueryAdapter<T> & {
    renderLoading(): React.ReactNode;
  };

/**
 * An infinite list that uses loading indicator at bottom to
 * determine whether to fetch next page. It is not windowed.
 */
export function InfiniteList<T>({
  fetchNextPage,
  hasNextPage,
  isNextPageLoading,
  renderLoading,
  ...props
}: InfiniteListProps<T>) {
  const [sentryRef] = useInfiniteScroll({
    loading: isNextPageLoading,
    hasNextPage,
    onLoadMore: fetchNextPage,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: false,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <>
      <List {...props} />

      {hasNextPage || isNextPageLoading ? (
        <div ref={sentryRef}>{renderLoading()}</div>
      ) : null}
    </>
  );
}
