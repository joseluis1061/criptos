// import React from 'react';
// import styled from '@emotion/styled';
// import useSelectModenas from '../hooks/useSelectModenas';
// import {monedas} from '../data/monedas';
// import { useEffect, useState } from 'react';
// const InputSubmit = styled.input`
//   background-color: #9497FF;
//   border: none;
//   width: 100%;
//   padding: 10px;
//   color: #FFFFFF;
//   font-weight: 700;
//   text-transform: uppercase;
//   font-size: 20px;
//   border-radius: 5px;
//   transition: background-color 0.3s ease;
//   margin-top: 30px;
//   &:hover{
//     background-color: #7A7DFE;
//     cursor: pointer;
//   }
// `
// const Formulario = ({setMonedas}) => {
//   const [criptoMonedas, setCriptoMonedas] = useState([]);
  
//   useEffect(()=>{
 
//     const API = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
    
//     const consultarApi = async ()=>{
//       const response = await fetch(API);
//       const result = await response.json();
//       const data = await result.Data;
      
//       const criptos = data.map((cripto)=>{

//         const objeto = {
//           id:cripto.CoinInfo.Name,
//           nombre: cripto.CoinInfo.FullName
//         }
//         return objeto;
//       });
//       setCriptoMonedas(criptos);
//     }
//     consultarApi();

//   }, [])


//   //Consultar precios
//   const handleSubmit = (e)=>{
//     e.preventDefault();
//     console.log('Handle Formulario');
    

//     if(moneda && criptoMoneda){
//       console.log(`moneda ${moneda} criptoMoneda ${criptoMoneda}`)
//       setMonedas({moneda, criptoMoneda});
//     }else{
//       console.log('Faltan datos')
//     }
//   }

//   const [moneda, SelectMonedas] = useSelectModenas('Elige tu moneda', monedas);
//   const [criptoMoneda, SelectCriptoMonedas] = useSelectModenas('Elige tu cripto moneda', criptoMonedas);
//   return (
//     <form onSubmit={handleSubmit}>
//       <SelectMonedas/>
//       <SelectCriptoMonedas/>
//       <InputSubmit 
//         type="submit" 
//         value="Cotizar"
//       />
//     </form>
//   )
// }

// export default Formulario











import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectModenas';
import { monedas } from '../data/monedas';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const API = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
    
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            const respuesta = await fetch(API)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map( cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })

            setCriptos(arrayCriptos)

        }
        consultarAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }
    
    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}

            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptomoneda />
                
                <InputSubmit 
                    type="submit" 
                    value="Cotizar" 
                />
            </form>
        </>
    )
}

export default Formulario