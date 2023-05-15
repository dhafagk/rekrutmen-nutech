import React, { useState } from "react";
import { Button, SearchInput, Modal } from "@/components";
import { useAddProduct } from "@/hooks/useProduct";
import { useQueryClient } from "@tanstack/react-query";

type Props = {};

const TableHeader = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const { mutateAsync, isLoading } = useAddProduct();
  const queryClient = useQueryClient();
  const onSubmit = async (values: any) => {
    const [image] = Array.from(values.foto_produk).map((file) => file);

    const payload: any = {
      image,
      title: values.nama_produk,
      buying_price: values.harga_beli,
      selling_price: values.harga_jual,
      description: values.stok,
    };

    await mutateAsync(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["Products"]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full">
          <SearchInput />
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <Button
            type="button"
            text="Tambah produk"
            icon={
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
            }
            onClick={() => setShow(true)}
          />
        </div>
      </div>
      {show && (
        <Modal
          title="Tambah Produk"
          show={show}
          onClose={() => setShow(false)}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default TableHeader;
