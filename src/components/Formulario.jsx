import React from 'react';
import styled from '@emotion/styled';
import useSelectModenas from '../hooks/useSelectModenas';
import {monedas} from '../data/monedas';
import { useEffect } from 'react';
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
//const API_KEY = 57dafe30a1d9636d6039bd27a00f73df4d3c1a9f5abf052b18c38df36dd5e154;
const Formulario = () => {

  useEffect(()=>{
    
  }, [])

  const [moneda, SelectMonedas] = useSelectModenas('Elige tu moneda', monedas);
  
  return (
    <form>
      <SelectMonedas/>

      <InputSubmit 
        type="submit" 
        value="Cotizar"
      />
    </form>
  )
}

export default Formulario