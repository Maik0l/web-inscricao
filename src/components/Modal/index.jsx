import React from "react";
import "./styles.css";

const Modal = ({ closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Sobre</h2>
        <p>
          Este projeto é parte da disciplina de Programação Web, ministrada pelo
          Prof. Dr. Thiago Conte. Visa desenvolver habilidades práticas em
          programação web, através da inscrição em um processo seletivo. Os
          alunos aplicam conhecimentos teóricos em um ambiente real, sob
          orientação do professor, criando uma aplicação web funcional e
          responsiva. Isso proporciona oportunidades para explorar tecnologias e
          metodologias de desenvolvimento, além de desenvolver habilidades de
          resolução de problemas e trabalho em equipe.
        </p>
        <div className="button-container">
          <button onClick={closeModal}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
