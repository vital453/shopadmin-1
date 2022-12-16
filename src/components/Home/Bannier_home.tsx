import React, { useEffect } from 'react';
import '../Home/banier.css';
const Bannier_home = () => {
    useEffect(() => {     
        let slider = document.getElementsByClassName('nav12ab');
        console.log(slider);
        let etape = 0;
        let nbr_section = slider.length
        
        const enleveractivesection = () => {
            for (let i = 0; i < nbr_section; i++) {
                slider[i].classList.remove('active');
            }
        }
        setInterval(() => {
            etape++;
            if (etape >= nbr_section) {
                etape = 0;
            }
            enleveractivesection();
            slider[etape].classList.add('active')
        }, 5000)
    }, []);
    if (window.innerWidth < 1025) {
        return (
            <>
                 <div className='navihome'>
                    <div className="nav12ab active">
                        {/* <img src="img/Banner_7.png" className='imp13a' /> */}
                        <img src="img/1bb.jpg" className='imp13a' />
                    </div>
                    <div className="nav12ab">
                        {/* <img src="img/Bannier_6.png" className='imp13a' /> */}
                        <img src="img/1aa.jpg" className='imp13a' />
                    </div>
                    <div className="nav12ab">
                        {/* <img src="img/Bannier.png" className='imp13a' /> */}
                        <img src="img/1cc.png" className='imp13a' />
                    </div>
                    
                </div>
            </>
        );
    } else {
        return (
            <>
               bob
            </>
        );
    }
};

export default Bannier_home;