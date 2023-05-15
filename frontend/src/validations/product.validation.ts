import * as yup from "yup";

const ProductSchemaValidation = yup
  .object()
  .shape({
    foto_produk: yup
      .mixed()
      // .test(
      //   "required",
      //   "Foto Produk is required",
      //   (value: any) => value.length > 0
      // )
      .test("fileSize", "File harus dibawah 100kb", (value: any) => {
        if (!value.length) return true;
        return value[0].size <= 100000;
      })
      .test("fileType", "Unsupported File Format", (value: any) => {
        if (!value.length) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
      }),
    nama_produk: yup
      .string()
      .required("Nama Produk is required")
      .min(3, "Nama Produk must be at least 3 characters long"),
    harga_beli: yup
      .number()
      .typeError("Harga Beli harus berupa angka")
      .required("Harga Beli is required")
      .positive()
      .min(4, "Harga tidak boleh terlalu kecil")
      .integer("asd"),
    harga_jual: yup
      .number()
      .typeError("Harga Jual harus berupa angka")
      .required("Harga Jual is required")
      .positive()
      .min(4, "Harga tidak boleh terlalu kecil")
      .integer("asd"),
    stok: yup
      .number()
      .typeError("Stok harus berupa angka")
      .required("Stok is required")
      .positive()
      .integer("asd"),
  })
  .required();

export { ProductSchemaValidation };
