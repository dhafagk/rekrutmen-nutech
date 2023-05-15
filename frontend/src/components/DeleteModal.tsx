import { useDeleteProduct } from "@/hooks/useProduct";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "flowbite-react";
import React from "react";
import { toast } from "react-hot-toast";

interface DeleteModalProps {
  id: any;
  show: boolean;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, show, onClose }) => {
  const { mutateAsync } = useDeleteProduct();
  const queryClient = useQueryClient();

  const handleOk = async () => {
    await mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["Products"]);
        onClose();
      },
      onError: (error) => console.log(error),
    });
  };

  const onOk = () => {
    toast.promise(handleOk(), {
      loading: "Menghapus...",
      success: "Hapus Produk Berhasil",
      error: "Hapus Produk Gagal",
    });
  };

  return (
    <Modal show={show} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto mb-4 h-14 w-14 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>

          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Apa anda yakin ingin menghapus produk ini?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onOk}>
              Iya, saya yakin
            </Button>
            <Button color="gray" onClick={onClose}>
              Tidak, batalkan
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
