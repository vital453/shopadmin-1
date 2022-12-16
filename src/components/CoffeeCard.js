import { IonCard, IonCardSubtitle, IonCardTitle, IonCol, IonLabel } from "@ionic/react";
import { ArrowRightSquare } from "react-iconly";


import './coff.css';


const CoffeeCard = props => {

    const { coffee } = props;

    return (

        <IonCol size="6" className="animate__animated animate__fadeIn">
            <IonCard className= 'coffeeCard'  routerLink={ `/coffee/${ coffee.id }` }>
                <img src={ coffee.image } alt="coffee" />
                <IonCardTitle>{ coffee.nom }</IonCardTitle>
                <IonCardSubtitle>{ coffee.prenom }</IonCardSubtitle>
                <div className= 'coffeePrice' >
                    <h4>${ coffee.price }</h4>
                    <div className= 'coffeeAddButton' >
                        <ArrowRightSquare set="bold" className="yellow-icon" />
                    </div>
                </div>
            </IonCard>
            <div className="az">gbdf</div>
        </IonCol>
        
    );
}

export default CoffeeCard;