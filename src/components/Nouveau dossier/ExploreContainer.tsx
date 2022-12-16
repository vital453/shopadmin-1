import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  ); 
};
/* {window.location.href="/"}                       <NavLink to={'/frt'}>
          <IonButton color='success'> aller vers Ddd</IonButton>
        </NavLink> */                      

export default ExploreContainer;
