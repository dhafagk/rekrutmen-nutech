import { FileInput, Label } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface FileUploadProps {
  fileImage: Blob | MediaSource | null;
  productImageUrl: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  fileImage,
  productImageUrl,
}) => {
  const [image, setImage] = useState<Blob | MediaSource | null>(
    fileImage || null
  );
  const [imageUrl, setImageUrl] = useState<string | null>(productImageUrl);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (image) setImageUrl(null);
  }, [image]);

  return (
    <>
      <div id="fileUpload">
        <div className="mb-2 block">
          <Label htmlFor="file" value="Upload foto produk" />
        </div>
        <FileInput
          id="file"
          helperText="A profile picture is useful to confirm your are logged into your account"
          {...register("foto_produk", {
            onChange: (event) => {
              setImage(event?.target?.files[0]);
            },
          })}
        />
        {errors["foto_produk"] && (
          <span className="text-red-500 text-sm pr-2 mt-3">
            *{errors["foto_produk"]?.message?.toString()}
          </span>
        )}
      </div>
      {image && (
        <div className="w-auto h-auto">
          <Image
            className="contain"
            src={URL.createObjectURL(image)}
            alt="foto produk"
            width={150}
            height={150}
          />
          <span
            className="text-red-500 text-sm pr-2 mt-3 cursor-pointer"
            onClick={() => setImage(null)}
          >
            Hapus Gambar
          </span>
        </div>
      )}

      {imageUrl && (
        <div className="w-auto h-auto">
          <Image
            className="contain"
            src={imageUrl}
            alt="foto produk"
            width={150}
            height={150}
          />
          <span
            className="text-red-500 text-sm pr-2 mt-3 cursor-pointer"
            onClick={() => setImageUrl(null)}
          >
            Hapus Gambar
          </span>
        </div>
      )}
    </>
  );
};

export default FileUpload;
