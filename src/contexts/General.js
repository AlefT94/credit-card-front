import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const GeneralContext = createContext();

function AuthProvider({children}){

  const [cartaoCtx, setCartaoCtx] = useState('PDA');
  const [periodo, setPeriodo] = useState('');
  const [cartoes, setCartoes] = useState([]);
  const [listDespesas, setListDespesas] = useState([ ]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  let buscarDados = async(cartao = '0')=>{
    let cartaoBusca;
    cartaoBusca = cartao === '0' ? cartaoCtx : cartao;
    
    try{
      let response = await api.post('/buscar-dados',{
        periodo: periodo,
        cartao: cartaoBusca
      });
      setListDespesas(response.data);
    }catch(e){
      checkError(e)
    }
  }

  async function checkError(e){
    let status = e.response.status
    if (status === 401){
      toast.error("Parece que sua sessão expirou. Favor faça o login novamente.")
      setToken(null);
      localStorage.removeItem('token');
    } 
    else{
      toast.error("Ops... Ocorreu um erro...")
    }
  }


  useEffect(()=>{
    let inicializa = async()=>{
      let date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 2
      if (month.length === 1){
        month = `0${month}`;
      }
      setPeriodo(`${month}/${year}`);
      const storageToken = localStorage.getItem('token');
      if (storageToken){
        setToken(storageToken);
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
      }

    }
    inicializa();
  },[])

  useEffect(()=>{
    let buscar = async()=>{
      if(periodo.length > 0 && token){
        setLoading(true);
        try{
          await buscarDados();
          setLoading(false);
        }catch(e){
          checkError(e);
          setLoading(false);
        }
      }  
    }
    buscar();
  },[periodo])
  
  return(
    <GeneralContext.Provider
    value= {{
      cartaoCtx,
      periodo,
      setCartaoCtx,
      setPeriodo,
      cartoes,
      setCartoes,
      listDespesas,
      setListDespesas,
      buscarDados,
      loading,
      setLoading,
      token,
      setToken,
      checkError
    }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

export default AuthProvider;