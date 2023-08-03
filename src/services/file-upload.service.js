import myaxios from "../myaxios";

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (files) => {
  return myaxios
    .post("/api/upload", files)
    .then((res) => {
      console.log("res.data ===", res.data);
      return res.data;
    })
    .catch(errorHandler);
};

export default uploadImage;
