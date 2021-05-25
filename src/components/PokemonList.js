import React, {useState, useEffect} from 'react';
import PokemonDataService from '../services/pokemon';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PokemonList = props => {
    
    const [limit, setLimit] = useState(3);
    const [offset, setOffset] = useState(0);
    const [pokemons, setPokemons] = useState([]);
    const [pokemonImg, setPokemonImg] = useState([]);

    useEffect(() => {
        retrievePokemons(limit, offset);
        // console.log(pokemonImg);
    }, []); 

    const retrievePokemons = (limit, offset) => {
        console.log("offset here:");
        console.log(offset);
        console.log("limit here:");
        console.log(limit);
        PokemonDataService.getAll(limit, offset)
        .then(response => {
            // console.log(response);
            if(response.status==200){
                const allPokemons = response.data.results;
                // console.log(response.data);
                // console.log("allPokemons", allPokemons.map(pokemon =>(pokemon.url)));
                const pokemonImage = allPokemons.map(pokemon => fetch(pokemon.url));
                // console.log(pokemonImage);
                return Promise.all(pokemonImage);
            }
        })
        .then(allResults => {
            const finalData = allResults.map(result => Promise.resolve(result.json()));
            // console.log(finalData);
            const mapPromisesToValues = finalData => {
                return Promise.all(finalData);
              }
              
              mapPromisesToValues(finalData).then(values => setPokemons(values));
        })
        .catch(e => {
            console.log(e);
        });
    }

    const nextpage = () => {
        console.log("called nextpage");
        console.log(offset);
        setOffset(offset+3);
        retrievePokemons(limit, offset+3);
    }

    const prevpage = () => {
        console.log("called prevpage");
        setOffset(offset-3);
        retrievePokemons(limit, offset-3);
    }

    // const retrieveImage = async (pokemonURL) => {
    //    await fetch(pokemonURL)
    //     .then(response => response.json())
    //     .then(data => {
    //         // console.log(data.sprites.front_default);
    //         setPokemonImg(data.sprites.front_default);
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     });
    // }

    return(
    <div className="row">
         {pokemons.map((pokemon) => {
             console.log(pokemon);
             const imgSrc = pokemon.sprites.front_default;
             return(
                <div key={pokemon.name} className="col-md-4">
                    <div style={{marginTop:"20px"}}>
                        <div className="card" style={{width: "18rem"}}>
                        <img className="card-img-top" src={imgSrc} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 style={{textTransform: 'capitalize', textAlign: "center"}} className="card-title">{pokemon.name}</h5>
                                <p className="card-text">{pokemon.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
             );
        })}
        <button style={{marginTop:"20px", width: "100px"}} className="btn btn-info" onClick={nextpage}>Next</button>
        <button style={{marginTop:"20px", marginLeft:"10px", width: "100px"}} className="btn btn-primary" onClick={prevpage}>Previous</button>
    </div>
    );
};

export default PokemonList;