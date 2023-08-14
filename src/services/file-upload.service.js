import myaxios from "../myaxios";

const errorHandler = (err) => {
  console.log(err);
};

export const uploadImagePost = (files) => {
  return myaxios
    .post("/api/upload/post", files)
    .then((res) => {
      console.log("res.data ===", res.data);
      return res.data;
    })
    .catch(errorHandler);
};

export const uploadImageProfile = (files) => {
  return myaxios
    .post("/api/upload/profileImg", files)
    .then((res) => {
      console.log("res.data ===", res.data);
      return res.data;
    })
    .catch(errorHandler);
};
