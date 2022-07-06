import React from 'react';
import logo from './logo.svg';
import './App.css';
import Row from "./Components/Row";
import requests from "./request";
import Banner from './Components/Banner';

function App() {
  return (
    <div className="App">
        <Banner />
        <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
        <Row title="TRENDING NOW"  fetchUrl={requests.fetchTrending} />
        <Row title="TOP RATED"  fetchUrl={requests.fetchTopRated} />
        <Row title="ACTION MOVIES"  fetchUrl={requests.fetchActionMovies} />
        <Row title="COMEDY MOVIES"  fetchUrl={requests.fetchComedyMovies} />
        <Row title="HORROR MOVIES"  fetchUrl={requests.fetchHorrorMovies} />
        <Row title="ROMANTIC MOVIES"  fetchUrl={requests.fetchRomanticMovies} />
        <Row title="DOCUMENTRIES"  fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
