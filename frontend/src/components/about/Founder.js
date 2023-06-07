import React from "react";

//navbar footer
import Navbar from "../navbar";
import Footer from "../Footer";

//css
import "../../style/Founder.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Founder = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div id="founder">
        <Container fluid className="founder-container">
          <Row>
            <Col className="col-12 col-sm-8 mx-auto text-uppercase">
              <div className="founder-title">founder</div>
            </Col>
          </Row>
          <Row className="my-4">
            <Col className="col-12 col-md-5 col-lg-4">
              <div className="founder-card-container">
                <div className="f-box-left"></div>
                <div className="f-box-img"></div>
                <div className="f-box-right"></div>
              </div>
              <div className="founder-detail">
                <div className="founder-name">Khenchen Tashi Tsering</div>
                <div className="founder-post">Rinpoche</div>
              </div>
            </Col>
            <Col className="col-12 col-md-7 col-lg-8">
              <div className="founder-main-detail">
                <div className="f-name text-capitalize">
                  Khenchen Tashi Tsering Rinpoche
                </div>
                <div className="f-para">
                  Late. Ven. Khenchen Tashi Tsering Rinpoche was born in the
                  village called Lho, in the Nubri Valley which is located in
                  Gorkha district of Nepal, which is also considered the sacred
                  hidden land of Guru Padmasambhava. The village is near the
                  hill Rinchen Pungpa (Heaped Jewel) located in front of the
                  holy mountain. His parents were humble and very much dedicated
                  their lives in practice of Buddhism. As khen Rinpoche parent
                  were poor and uneducated he spent most of the childhood time
                  grazing cattle and doing household chores. At the age of
                  eight, He took refuge vows from Kyabje Tsewang Rinpoche and
                  learned how to read and write Tibetan. He received teachings
                  on the preliminary practices of Tibetan Buddhism and engaged
                  in practice very diligently along with practicing and
                  contemplating on major Buddhist philosophical texts. He was
                  trained in vajra dance, mandala proportions, chanting and
                  other traditional rites and rituals. Moreover, he also
                  received essential instructions and practiced meditation for
                  more than nine years with his teacher in the Himalaya. When he
                  was twenty years old, He came under the compassionate
                  protection of Kyabje Drubwang Penor Rinpoche and enrolled in
                  Ngagyur Nyingma Institute, Namdroling Monastery, where he
                  studied sutra, tantra and traditional common sciences for nine
                  years under the great teachers like Khenchen Pema Sherab,
                  Khenchen Namdrol Tsering and many others. . During his studies
                  in monastic institute, He devoted himself into the studies of
                  vast and profound Buddhist teachings where he accomplished
                  unparalleled knowledge upon Buddhist philosophy. He had also
                  taught Buddhist teachings in institute as a professor for
                  several years and also faithfully served other senior
                  positions in which he was appointed. He is regarded as one of
                  respected and genuine teacher from our monastery. He had
                  become one of the first Khenpo from Namdroling institute where
                  he also served as head master for a year. Later on, he built a
                  monastery in Nubri, Nepal, under the guidance of H.H. Penor
                  Rinpoche, in order to expand and propagate Buddhist teachings
                  and to bring immense benefit to all local people. He also look
                  after more than 200 monks to whom he provides free education,
                  food and clothing. Through his tireless contributions to the
                  needy and underprivileged members
                </div>
                <div className="f-icon">
                  <div className="f-line"></div>
                  <div className="f-fb">
                    <i className="fa-brands fa-square-facebook"></i>
                  </div>
                  <div className="f-insta">
                    <i class="fa-brands fa-instagram"></i>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Founder;
