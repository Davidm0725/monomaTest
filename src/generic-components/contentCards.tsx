import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { getInfoPokemons, getPokemons } from '../helpers/helperAxios';
import Swal from 'sweetalert2'

const Content = () => {
    const [pokemon, setPokemon] = useState<any[]>([]);
    const [pokenSelect, setPokenSelected] = useState({});
    const [limit, setlimit] = useState(10);


    const getData = () => {
        getPokemons()
            .then((response) => {
                for (let i = 0; i < response.data.results.length; i++) {
                    getInfoPokemons(response.data.results[i].url)
                        .then(result => {
                            setPokemon(prevArray => [...prevArray, result.data])
                        })
                }
            });
    }
    useEffect(() => getData(), []);

    const handleModal = (pkn: any) => {
        setPokenSelected(pkn)
        Swal.fire({
            title: pkn.name,
            html:
                '<b>Habilities</b> ' +
                `<p>${pkn.abilities[0].ability.name}</p>` +
                '<b>Weight</b> ' +
                `<p>${pkn.weight}</p>`,
            imageUrl: pkn.sprites.front_default,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    }


    return (
        <div>
            <Container maxWidth="lg" className="containerCards">
                <Typography component="h1" variant="h5" className='titlegrid'>
                    POKEMONES
                </Typography>

                <Grid container spacing={2}>
                    {
                        pokemon.map((pkn, index) => (
                            <Grid key={index} item xs={12} sm={4}>
                                <Card className='card'>
                                    <CardActionArea onClick={() => handleModal(pkn)}>
                                        <CardContent className="imgCard">
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                image={pkn.sprites.front_default} >

                                            </CardMedia>
                                            <div className='contTitleWeight'>
                                                <Typography align='right' className='titleWeight'>
                                                    weight: {pkn.weight}
                                                </Typography>
                                            </div>

                                        </CardContent>
                                        <Typography gutterBottom variant="h5" component="div" className='titlePkn'>
                                            {pkn.name}
                                        </Typography>

                                        <div className='contMovements'>
                                            <Typography align='left' className='mvTitle'>
                                                Movements:
                                            </Typography>
                                            <Typography align='left'>
                                                {pkn.moves[0].move.name}
                                            </Typography>
                                            <Typography align='left'>
                                                {pkn.moves[1].move.name}
                                            </Typography>
                                        </div>

                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>

        </div>
    );
}
export default Content