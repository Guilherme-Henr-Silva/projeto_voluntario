// Função chamada ao submeter o formulário
function cadastrarNecessidade(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Captura os valores dos campos
  const instituicao = document.getElementById("instituicao").value.trim();
  const tipoAjuda = document.getElementById("tipoAjuda").value;
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const rua = document.getElementById("rua").value.trim();
  const bairro = document.getElementById("bairro").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const contato = document.getElementById("contato").value.trim();

  // Validação dos campos obrigatórios
  if (!instituicao || !tipoAjuda || !titulo || !descricao || !cep || !rua || !bairro || !cidade || !estado || !contato) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Cria um objeto com os dados da necessidade
  const novaNecessidade = {
    instituicao,
    tipoAjuda,
    titulo,
    descricao,
    cep,
    rua,
    bairro,
    cidade,
    estado,
    contato
  };

  // Busca necessidades anteriores salvas no localStorage
  let necessidades = JSON.parse(localStorage.getItem("necessidades")) || [];

  // Adiciona nova necessidade ao array
  necessidades.push(novaNecessidade);

  // Salva o array atualizado no localStorage
  localStorage.setItem("necessidades", JSON.stringify(necessidades));

  // Alerta de sucesso
  alert("Necessidade cadastrada com sucesso!");

  // Limpa o formulário
  document.getElementById("formCadastro").reset();
}

// Integração com a API ViaCEP
function buscarEndereco() {
  const cep = document.getElementById("cep").value.trim();

  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      // Preenche os campos com os dados do ViaCEP
      document.getElementById("rua").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("estado").value = data.uf || "";
    })
    .catch(() => {
      alert("Erro ao buscar o CEP.");
    });
}