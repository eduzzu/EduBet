import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useAppSelector } from "../../state/hooks";

const Navbar = () => {

    const navigate = useNavigate();
    const user = useAppSelector((state: any ) => state.auth.user);

    return (
        <nav className="navbar">
            <h1 onClick={() => user.isAdmin ? navigate("/home/admin") : navigate("/home")} className="edubet">EDUBET</h1>
            {user ? (
                <>
                <div className="navbarOptions">
                <h4 onClick={() => navigate("/competitions")}>Competitions</h4>
                <h4 onClick={() => navigate(`/users/${user._id}/bets`)}>My Bets</h4>
                <h4 onClick={() => navigate("/betting")}>Bet Builder</h4>
                <h4 onClick={() => navigate("/offers")}>Offers</h4>
                </div>
                <div className="userInfo" onClick={() => navigate(`/users/${user._id}`)}>
                    <div className="userData">
                    <h6>{user.username}</h6>
                    <h6 style={{fontSize: "13px"}}>{user.accountBalance.toFixed(2)} RON</h6>
                    </div>
                    {user.profilePicture ? (
                        <img src={`${user.profilePicture}`} alt="User Image" />  
                    ):
                        <img src="../../../public/assets/userImage.png" alt="User Image" />
                    }
                    
                </div>
                </>
            ): undefined}
            
            
        </nav>
    )

}

export default Navbar;