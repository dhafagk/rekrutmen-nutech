import React from "react";
import { Pagination } from "flowbite-react";
import { shallow } from "zustand/shallow";
import { useGetAllProducts } from "@/hooks/useProduct";
import { ProducStore } from "@/stores/product.store";

interface TableNavProps {
  dataLength: number;
}

const TableNav: React.FC<TableNavProps> = ({ dataLength }) => {
  const [page, setPage] = ProducStore(
    (state) => [state.page, state.setPage],
    shallow
  );
  const { data, isLoading } = useGetAllProducts(0);
  if (isLoading) return null;
  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          1-{dataLength}
        </span>
        &nbsp;of&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {data}
        </span>
      </span>
      <Pagination
        currentPage={page}
        onPageChange={(page) => {
          setPage(page);
        }}
        showIcons={true}
        totalPages={data}
      />
    </nav>
  );
};

export default TableNav;
