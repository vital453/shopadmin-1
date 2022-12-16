import { useEffect } from 'react';
import { Tableau1 } from './../Tableau1';

export const Mod: React.SFC<{}> = () => {
    useEffect(()=>{
        const  id = window.location.pathname.split("/")[2]
        const idd = parseInt(id)
        console.log(id);
        console.log(Tableau1[idd]);
        // const ghy="baba"
        // console.log(ghy);
        
      },[])
    return (
        <>
        vnbjdcvj
        <p>
        {Tableau1[2].Cible}
        </p>
        </>
    )
};