import './detalheDespesa.css';
import {FiX, FiCheck, FiTrash} from 'react-icons/fi';
import { useEffect, useState, useContext} from 'react';
import {GeneralContext} from '../../contexts/General';
import api from '../../services/api';
import {toast} from 'react-toastify';



export default function DetalheDespesa({despesa, close}){

  const {buscarDados, setLoading, checkError} = useContext(GeneralContext);

  const [descricaoDespesa, setDescricaoDespesa] = useState(despesa.descricao);
  const [categoriaDespesa, setCategoriaDespesa] = useState(despesa.categoria);
  const [valorDespesa, setValorDespesa] = useState(0);
  const [complementoDespesa, setComplemento] = useState(despesa.complemento);
  
  useEffect(()=>{
    document.addEventListener('keyup',handleEsc,false); //adiciona validação de click de teclado
    if(despesa.valor !== undefined){setValorDespesa(despesa.valor)}
    return(()=>{
      document.removeEventListener('keyup',handleEsc,false); //remove validação de click de teclado
    })
  },[])

  function handleEsc(e){
    if(e.key === 'Escape'){
      close();
    }
  }

  function handleDescricao(e){
    if(e.target.value.length <= 27){
      setDescricaoDespesa(e.target.value);
    }
  }

  function handleCategoria(e){
    setCategoriaDespesa(e.target.value);
  }

  function handleValor(e){
    setValorDespesa(e.target.value);
  }
  function handleComplemento(e){
    setComplemento(e.target.value)
  }

  async function submitDetalhes(e){
    e.preventDefault();
    setLoading(true);
    try{
      await api.post('/modificar',{
        id: despesa.id,
        periodo: despesa.periodo,
        cartao: despesa.cartao,
        classificacao: categoriaDespesa,
        valor: valorDespesa,
        descricao: descricaoDespesa,
        complemento: complementoDespesa
      });
      await buscarDados();
      setLoading(false);
      toast.success('Registro alterado com sucesso');
      close();
    }catch(e){
      setLoading(false);
      checkError(e);
    }
  }

  async function excluirRegistro(e){
    e.preventDefault();
    try{
      await api.post('/excluir',{
        id: despesa.id
      });
      toast.success('Registro excluído com sucesso')
      await buscarDados();
      close();
    }catch(e){
      checkError(e);
    }
  }

  return(
    <div className='detalhes--modal'>
      <div className='container-modal'>
        <form onSubmit={submitDetalhes}>
          <button className='close' onClick={close} type='button'>
            <FiX size={23} color='#fff'/>
          </button>

          <h2>Detalhamento Despesa</h2>
            <div className='detalhes--row'>
              <span>Descrição:</span>
              <input type='text' value={descricaoDespesa} onChange={(e)=>handleDescricao(e)}></input>
            </div>

            <div className='detalhes--row'>
              <span>Categoria:</span>
              <select type='text' value={categoriaDespesa} onChange={(e)=>handleCategoria(e)}>
                <option>Mercado</option>
                <option>Almoço</option>
                <option>Alimentação</option>
                <option>Despesa Pessoal</option>
                <option>Outras</option>
                <option>Contas</option>
                <option>Transporte</option>
                <option>Lazer</option>
                <option>Vestuário</option>
                <option>Esportes</option>
                <option>Anuidade</option>
              </select>
            </div>

            <div className='detalhes--row'>
                <span>Valor R$:</span>
                <input type='text' value={valorDespesa.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})} onChange={(e)=>handleValor(e)}></input>
              </div>

            <div className='detalhes--row'>
              <span>Complemento:</span>
            </div>

            <div className='detalhes--row'>
              <textarea type='text' value={complementoDespesa} onChange={(e)=>handleComplemento(e)}></textarea>
            </div>

            <div className='detalhes--row detalhes-buttons'>
              <button className='detalhes--delete' onClick={(e)=>excluirRegistro(e)}>
                <FiTrash size={27} color='#fff'/>
              </button>
              <button className='detalhes--submit' type='submit'>
                <FiCheck size={27} color='#fff'/>
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}