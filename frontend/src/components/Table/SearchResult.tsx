import React from "react";
import { TableNav, ActionButton } from "@/components";
import Image from "next/image";
import { Spinner } from "flowbite-react";
import { ProductProps } from "@/types/product.type";

interface SearchResultsProps {
  data: ProductProps[];
  columns: string[];
  isLoading: boolean;
  isFetching: boolean;
}

const SearchResult: React.FC<SearchResultsProps> = ({
  data,
  columns,
  isLoading,
  isFetching,
}) => {
  return (
    <>
      {data?.length > 0 ? (
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
                {data?.map((product, index) => (
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
                    <td className="px-4 py-3">{product.buying_price}</td>
                    <td className="px-4 py-3 max-w-[12rem] truncate">
                      {product.selling_price}
                    </td>
                    <td className="px-4 py-3">{product.description}</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      <ActionButton id={product.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TableNav dataLength={data?.length} />
        </>
      ) : (
        <div className="text-center pb-5">Produk Tidak Ada</div>
      )}
    </>
  );
};

export default SearchResult;
