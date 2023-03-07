import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Carousel, Card } from 'react-bootstrap';
import { Pokemon } from '../../models/pokemon-model';
import styles from './pokemon-carousel.module.css';

interface Props {
  pokemon?: Pokemon;
}

const PokemonCarousel = ({ pokemon }: Props) => {
  const [carouselIndex, setIndex] = useState(0);
  const [pokemonImageList, setPokemonImageList] = useState([]);

  useEffect(() => {
    buildCarousel();
  }, [JSON.stringify(pokemon)]);

  const buildCarousel = () => {
    let pokemonImageList: string[] = [];
    pokemonImageList = [
      ...pokemonImageList,
      pokemon.sprites.front_default,
      pokemon.sprites.back_default,
      pokemon.sprites.front_shiny,
      pokemon.sprites.back_shiny,
    ];
    setPokemonImageList(pokemonImageList);
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const imageSubtitle = (index) => {
    let subtitleText: string;
    if (index === 0) {
      return (subtitleText = `${pokemon.name} front view`);
    } else if (index === 1) {
      return (subtitleText = `${pokemon.name} back view`);
    } else if (index === 2) {
      return (subtitleText = `shiny ${pokemon.name} front view`);
    } else if (index === 3) {
      return (subtitleText = `shiny ${pokemon.name} back view`);
    }
  };

  return (
    <Carousel
      keyboard={true}
      activeIndex={carouselIndex}
      onSelect={handleSelect}
      interval={null}
      prevIcon={
        <span
          className={styles.carouselPrevChevron}
          style={{ color: '#3b4cca' }}
        >
          <FontAwesomeIcon fontSize="32" icon={faChevronLeft} />
        </span>
      }
      nextIcon={
        <span
          className={styles.carouselNextChevron}
          style={{ color: '#3b4cca' }}
        >
          <FontAwesomeIcon fontSize="32" icon={faChevronRight} />
        </span>
      }
      className={styles.carouselContainer}
    >
      {pokemonImageList.map((image, index) => (
        <Carousel.Item key={index}>
          <Card.Img
            className={styles.imageContainer}
            variant="top"
            src={pokemonImageList[index]}
          />
          <Carousel.Caption>
            <label style={{ color: '#3b4cca' }}>{imageSubtitle(index)}</label>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PokemonCarousel;
