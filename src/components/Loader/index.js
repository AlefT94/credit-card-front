import './loader.css';
import {FaSpinner} from 'react-icons/fa'

export default function Loader(){
  return(
    <div className="loader">
      <div className='loader--content'>
        <FaSpinner size={60} color={'#FFF'}/>
      </div>
      <p>Carregando...</p>
    </div>
  )
}