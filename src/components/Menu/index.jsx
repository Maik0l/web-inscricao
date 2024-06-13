import "./styles.css";
import uepaLogo from "../../assets/uepa.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal";
import ModalDev from "../ModalDev";

const Menu = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDevOpen, setModalDevOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModalDev = () => {
    setModalDevOpen(true);
  };

  const closeModalDev = () => {
    setModalDevOpen(false);
  };

  return (
    <header>
      <div className="header-image">
        <img src={uepaLogo} alt="uepa-logo" />
      </div>
      <div className="header-links">
        <ul>
          <Link className="menu-link" to="/">
            Página Inicial
          </Link>
          <li onClick={openModal}>Sobre</li>
          <li onClick={openModalDev}>Desenvolvedores</li>
        </ul>
      </div>
      {modalOpen && <Modal closeModal={closeModal} />}
      {modalDevOpen && <ModalDev closeModal={closeModalDev} />}
    </header>
  );
};

export default Menu;
