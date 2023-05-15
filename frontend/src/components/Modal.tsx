import React, { useState } from "react";
import FileUpload from "./Form/FileUpload";
import { Modal as FBModal } from "flowbite-react";
import { ProductValidation } from "@/validations";
import { Button, Form, Input } from "@/components";
import { toast } from "react-hot-toast";

interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (values: Promise<any>) => void;
  isLoading: boolean;
  data?: any;
  loadingData?: boolean;
  buttonText?: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  title,
  onClose,
  onSubmit,
  isLoading,
  data,
  loadingData,
  buttonText,
}) => {
  const [fileImage, setFileImage] = useState(null);

  const handleSubmit = async (values: any) => {
    try {
      await onSubmit(values);
      toast.success("Produk Berhasil Ditambahkan!");
      onClose();
      setFileImage(null);
    } catch (error) {
      toast.error("Produk Gagal Ditambahkan!");
    }
  };

  const LoadingModal = (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-5 bg-gray-300 rounded"></div>
        <div className="h-20 bg-gray-300 rounded"></div>
        <div className="h-5 bg-gray-300 rounded"></div>
        <div className="space-y-3 !mt-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-5 bg-gray-300 rounded col-span-1"></div>
            <div className="h-5 bg-gray-300 rounded col-span-1"></div>
          </div>
          <div className="h-5 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  console.log(fileImage);

  return (
    <FBModal dismissible={true} show={show} onClose={onClose}>
      <FBModal.Header>{title}</FBModal.Header>
      <FBModal.Body>
        {loadingData ? (
          LoadingModal
        ) : (
          <div className="space-y-6">
            <Form
              defaultValues={{
                foto_produk: data?.image,
                nama_produk: data?.title,
                harga_beli: data?.buying_price,
                harga_jual: data?.selling_price,
                stok: data?.description,
              }}
              onSubmit={handleSubmit}
              validationSchema={ProductValidation.ProductSchemaValidation}
            >
              {() => (
                <>
                  <FileUpload
                    fileImage={fileImage}
                    productImageUrl={data?.image_url}
                  />
                  <Input type="text" label="Nama Produk" name="nama_produk" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input type="number" label="Harga Beli" name="harga_beli" />
                    <Input type="number" label="Harga Jual" name="harga_jual" />
                  </div>
                  <Input type="number" label="Stok" name="stok" />
                  <Button
                    type="submit"
                    text={buttonText ?? title}
                    isLoading={isLoading}
                  />
                </>
              )}
            </Form>
          </div>
        )}
      </FBModal.Body>
    </FBModal>
  );
};

export default Modal;
