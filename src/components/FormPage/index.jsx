import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import uepaFoto from "../../assets/uepaFoto.png";
import "./styles.css";
import Footer from "../Footer";
import Menu from "../Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const FormPage = () => {
  const formSchema = yup.object().shape({
    nome: yup.string().required("Insira seu nome."),
    cpf: yup
      .string()
      .required("Insira seu CPF.")
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido."),
    email: yup.string().required("Insira seu email.").email("Email inválido."),
    telefone: yup
      .string()
      .required("Insira seu telefone.")
      .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido."),
    cargo: yup
      .string()
      .required("Escolha uma função.")
      .notOneOf([""], "Escolha uma função."),
    curriculo: yup
      .mixed()
      .required("Por favor, insira o seu currículo em PDF.")
      .test(
        "fileSize",
        "O arquivo deve ser menor que 15MB.",
        (value) => value && value[0] && value[0].size <= 15 * 1024 * 1024
      )
      .test(
        "fileType",
        "O arquivo deve ser em PDF.",
        (value) => value && value[0] && value[0].type === "application/pdf"
      ),
    termos: yup
      .boolean()
      .oneOf([true], "Você deve aceitar os termos de uso.")
      .required("Você deve aceitar os termos de uso."),
    dataNascimento: yup
      .date()
      .nullable()
      .required("Insira sua data de nascimento.")
      .transform((curr, orig) => (orig === "" ? null : curr))
      .max(new Date(), "A data não pode ser no futuro."),
    sexo: yup
      .string()
      .required("Escolha uma opção de sexo.")
      .oneOf(["feminino", "masculino", "outro"], "Opção inválida."),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = async (data) => {
    console.log(data);
    const dataNascimento = new Date(data.dataNascimento).toLocaleDateString(
      "pt-BR"
    );
    const curriculoNome = data.curriculo[0].name;
    data.curriculo = curriculoNome;
    data.dataNascimento = dataNascimento;

    try {
      const response = await axios.post(
        "https://web-api-9i8m.onrender.com/inscritos",
        data
      );

      if (response.status === 201) {
        toast.success("Inscrição efetuada com sucesso!");
        reset();
        setValue("cpf", "");
        setValue("telefone", "");
        reset({
          nome: "",
          cpf: "",
          email: "",
          telefone: "",
          dataNascimento: "",
          sexo: "",
          cargo: "",
          curriculo: null,
          termos: false,
        });
      } else {
        toast.error("Erro ao enviar a inscrição.");
      }
    } catch (error) {
      console.error("Erro ao enviar a inscrição:", error);
      toast.error("Erro ao enviar a inscrição.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Menu />
      <div className="main-divisor">
        <div className="photo-container">
          <img src={uepaFoto} alt="foto-da-UEPA" />
        </div>
        <div className="form-container">
          <h2>Inscrição</h2>
          <p>
            Para se inscrever no processo seletivo, preencha o formulário com
            seus dados pessoais e anexe os documentos solicitados. Não perca
            essa oportunidade!
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
            <div className="divisor">
              <div className="input-content">
                <label>Nome</label>
                <input
                  placeholder="Digite seu nome completo"
                  className={errors.nome ? "error" : ""}
                  {...register("nome")}
                />
                {errors.nome && <p className="error">{errors.nome.message}</p>}
              </div>
              <div className="input-content">
                <label>CPF</label>
                <InputMask
                  mask={"999.999.999-99"}
                  placeholder="Ex: 123.456.789-10"
                  className={errors.cpf ? "error" : ""}
                  {...register("cpf")}
                />
                {errors.cpf && <p className="error">{errors.cpf.message}</p>}
              </div>
            </div>
            <div className="divisor">
              <div className="input-content">
                <label>Email</label>
                <input
                  placeholder="exemplo@gmail.com"
                  className={errors.email ? "error" : ""}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>
              <div className="input-content">
                <label>Telefone</label>
                <InputMask
                  mask="(99) 99999-9999"
                  placeholder="Ex: (12) 34567-8901"
                  className={errors.telefone ? "error" : ""}
                  {...register("telefone")}
                />
                {errors.telefone && (
                  <p className="error">{errors.telefone.message}</p>
                )}
              </div>
            </div>
            <div className="divisor">
              <div className="input-content">
                <label>Data de Nascimento</label>
                <input
                  type="date"
                  className={errors.dataNascimento ? "error" : ""}
                  {...register("dataNascimento")}
                />
                {errors.dataNascimento && (
                  <p className="error">{errors.dataNascimento.message}</p>
                )}
              </div>
              <div className="input-content">
                <label>Sexo</label>
                <select
                  {...register("sexo")}
                  className={errors.sexo ? "error" : ""}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.sexo && <p className="error">{errors.sexo.message}</p>}
              </div>
            </div>
            <div className="select-content">
              <label>Função</label>
              <select
                {...register("cargo")}
                className={errors.cargo ? "error" : ""}
              >
                <option value="">Selecione uma função</option>
                <option value="altamira">
                  Altamira - Artífice de Manutenção
                </option>
                <option value="ananindeua_agenteadm">
                  Ananindeua - Agente Administrativo
                </option>
                <option value="ananindeua_artificemanu">
                  Ananindeua - Artífice de Manutenção
                </option>
                <option value="ananindeua_motorista">
                  Ananindeua - Motorista
                </option>
                <option value="ananindeua_tecapeda">
                  Ananindeua - Técnico A - Pedagogia
                </option>
                <option value="ananindeua_tecnicolab">
                  Ananindeua - Técnico de Laboratório (Nível Médio
                  Profissionalizante)
                </option>
                <option value="ananindeua_tecninfo">
                  Ananindeua - Técnico em Informática (Nível Médio
                  Profissionalizante)
                </option>
                <option value="barcarena_tecapeda">
                  Barcarena - Técnico A - Pedagogia
                </option>
                <option value="belem_artificemanu">
                  Belém - Artífice de Manutenção
                </option>
                <option value="belem_auxiliarserv">
                  Belém - Auxiliar de Serviços
                </option>
                <option value="belem_tecnicoanalitec">
                  Belém - Técnico A - Analista de Tecnologia da Informação e
                  Comunicação/TIC - Desenvolvimento de Sistemas
                </option>
                <option value="belem_tecnicoanalitec_infraestrutura_rede">
                  Belém - Técnico A - Analista de Tecnologia da Informação e
                  Comunicação/TIC - Infraestrutura de Rede
                </option>
                <option value="belem_tecnico_bacharel">
                  Belém - Técnico A - Bacharelado em Secretariado Executivo
                </option>
                <option value="belem_tecnico_biologia">
                  Belém - Técnico A - Biologia
                </option>
                <option value="belem_tecnico_comunicacao_social">
                  Belém - Técnico A - Comunicação Social
                </option>
                <option value="belem_tecnico_designer">
                  Belém - Técnico A - Designer
                </option>
                <option value="belem_tecnico_enfermagem">
                  Belém - Técnico A - Enfermagem
                </option>
                <option value="belem_tecnico_engenharia_ambiental">
                  Belém - Técnico A - Engenharia Ambiental
                </option>
                <option value="belem_tecnico_medicina_clinica_geral">
                  Belém - Técnico A - Medicina Clínica Geral
                </option>
                <option value="belem_tecnico_pedagogia">
                  Belém - Técnico A - Pedagogia
                </option>
                <option value="belem_tecnico_psicologia">
                  Belém - Técnico A - Psicologia
                </option>
                <option value="belem_tecnico_servico_social">
                  Belém - Técnico A - Serviço Social
                </option>
                <option value="belem_tecnico_tradutor_interprete_libras">
                  Belém - Técnico A - Tradutor e Intérprete de Libras
                </option>
                <option value="belem_tecnico_laboratorio">
                  Belém - Técnico de Laboratório (Nível Médio
                  Profissionalizante)
                </option>
                <option value="belem_tecnico_enfermagem">
                  Belém - Técnico em Enfermagem (Nível Médio Profissionalizante)
                </option>
                <option value="cameta_tecnpeda">
                  Cametá - Técnico A - Pedagogia
                </option>
                <option value="cameta_tecnico_informatica">
                  Cametá - Técnico em Informática (Nível Médio
                  Profissionalizante)
                </option>
                <option value="castanhal_motorista">
                  Castanhal - Motorista
                </option>
                <option value="castanhal_tecnico_informatica">
                  Castanhal - Técnico em Informática (Nível Médio
                  Profissionalizante)
                </option>
                <option value="igarape_acu_auxiliar_servicos">
                  Igarapé Açu - Auxiliar de Serviços
                </option>
                <option value="igarape_acu_motorista">
                  Igarapé Açu - Motorista
                </option>
                <option value="maraba_tecnpeda">
                  Marabá - Técnico A - Pedagogia
                </option>
                <option value="maraba_transcritor_braille">
                  Marabá - Transcritor de Braille
                </option>
                <option value="moju_artifice_manutencao">
                  Moju - Artífice de Manutenção
                </option>
                <option value="moju_tecnpeda">
                  Moju - Técnico A - Pedagogia
                </option>
                <option value="moju_tecnico_informatica">
                  Moju - Técnico em Informática (Nível Médio Profissionalizante)
                </option>
                <option value="paragominas_artifice_manutencao">
                  Paragominas - Artífice de Manutenção
                </option>
                <option value="paragominas_tecnico_laboratorio">
                  Paragominas - Técnico de Laboratório (Nível Médio
                  Profissionalizante)
                </option>
                <option value="parauapebas_agente_administrativo">
                  Parauapebas - Agente Administrativo
                </option>
                <option value="parauapebas_artifice_manutencao">
                  Parauapebas - Artífice de Manutenção
                </option>
                <option value="parauapebas_motorista">
                  Parauapebas - Motorista
                </option>
                <option value="parauapebas_tecnpeda">
                  Parauapebas - Técnico A - Pedagogia
                </option>
              </select>
              {errors.cargo && <p className="error">{errors.cargo.message}</p>}
            </div>
            <div className="select-content">
              <label>Carregar PDF</label>
              <input
                type="file"
                accept="application/pdf"
                className={errors.curriculo ? "error" : ""}
                {...register("curriculo")}
              />
              {errors.curriculo && (
                <p className="error">{errors.curriculo.message}</p>
              )}
            </div>
            <div className="termos-content">
              <div>
                <p>
                  Eu li e aceito os <a href="/">termos de uso</a>.
                </p>
                <input type="checkbox" {...register("termos")} />
              </div>
              {errors.termos && (
                <p className="error">{errors.termos.message}</p>
              )}
            </div>
            <div className="button-container">
              <button className="button" type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormPage;
