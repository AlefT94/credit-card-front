import './totalizador.css';
import CriarDespesa from '../CriarDespesa';
import {FaAngleLeft, FaAngleRight, FaPlusCircle} from 'react-icons/fa'
import {useState,useEffect, useContext} from 'react'
import {GeneralContext} from '../../contexts/General'

export default function Totalizador(){

  const {cartaoCtx,periodo,setPeriodo, listDespesas,buscarDados} = useContext(GeneralContext);

  const [criaDespesa, setCriaDespesa] = useState(false);
  const [totalCartoes, setTotalCartoes] = useState(0);

  useEffect(()=>{
    let total = 0;
    listDespesas.forEach(despesa=>{
      total += despesa.valor
    });
    setTotalCartoes(total);
  },[listDespesas])

  let changePeriodo = (type)=>{
    let soma = 1;
    if(type === 'd'){
      soma = -1
    }
    
    let month = periodo.substring(0,2) - 1
    let year = periodo.substring(3,7)
    let date = new Date(year,month,1);

    date.setMonth(date.getMonth() + soma)
    year = date.getFullYear()
    month = date.getMonth() + 1

    if (month < 10){
      month = `0${month}`;
    }

    setPeriodo(`${month}/${year}`)
    
  }

  let toogleDespesa = ()=>{
    setCriaDespesa(!criaDespesa);
  }

  return(
      <div className='totalizador--content'>
        <div className='totalizador--left'>
          <h3>Total</h3>
          <h2>R$ {totalCartoes.toLocaleString('pt-BR',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
        </div>
        <div className='totalizador--rigth'>

          <div className='totalizador--periodo'>
            <button className='totalizador--bt1' onClick={()=>changePeriodo('d')}>
              <FaAngleLeft size={20}/>
            </button>
            
            <span>{periodo}</span>
            <button className='totalizador--bt2' onClick={()=>changePeriodo('i')}>
              <FaAngleRight size={20}/>
            </button>
          </div>

          <div className='totalizador-add'>
            <button onClick={toogleDespesa}>
              <FaPlusCircle size={30} color={'#021233'}/>
            </button>
          </div>
        </div>
        {criaDespesa && <CriarDespesa close={toogleDespesa} cartao={cartaoCtx} periodo={periodo} refresh={buscarDados}/>}
      </div>
  )
}