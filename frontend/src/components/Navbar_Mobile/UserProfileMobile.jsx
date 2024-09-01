import { Button, IconButton } from "@mui/material";
import "../../assets/styles/Navbar_Mobile.scss";
import { CgClose } from "react-icons/cg";
import { purple } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function UserProfileMobile({ isHideProfile }) {
    const theme = useTheme();
    const [authUser, setAuthUser] = useState(false); 
    
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        setAuthUser(true);
      }
    }, [])
    
    
    function handleHideMobileProfile () {
        isHideProfile(false)
    }

  return (
    <div className={`rounded-t-3xl flex justify-center items-center w-full p-3 ${theme.palette.mode === "dark" ? 'bg-purple-950' : 'bg-purple-100'} fixed bottom-0 left-0 z-[1021] h-[300px]`}>
      <IconButton aria-label="home" onClick={handleHideMobileProfile} sx={{ position: 'absolute', top: 0, right: 3}}>
        <CgClose />
      </IconButton>
      <div className="flex flex-col justify-between items-center min-h-100 gap-2">
        <div className="w-[100px] h-[100px] bg-purple-300 rounded-full">
          <img src="" alt="" />
        </div>
        {authUser ? (
          <>
            <p>
              Profile
            </p> 
          <Link to={'/profile'} onClick={handleHideMobileProfile} className="px-3 py-2 text-center" style={{ width: "100%", backgroundColor: purple[300], color: '#fff',borderRadius: '25px' }}>My Profile</Link>
          </>
        ) : (
          <>
            <p>
              After logging in, you will have access to products with personal
              discounts
            </p>  
            <Link to={'/login'} onClick={handleHideMobileProfile}>
                <Button sx={{ width: "100%", backgroundColor: purple[300], color: '#fff',borderRadius: '25px' }}>
                    Login or create profile
                </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
