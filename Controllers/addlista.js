let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function atualizarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function exibirTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";
    tarefas.forEach((tarefa, index) => {
        const div = document.createElement("div");
        div.className = "tarefa" + (tarefa.completa ? " completa" : "");

        const btnStatus = document.createElement("button");
        btnStatus.className = "btn-status" + (tarefa.completa ? " concluida" : "");
        btnStatus.onclick = () => {
            if (!tarefa.completa) {
                if (confirm("Deseja marcar esta tarefa como concluída?")) {
                    tarefa.completa = true;
                }
            } else {
                if (confirm("Deseja desmarcar esta tarefa?")) {
                    tarefa.completa = false;
                }
            }
            atualizarTarefas();
            exibirTarefas();
        };

        const texto = document.createElement("span");
        texto.textContent = tarefa.descricao;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => {
            const novaDescricao = prompt("Novo nome da tarefa:", tarefa.descricao);
            if (novaDescricao && novaDescricao.trim() !== "") {
                tarefa.descricao = novaDescricao;
                atualizarTarefas();
                alert("Tarefa editada com sucesso!");
                exibirTarefas();
            } else {
                alert("Erro: descrição inválida!");
            }
        };

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = () => {
            tarefas.splice(index, 1);
            atualizarTarefas();
            exibirTarefas();
        };

        div.appendChild(btnStatus);
        div.appendChild(texto);
        div.appendChild(btnEditar);
        div.appendChild(btnExcluir);
        lista.appendChild(div);
    });
}


function adicionarTarefa() {
    const input = document.getElementById("novaTarefa");
    if (input.value.trim() === "") {
        alert("Erro: não é possível adicionar tarefa vazia!");
        return;
    }
    tarefas.push({ descricao: input.value, completa: false });
    atualizarTarefas();
    input.value = "";
    alert("Tarefa adicionada com sucesso!");
    exibirTarefas();
}

function limparTarefas() {
    if (confirm("Tem certeza que deseja apagar todas as tarefas?")) {
        tarefas = [];
        atualizarTarefas();
        exibirTarefas();
    }
}

exibirTarefas();
