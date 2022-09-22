import './header.css';
import {FaBars} from 'react-icons/fa'
import {useState, useContext} from 'react';
import { GeneralContext } from '../../contexts/General';
import api from '../../services/api';

export default function Header(){
  const {setCartaoCtx, buscarDados, cartaoCtx, setLoading,token, checkError,setToken} = useContext(GeneralContext)
  const [showMenu, setShowMenu] = useState(false);
  const [password, setPassword] = useState('');

  let alteraCartao = async (cartao)=>{
    setLoading(true);
    await buscarDados(cartao);
    setLoading(false);
    setCartaoCtx(cartao);
    setShowMenu(!showMenu);
  }

  async function login(){
    try{
      setLoading(true);
      let response = await api.post('/login',{senha: password});
      localStorage.setItem('token',response.data.token);
      setToken(response.data.token);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      await buscarDados();
      setLoading(false);

    }catch(e){
      checkError(e);
    }
  }

  return(
      <header>
        <div className='header--title'>
          <button className={showMenu? 'header--spinMenu' : ''} onClick={()=>setShowMenu(!showMenu)}>
            <FaBars color='#FFF' size={30}/>
          </button>
          <h2>{cartaoCtx}</h2>
        </div>
        <div className={`header-moreInfos ${!showMenu? 'header-notShowMenu' : ''}`}>
          <ul>
            <li><button onClick={()=>alteraCartao('PDA')}>Cartão PDA</button></li>
            <li><button onClick={()=>alteraCartao('Banco do Brasil')}>Banco do Brasil</button></li>
            <li><button onClick={()=>alteraCartao('Nubank Alef')}>Nubank Alef</button></li>
            <li><button onClick={()=>alteraCartao('Nubank Lisia')}>Nubank Lisia</button></li>
            <li><button onClick={()=>alteraCartao('Digio Alef')}>Digio Alef</button></li>
            <li><button onClick={()=>alteraCartao('Digio Lisia')}>Digio Lisia</button></li>
          </ul>
        </div>
        {!token && <div className='header--login'>
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
          <button onClick={login}>Enviar</button>
        </div>}
      </header>
  )
}