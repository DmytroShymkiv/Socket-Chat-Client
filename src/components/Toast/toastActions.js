import { toast } from "react-toastify";

export const toastMessage = (name, text, shouldShow) => {
  shouldShow &&
    toast(name + " : " + text, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
};

export const toastError = (err) => {
  toast.error(err, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
