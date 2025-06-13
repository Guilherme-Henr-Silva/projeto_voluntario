// Função para exibir as necessidades na página
function carregarNecessidades() {
  // Recupera do localStorage
  const necessidades = JSON.parse(localStorage.getItem("necessidades")) || [];

  const container = document.getElementById("listaNecessidades");
  container.innerHTML = ""; // Limpa antes de renderizar

  // Para cada necessidade, cria um card com as informações
  necessidades.forEach(n => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${n.titulo}</h3>
      <p><strong>Instituição:</strong> ${n.instituicao}</p>
      <p><strong>Tipo de Ajuda:</strong> ${n.tipoAjuda}</p>
      <p><strong>Descrição:</strong> ${n.descricao}</p>
      <p><strong>Endereço:</strong> ${n.rua}, ${n.bairro}, ${n.cidade} - ${n.estado}</p>
      <p><strong>Contato:</strong> ${n.contato}</p>
    `;

    container.appendChild(card);
  });
}

// Executa assim que a página carregar
window.addEventListener("DOMContentLoaded", carregarNecessidades);