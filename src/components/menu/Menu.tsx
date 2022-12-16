import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, homeSharp, medicalSharp, calendarNumberSharp, logOutSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, peopleSharp, personCircle, people, peopleCircle } from 'ionicons/icons';
import './Menu.css';
import { IonButton } from '@ionic/react';
import { useRef } from 'react';
import { IonInput } from '@ionic/react';
import { useState } from 'react';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Accueil',
    url: '/',
    iosIcon: mailOutline,
    mdIcon: homeSharp
  },
  // {
  //   title: 'Medecin',
  //   url: '/listemed',
  //   iosIcon: paperPlaneOutline,
  //   mdIcon: medicalSharp
  // },
  // {
  //   title: 'Secretaire',
  //   url: '/listesec',
  //   iosIcon: paperPlaneOutline,
  //   mdIcon: peopleCircle
  // },
  {
    title: 'Patients',
    url: '/listepat',
    iosIcon: paperPlaneOutline,
    mdIcon: peopleSharp
  },
  // {
  //   title: 'Mes rendez-vous',
  //   url: '/rdv',
  //   iosIcon: heartOutline,
  //   mdIcon: calendarNumberSharp
  // },
  {
    title: 'Diagnostics',
    url: '/diagnostic',
    iosIcon: heartOutline,
    mdIcon: calendarNumberSharp
  },
  // {
  //   title: 'Archived',
  //   url: '/page/Archived',
  //   iosIcon: archiveOutline,
  //   mdIcon: archiveSharp
  // },
  // {
  //   title: 'Trash',
  //   url: '/page/Trash',
  //   iosIcon: trashOutline,
  //   mdIcon: trashSharp
  // },
  // {
  //   title: 'Archives',
  //   url: '/page/Spam',
  //   iosIcon: warningOutline,
  //   mdIcon: warningSharp
  // },
  // {
  //   title: 'Deconnexion',
  //   url: '/',
  //   iosIcon: warningOutline,
  //   mdIcon: logOutSharp
  // }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  let selectedfiles = useRef<HTMLInputElement>(null);
  let height = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any[]>([]);
  const lire = async () => {
    if (selectedfiles.current!.files?.length === 0) {
      alert('veillez choisir une image ')
    }else{
       console.log(selectedfiles.current!.files);
       console.log(selectedfiles.current!.files![0]);
       
       const formData = new FormData()
       formData.append('picture',selectedfiles.current!.files![0])
      var xhr = new XMLHttpRequest()
      xhr.open('POST','http://localhost:3000/home')
    }

  }
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <div className="ion-text-center">
            <label htmlFor="file" >
              <IonIcon style={{ fontSize: '150px' }} icon={personCircle} color="medium" />
            </label>
            <input type="file" id="file" ref={selectedfiles}
              style={{ display: "none" }}
            />
            <IonButton onClick={() => { lire() }}>
              click
            </IonButton>
            {/* <IonButton
              style={{ '--border-radius': '100%', width: '100px', height: '100px' }}
              color="medium"
            >
              <IonIcon style={{ fontSize: '52px' }} icon={personCircle} />
            </IonButton> */}
            <h1 className="ion-text-center">Dr *********</h1>
            {/* <IonNote>mailmedecin@gmail.com</IonNote> */}
          </div>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} onClick={() => { window.location.href = `${appPage.url}` }} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
