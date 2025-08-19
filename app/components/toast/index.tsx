import toast from "react-hot-toast";

/**OPTIONS FOR TOAST */
let default_options: any = {
  position: "top-center",
  autoClose: 4500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "toster-bar",
};

/**TOAST COMPONENT FOR NOTIFICATIONS */
let lastMessage: string;

class Toaster {
  success = (message: string, _options?: any) => {
    let options = Object.assign(default_options, _options || {});
    if (lastMessage !== message) {
      toast.success(message, options);
      lastMessage = message;

      setTimeout(() => {
        lastMessage = "";
      }, options.autoClose);
    }
  };

  error = (message: string, _options?: any) => {
    let options = Object.assign(default_options, _options || {});
    if (lastMessage !== message) {
      toast.error(message, options);
      lastMessage = message;

      setTimeout(() => {
        lastMessage = "";
      }, options.autoClose);
    }
  };
}

const toaster = new Toaster();
export default toaster;
