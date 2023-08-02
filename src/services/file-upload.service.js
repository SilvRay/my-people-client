import myaxios from "../myaxios";

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
  return myaxios
    .post("/api/upload", file)
    .then((res) => {
      console.log("res.data ===", res.data);
      return res.data;
    })
    .catch(errorHandler);
};

export default uploadImage;
