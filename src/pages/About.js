import { Container, Row, Col } from "react-bootstrap";
import aboutImg from "../assets/image/about.jpg";
import { Avatar } from "../components/imageViewer/Avatar";
import profile from "../assets/image/bonten.jpg";

export default function About() {
  return (
    <Container className="mt-5" style={{ fontFamily: "Rubik" }}>
      <Row className=" justify-content-center gap-5">
        <Col
          style={{
            textAlign: "justify",
            marginTop: "auto",
            marginBottom: "auto",
            fontSize: 20,
          }}
        >
          Pendakian (disebut juga kelana alam atau treking) umumnya merujuk
          kepada perjalanan panjang dan penuh semangat yang biasanya melewati
          jalan kecil di area pedalaman. Kegiatan ini umumnya dilakukan oleh
          klub-klub pecinta alam. Adakalanya dalam pendakian perjalanan harus
          melalui hutan lebat, dan harus memotong semak-semak untuk membuat
          jalur yang bisa dilewati. Pendakian ini bisa menghabiskan waktu lebih
          dari 1 hari perjalanan.
        </Col>
        <Col>
          <img
            src={aboutImg}
            alt="pendakian"
            style={{ objectFit: "cover", width: 640, borderRadius: 10 }}
          />
        </Col>
      </Row>
      <Row className="mt-5 justify-content-center">
        <Col lg={"auto"} style={{ fontFamily: "Lobster", fontSize: 24 }}>
          Enough, I don't know what I wrote hehe
        </Col>
      </Row>
      <Row className="mt-5 mb-5 justify-content-center">
        <Col lg={"auto"}>
          <Avatar picture={profile} size={150} />
        </Col>
        <Col lg={"auto"}>
          <div style={{ background: "black", width: 3, height: "100%" }}>.</div>
        </Col>
        <Col
          lg={"auto"}
          style={{ marginTop: "auto", marginBottom: "auto", fontWeight: 800 }}
        >
          <Row>Created</Row>
          <Row>By</Row>
          <Row>Human</Row>
        </Col>
      </Row>
    </Container>
  );
}
