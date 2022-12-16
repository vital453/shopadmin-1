import React, { useState, useRef } from 'react';
import {
    IonAccordion,
    IonAccordionGroup,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonPage,
    IonPopover,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { calendar } from 'ionicons/icons';
import { format, parseISO } from 'date-fns';
import { IonApp } from '@ionic/react';

export const DateTimeExamples: React.FC = () => {

    return (
        <IonApp>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>DateTime</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-start ion-padding-end" fullscreen>
                <IonAccordionGroup>
                    {/* <IonAccordion value="colors">
                        <IonItem slot="header">
                            <IonLabel>Colors</IonLabel>
                        </IonItem>

                        <IonList slot="content">
                            <IonItem>
                                <IonLabel>Red</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Green</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Blue</IonLabel>
                            </IonItem>
                        </IonList>
                    </IonAccordion> */}
                    <IonAccordion value="shapes">
                        <IonItem slot="header">
                            <IonLabel>Custom Locale</IonLabel>
                        </IonItem>

                        <IonList slot="content">
                            <IonItem>
                                <IonDatetime locale="en-GB" presentation="date"></IonDatetime>
                            </IonItem>
                            {/* <IonItem>
                                <IonLabel>Triangle</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Square</IonLabel>
                            </IonItem> */}
                        </IonList>
                    </IonAccordion>
                    <div className="grid">

                        <div className="grid-item">
                            <h2>Custom Locale</h2>
                            <IonDatetime locale="en-GB" presentation="date"></IonDatetime>
                        </div>

                        <div className="grid-item">
                            <h2>Time Only</h2>
                            <IonDatetime presentation="time"></IonDatetime>
                        </div>
                        {/* <div className="grid-item">
            <h2>Time First, Date Second</h2>
            <IonDatetime presentation="time-date"></IonDatetime>
          </div> */}
                    </div>
                    </IonAccordionGroup>
            </IonContent>
        </IonApp>
    )
}