import { useState, useEffect } from "react"; // o useState é uma função que vai gerar um estado pra gente, e ele retorna o estado e o seu manipulador em um formato de array
import TaskContainer from "./components/TaskContainer";
import TaskItem from "./components/TaskItem";
import "./styles/global.css"

interface Tarefa {
  titulo: string;
  done: boolean;
}

function App() {
//  const listaTarefas = useState([]);  aqui dizemos que a variavel listaTarefas armazenara o retorno de useState. Ao colocar a [](lista vazia) estamos dizendo que o estado inicial é uma lista vazia
  const [tarefas, setTarefas] = useState<Tarefa[]>([])   // useState neste caso é chamada de variavel de estado
  const [tituloTarefa, setTituloTarefa] = useState<string>("") // aqui estamos tipando o useState e dizendo que ele começará como uma string vazia. Neste caso estamos dando o nome de tituloTarefa para a nossa variavel de estado e o nosso setter será o setTituloTarefa, que nada mais é do que uma função que o useState retorna para atualizar o valor de tituloTarefa.                                                                    // aqui a variavel tarefas representa o estado e a variavel setTarefas representa o manipulador

  function adicionarTarefa() {
    setTarefas([...tarefas,{ // a setTarefas é usada aqui para atualizar o array tarefas
      titulo: tituloTarefa,  //  aqui em titulo colocamos tituloTarefa pois assim pegaremos o que esta dentro do meu estado atual, e quem atualizará esse estado será o proprio input
      done: false
    }]) // aqui para fazer funcionar precisamos desestruturar tarefas deste como:...tarefas, e adicionar a nova tarefa que queremos ("tarefa 2"). Então aqui em setTarefas sempre precisaremos informar o estado atual e o novo item que queremos colocar. Em resumo a setTarefas irá alterar e substituir todo o meu estado.
    // Explicação: quando trabalhamos com estado ele não aceitará que simplesmente adicionemos mais coisas, precisaremos sempre sobrescrever o estado anterior
  }

  function concluirTarefa(posicao: number) {  // aqui iremos receber a posição do nosso item
    const novaLista = [...tarefas]; // aqui estamos pegando o que esta dentro do estado. Em resumo desse modo ele está criando uma nova informação, e o conteúdo dela tem tudo o que tem dentro do estado, então assim conseguimos setar dentro da nova lista.
    novaLista[posicao].done = true; // e aqui estamos dizendo: vai lá nessa posição dessa lista que estou recebendo e altere a propriedade done para true.
    setTarefas(novaLista);                                // como o react só aceita sobrescrever o estado por completo então colocamos a nossa lista atualizada em setTarefas para sobrescrever o estado
  }


  useEffect(() => {
    if(tarefas.length >= 10) {
      alert("voce tem 10 tarefas")
    }
  }, [tarefas])     // aqui passamos uma função que queremos que o useEffect realize. Então o primeiro parametro será a callback function e o segundo será um array de dependencias. Este array de dependencias ficará observando geralmente algum estado ou alguma coisa que é mutavel ao longo do processo, e toda vez que acontecer alguma alteração(por isso array de dependencia) ele irá executar a função descrita. Então se colocarmos dentro dos colchetes a "tarefas", toda vez que mudarmos o estado de tarefas, como adicionar uma tarefa ou excluir uma tarefa, ele iria executar essa função. Por isso é chamado de efeito, pois depende de algo para efetuar a função. 
  return(
    <main className="container">
      <h1 className="m-5">📋Task Manager</h1>
      <div id="new-task">
        <input type="text" onChange={(event) => setTituloTarefa(event.target.value)} value={tituloTarefa} />  {/* aqui passamos para value a variavel de estado tituloTarefa. O onChange é um evento que pode ser chamado de dentro de um input, e ele sempre será disparado quando houver alguma mudança. Então receberemos um objeto(event). Quando for executado o onChange nós modificaremos o estado, então para isso usamos o setTituloTarefa e pegamos o que está dentro do event.target.value. Quando usamos o target estamos nos referindo ao proprio input, o event esta pegando os valores de teclado. Então neste caso não estamos mais usando o estado proprio(nativo) do input, estamos usando o nosso proprio estado, e uma consequencia disso é que o valor que ele iria receber se perde, então para isso não se perder estamos pedindo para ele:pegue o valor que ele iria receber e ponha dentro do meu estado, e como o "value" esta definido para receber o meu estado ele fará a partir de agora uma atualização em tempo real*/}
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