import React from 'react';
import { useParams } from 'react-router-dom';

const TournamentDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Tournament Detail</h1>
      <p>Tournament ID: {id}</p>
    </div>
  );
};

export default TournamentDetailPage;

