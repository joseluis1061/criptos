import React from 'react';
import styled from '@emotion/styled';
import useSelectModenas from '../hooks/useSelectModenas';
import {monedas} from '../data/monedas';
import { useEffect, useState } from 'react';
const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFFFFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover{
    background-color: #7A7DFE;
    cursor: pointer;
  }
`
const Formulario = () => {
  const [criptoMonedas, setCriptoMonedas] = useState([]);
  
  useEffect(()=>{
    const API = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    
    const consultarApi = async ()=>{
      const response = await fetch(API);
      const result = await response.json();
      const data = await result.Data;
      
      const criptos = data.map((cripto)=>{

        const objeto = {
          id:cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto;
      });
      setCriptoMonedas(criptos);
    }
    consultarApi();

  }, [])

  const [moneda, SelectMonedas] = useSelectModenas('Elige tu moneda', monedas);
  const [criptoMoneda, SelectCriptoMonedas] = useSelectModenas('Elige tu cripto moneda', criptoMonedas);
  return (
    <form>
      <SelectMonedas/>
      <SelectCriptoMonedas/>
      <InputSubmit 
        type="submit" 
        value="Cotizar"
      />
    </form>
  )
}

export default Formulario