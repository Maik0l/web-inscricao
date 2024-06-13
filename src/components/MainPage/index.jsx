import "./styles.css";
import Footer from "../Footer";
import Menu from "../Menu";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <Menu />
      <div className="body-background">
        <div className="float-box">
          <p>O processo seletivo abriu!</p>
          <div className="float-box-buttons">
            <Link className="float-box-button-1" to="/form">
              Ver Edital
            </Link>
            <Link class="float-box-button-2" to="/form">
              Ir para Inscrição
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
