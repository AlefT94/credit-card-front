import './mainPage.css';
import Header from '../../components/Header';
import Detalhamento from '../../components/Detalhamento'
import Totalizador from '../../components/Totalizador';
import Loader from '../../components/Loader';
import { GeneralContext } from '../../contexts/General';
import { useContext } from 'react';

export default function MainPage(){

  const {loading, token}= useContext(GeneralContext)

  return(
      <div className='main--page'>
        <Header/>
        {token && <Totalizador/>}
        {token && <Detalhamento/>}
        {loading && <Loader/>}
      </div>
  )
}