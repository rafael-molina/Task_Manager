
import "./style.css"

interface TaskItemProps {
    titulo: string;
    done?: boolean;
    concluirTarefa: () => void;  // aqui estamos recebendo a função concluirTarefa via parametro, pois além de passar qualquer valor através de parametros tambem podemos passar uma função para ser executada no filho. Neste caso será uma função que retornará void pois ela nao faz nada neste ponto
}

export default function TaskItem(props: TaskItemProps) {
    return (
    <div className="container-li">
        <li className={`task-item ${props.done ? "done" : ""}`}> {/* aqui estamos dizendo: se props.done for true então adicione a classe done dentro do className, caso contrario nao adicionaremos nada("" string vazia)*/}
            <span>❌</span>
            <p>{props.titulo}</p>
            <span onClick={props.concluirTarefa}>✅</span>
        </li>

    </div>
    
)}