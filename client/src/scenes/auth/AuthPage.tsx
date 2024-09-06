import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Form from "./Form";
import "./auth.css";

const AuthPage = () => {
    

    return (
        <>
        <Navbar />
        <div className="auth">
            <div id="authForm"> 
                <h5>Welcome to EduBet, where strategy meets success.</h5>
                <Form />
            </div>
        </div>
        <Footer />
        </>
       
    )

}

export default AuthPage;