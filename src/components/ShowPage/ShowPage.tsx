import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import './showPage.css';

interface ShowPageProps extends RouteComponentProps {
  showId?: string;
}

const ShowPage = (props: ShowPageProps) => {
  return (
    <div className="test">
      { props.showId }
    </div>
  );
};

export default ShowPage;
