import './criarDespesa.css';
import {FiX, FiCheck} from 'react-icons/fi';
import { useContext, useEffect, useState} from 'react';
import api from '../../services/api';
import {toast} from 'react-toastify';
import {GeneralContext} from '../../contexts/General';


export default function CriarDespesa({close, cartao, periodo, refresh}){

  const {setLoading,checkError}= useContext(GeneralContext);

  const [descricaoDespesa, setDescricaoDespesa] = useState('');
  const [categoriaDespesa, setCategoriaDespesa] = useState('');
  const [valorDespesa, setValorDespesa] = useState(0);
  const [parcelas, setParcelas] = useState(1);
  const [complementoDespesa, setComplemento] = useState('');
  
  useEffect(()=>{
    document.addEventListener('keyup',handleEsc,false); //adiciona validação de click de teclado
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
    let valorTratado = e.target.value
    if(valorTratado.charAt(valorTratado.length-1) === '.'){
      valorTratado = valorTratado.substring(0,valorTratado.length-1) + ',';
    }
    setValorDespesa(valorTratado);
  }

  function handleParcelas(e){
    setParcelas(e.target.value);
  }

  function handleComplemento(e){
    setComplemento(e.target.value)
  }

  async function submitDetalhes(e){
    e.preventDefault();
    setLoading(true);
    try{

        let month = periodo.substring(0,2) - 1
        let year = periodo.substring(3,7)
        let date = new Date(year,month,1);
        month +=1;
        let periodoTratado = `${month}/${year}`

        for(let i = 0; i < parcelas; i++){
          console.log(periodoTratado)
          await api.post('/criar',{
            periodo: periodoTratado,
            cartao: cartao,
            classificacao: categoriaDespesa,
            valor: valorDespesa,
            descricao: descricaoDespesa,
            complemento: complementoDespesa
          });
          
          date.setMonth(date.getMonth() + 1)
          year = date.getFullYear()
          month = date.getMonth() + 1
      
          if (month < 10){
            month = `0${month}`;
          }
          periodoTratado = `${month}/${year}`
        }
      setLoading(false);
      toast.success('Registro criado com sucesso')
      await refresh();
      close();
    }catch(e){
      setLoading(false);
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

          <h2>Lançamento de Despesa</h2>
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
                <span>Parcelas:</span>
                <input type='number' value={parcelas} onChange={(e)=>handleParcelas(e)}></input>
            </div>

            <div className='detalhes--row'>
              <span>Complemento:</span>
            </div>

            <div className='detalhes--row'>
              <textarea type='text' value={complementoDespesa} onChange={(e)=>handleComplemento(e)}></textarea>
            </div>

            <div className='detalhes--row detalhes-buttons'>
              <button className='detalhes--submit' type='submit'>
                <FiCheck size={27} color='#fff'/>
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}