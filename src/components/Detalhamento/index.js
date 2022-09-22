import './detalhamento.css'
import DetalhesDespesa from '../DetalhesDespesa';
import {useState, useContext} from 'react';
import { GeneralContext } from '../../contexts/General';

export default function Detalhamento(){

  const {listDespesas, setListDespesas, buscarDados} = useContext(GeneralContext);

  const [detalhaDespesa, setToogleDespesa] = useState(false)
  const [despesaSelecionada, setDespesaSelecionada] = useState({})
  //descrição resumida é de 27 caractéres no máximo


  let setaDespesa = (despesa)=>{
    setDespesaSelecionada(despesa)
    toogleDespesa();
  }

  let toogleDespesa = ()=>{
    setToogleDespesa(!detalhaDespesa);
  }

  return(
      <div className='detalhamento--content'>
        <div className='datalhamento--header'>
          <h3>Detalhamento</h3>
        </div>
        <div className='detalhamento--list'>
          <table>
            <tbody>
              {listDespesas.map((despesa)=>{
                return(
                  <tr key={despesa.id} onClick={()=> setaDespesa(despesa)}>
                    <td>{despesa.descricao}</td>
                    <td>R$ {despesa.valor.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  </tr>
                )})
              }
            </tbody>
          </table>
        </div>
        {detalhaDespesa && <DetalhesDespesa despesa={despesaSelecionada} close={toogleDespesa}/>}
      </div>
  )
}