import { useEffect } from "react";
import { MdCheck } from "react-icons/md";

export default function AlertSuccess({ CartAdded, textAlert, onAlertClose }) {
  
  useEffect(() => {
    let handleTimeoutAlert;
    
    if (CartAdded) {
      handleTimeoutAlert = setTimeout(() => {
        onAlertClose();
      }, 3000);
    }

    return () => {
      clearTimeout(handleTimeoutAlert);
    }
  }, [CartAdded, onAlertClose]);
  
  return (
    <div
      className={`fixed left-[50%] ${
                CartAdded ? "opacity-1 top-[200px] animate-flyInDown" : "top-[-100%] opacity-0"
            } 
            z-[900] transition rounded-xl translate-x-[-50%] flex items-center justify-center gap-2 text-white w-[300px] py-2`
        }
      style={{ backgroundColor: "rgb(0,0,0,0.8)", transition: "0.2s ease" }}
    >
      <MdCheck />
      <span className="text-[13px]">
        {textAlert ?? textAlert}
      </span>
    </div>
  );
}
