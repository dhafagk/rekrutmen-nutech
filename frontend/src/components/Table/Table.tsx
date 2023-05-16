import React, { useEffect } from "react";
import {
  ActionButton,
  SearchResult,
  TableHeader,
  TableNav,
} from "@/components";
import { useGetProducts, useSearchProducts } from "@/hooks/useProduct";
import Image from "next/image";
import { Spinner } from "flowbite-react";
import { ProducStore } from "@/stores/product.store";
import { shallow } from "zustand/shallow";
import useDebounce from "@/lib/debounce";
import { useRouter } from "next/router";
import { ProductProps } from "@/types/product.type";

type Props = {};

const Table = (props: Props) => {
  const router = useRouter();
  const [page, searchQuery, setSearchQuery] = ProducStore(
    (state) => [state.page, state.searchQuery, state.setSearchQuery],
    shallow
  );
  const searchDebounce = useDebounce(searchQuery, 500);

  const { data: products, isLoading, isFetching } = useGetProducts(page);
  const {
    data: searchProduct,
    isLoading: searchProductLoading,
    isFetching: searchProductFetching,
    fetchStatus,
  } = useSearchProducts(10, searchDebounce);

  useEffect(() => {
    if (searchDebounce) {
      setSearchQuery(searchDebounce);
    }
  }, [searchDebounce]);

  const columns: string[] = [
    "Foto Produk",
    "Nama Produk",
    "Harga Beli",
    "Harga Jual",
    "Stok",
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <TableHeader />

          {fetchStatus === "fetching" || searchProduct ? (
            <SearchResult
              data={searchProduct}
              columns={columns}
              isLoading={searchProductLoading}
              isFetching={searchProductFetching}
            />
          ) : (
            <>
              {products?.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      {isLoading ||
                        (isFetching && (
                          <div className="absolute w-full h-1/2 flex justify-center items-center bg-gray-200 bg-opacity-50">
                            <Spinner color="warning" />
                          </div>
                        ))}

                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          {columns.map((column, index) => (
                            <th key={index} scope="col" className="px-4 py-4">
                              {column}
                            </th>
                          ))}
                          <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products?.map(
                          (product: ProductProps, index: number) => (
                            <tr
                              className="border-b cursor-pointer hover:bg-gray-200"
                              key={index}
                            >
                              <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <Image
                                  src={product.image_url}
                                  alt="gambar_produk"
                                  width={70}
                                  height={70}
                                />
                              </th>
                              <td className="px-4 py-3">{product.title}</td>
                              <td className="px-4 py-3">
                                {product.buying_price}
                              </td>
                              <td className="px-4 py-3 max-w-[12rem] truncate">
                                {product.selling_price}
                              </td>
                              <td className="px-4 py-3">
                                {product.description}
                              </td>
                              <td className="px-4 py-3 flex items-center justify-end">
                                <ActionButton id={product.id} />
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <TableNav dataLength={products?.length} />
                </>
              ) : (
                <div className="text-center pb-5">Data Kosong</div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Table;
