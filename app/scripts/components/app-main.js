import React, { Component } from 'react';

import SearchBox from './search';
import Card from './card';
import Navbar from './navbar';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieID: "157336__", // Interstellar
      isUserLoggedIn: false
    }
  }

  render() {
    return (
      <div>
        <Navbar isUserLoggedIn={this.state.isUserLoggedIn} />
        <SearchBox fetchMovieID={this.fetchMovieID.bind(this)}/>
        <Card data={this.state}/>
      </div>
    )
  }

  fetchApi(url) {

    fetch(url).then((res) => res.json()).then((data) => {
      this.setState({
        movieID: data.id,
        original_title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path

      })
    })

    // .catch((err) => console.log('Movie not found!'))

  }

  fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url)
  }

  componentDidMount() {
    let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url)

    let suggests = new Bloodhound({
      datumTokenizer: function(datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: 'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=cfe422613b250f702980a3bbf9e90716',
        filter: function(movies) {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(movies.results, function(movie) {
            return {
              value: movie.original_title, // search original title
              id: movie.id // get ID of movie simultaniously
            };
          });
        } // end filter
      } // end remote
    }); // end new Bloodhound

    suggests.initialize();

    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    }, {source: suggests.ttAdapter()}).on('typeahead:selected', function(obj, datum) {
      this.fetchMovieID(datum.id)
    }.bind(this));

  }
}

export default App;
