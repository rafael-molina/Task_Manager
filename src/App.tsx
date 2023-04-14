import { useState } from "react"; // o useState é uma função que vai gerar um estado pra gente, e ele retorna o estado e o seu manipulador em um formato de array
import TaskContainer from "./components/TaskContainer";
import TaskItem from "./components/TaskItem";
import "./styles/global.css"

interface Tarefa {
  titulo: string;
  done: boolean;
}

function App() {
//  const listaTarefas = useState([]);  aqui dizemos que a variavel listaTarefas armazenara o retorno de useState. Ao colocar a [](lista vazia) estamos dizendo que o estado inicial é uma lista vazia
  const [tarefas, setTarefas] = useState<Tarefa[]>([   // useState neste caso é chamada de variavel de estado
    {
      titulo: "tarefa 1",
      done: false
    }]); // aqui a variavel tarefas representa o estado e a variavel setTarefas representa o manipulador

  function adicionarTarefa() {
    setTarefas([...tarefas,{ // a setTarefas é usada aqui para atualizar o array tarefas
      titulo: "tarefa 2",
      done: false
    }]) // aqui para fazer funcionar precisamos desestruturar tarefas deste como:...tarefas, e adicionar a nova tarefa que queremos ("tarefa 2"). Então aqui em setTarefas sempre precisaremos informar o estado atual e o novo item que queremos colocar. Em resumo a setTarefas irá alterar e substituir todo o meu estado.
    // Explicação: quando trabalhamos com estado ele não aceitará que simplesmente adicionemos mais coisas, precisaremos sempre sobrescrever o estado anterior
  }

  function concluirTarefa(posicao: number) {  // aqui iremos receber a posição do nosso item
    const novaLista = [...tarefas]; // aqui estamos pegando o que esta dentro do estado. Em resumo desse modo ele está criando uma nova informação, e o conteúdo dela tem tudo o que tem dentro do estado, então assim conseguimos setar dentro da nova lista.
    novaLista[posicao].done = true; // e aqui estamos dizendo: vai lá nessa posição dessa lista que estou recebendo e altere a propriedade done para true.
    setTarefas(novaLista);                                // como o react só aceita sobrescrever o estado por completo então colocamos a nossa lista atualizada em setTarefas para sobrescrever o estado
  }



  return(
    <main className="container">
      <h1 className="m-5">📋Task Manager</h1>
      <div id="new-task">
        <button id="btnAdd" className="btn btn-primary" onClick={adicionarTarefa}>
          add
        </button>
      </div>
      <TaskContainer>
        {
          tarefas.map( (tarefa: Tarefa, posicao: number) => {                    // o map converterá todos os itens do meu array. Aqui cada objeto será chamado de tarefa, como mostra a callback function, e cada tarefa desta será do tipo Tarefa, que foi a interface que montamos com as propriedades titulo e done. Sobre o metodo map: O segundo parametro da callback function map refere-se ao index, a posição do respectivo item dentro do array que se esta percorrendo.
            return <TaskItem titulo={tarefa.titulo} done={tarefa.done} concluirTarefa={() => concluirTarefa(posicao)} />  // aqui queremos retornar um array de objetos "tarefa", e cada um deles será igual ao componente TaskItem
          })                                                                                                              // sobre a função concluirTarefa neste ponto: aqui para conseguirmos passar a função concluirTarefa com a posicao nós precisamos gerar uma segunda função só para poder executar a concluirTarefa, e fazemos isto atraves de uma arrow function. Se deixassemos apenas a função concluirTarefa dentro das chaves nós acabariamos executando esta função, mas na verdade neste caso nós queremos passar a função já com o parametro setado 
        }
      </TaskContainer>
      
    </main>
  )
}

export default App;