import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function LandingPage(){
    const navigate = useNavigate()
    return(
        <Container  className="mt-5">
            <div style={{position: "absolute", top: "50%",left: "50%",transform: "translate(-50%, -50%)",}}>
                <div style={{fontFamily: "Rubik", fontSize: 50, fontWeight: 600}}>Mading Sekolah Tinggi</div>
                <div className="d-flex justify-content-center mt-4 gap-4">
                    <div style={{backgroundColor: "#EF6262", padding: 20, fontSize: 60,fontWeight: 600, color: "white"}}>
                        Je
                    </div>
                    <div style={{backgroundColor: "#4682A9", padding: 20, fontSize: 60,fontWeight: 600, color: "white"}}>
                        We
                    </div>
                    <div style={{backgroundColor: "#FFE17B", padding: 20, fontSize: 60,fontWeight: 600, color: "white"}}>
                        Pe
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-5">
                <button class="button learn-more" onClick={()=> {navigate("/dashboard")}}>
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Dashboard</span>
                    </button>
                </div>
            </div>
        </Container>
    )
}