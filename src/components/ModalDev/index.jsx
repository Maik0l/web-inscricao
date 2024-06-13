import React from "react";
import "./styles.css";
import maikolIcon from "../../assets/icon_maikol.jpg";
import gustavoIcon from "../../assets/icon_gustavo.jpg";

const ModalDev = ({ closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Desenvolvedores</h2>
        <div>
          <div className="developer">
            <img src={gustavoIcon} alt="icon-gustavo" />
            <div>
              <p>
                Nome: <b>Gustavo Harley</b>
              </p>
              <p>Estudante de Engenharia de Software</p>
            </div>
          </div>
          <div className="developer">
            <img src={maikolIcon} alt="icon-maikol" />
            <div>
              <p>
                Nome: <b>Maikol Moraes</b>
              </p>
              <p>Estudante de Engenharia de Software</p>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button onClick={closeModal}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDev;
