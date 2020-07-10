import React, {Fragment} from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}


const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <Fragment>
    <div className="container">
      <strong>{name}</strong>
      <p>Explore  <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
    </Fragment>
  );
};

export default ExploreContainer;
