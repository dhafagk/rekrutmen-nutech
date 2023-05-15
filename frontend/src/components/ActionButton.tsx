import React, { useState } from "react";
import { useEditProduct, useGetProduct } from "@/hooks/useProduct";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteModal, Modal } from "@/components";
import { useRouter } from "next/router";

interface ActionButtonProps {
  id: any;
}

const ActionButton: React.FC<ActionButtonProps> = ({ id }) => {
  const router = useRouter();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const { data, isLoading: loadingData } = useGetProduct(id, showEdit);
  const { mutateAsync: editProduct, isLoading: loadingEditProduct } =
    useEditProduct();

  const queryClient = useQueryClient();

  const onSubmit = async (values: any) => {
    const [image] = Array.from(values.foto_produk).map((file) => file);
    const payload: any = {
      id,
      image: image || null,
      title: values.nama_produk,
      buying_price: values.harga_beli,
      selling_price: values.harga_jual,
      description: values.stok,
    };
    try {
      await editProduct(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries(["Product"]);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {}
  };

  return (
    <>
      <ul className="py-1 text-sm flex gap-2">
        <li>
          <button
            type="button"
            className="text-gray-500 hover:underline"
            onClick={() => router.push(`/product/${id}`)}
          >
            Lihat
          </button>
        </li>
        <li>
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => setShowEdit(true)}
          >
            Edit
          </button>
        </li>
        <li>
          <button
            type="button"
            className="text-red-500 hover:underline"
            onClick={() => setShowDelete(true)}
          >
            Hapus
          </button>
        </li>
      </ul>
      {showEdit && (
        <Modal
          title="Edit Produk"
          show={showEdit}
          onClose={() => setShowEdit(false)}
          onSubmit={onSubmit}
          isLoading={loadingEditProduct}
          data={data}
          loadingData={loadingData}
        />
      )}

      {showDelete && (
        <DeleteModal
          id={id}
          show={showDelete}
          onClose={() => setShowDelete(false)}
        />
      )}
    </>
  );
};

export default ActionButton;
