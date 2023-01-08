import { Pokemon } from '../../models/pokemon-model';
import Image from 'next/image';
import styles from './pokemon-drop-list-item.module.css';
import PokemonTypeBadge from '../pokemon-type-badge/pokemon-type-badge';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  pokemon: Pokemon;
  removePokemon: () => void;
}

const PokemonDropListItem: React.FC<Props> = ({
  pokemon = null,
  removePokemon,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.firstBox}>
          <img
            width={90}
            height={90}
            src={pokemon?.sprites?.front_default}
            alt="pokemon-sprite"
            className={styles.pokemonSprite}
          />
          <label className={styles.label}>
            {pokemon?.name} - {pokemon?.order}
          </label>
          <div className={styles.closeIconBox}>
            <FontAwesomeIcon
              titleId="close-icon1"
              fontSize="18"
              color="#dc3545"
              cursor="pointer"
              className={styles.closeIcon}
              onClick={removePokemon}
              icon={faRectangleXmark}
            />
          </div>
        </div>
        <div className={styles.secondBox}>
          <div className={styles.content}>
            <div className={styles.typeContainer}>
              {pokemon!.types?.map((pokemonType, index) => (
                <PokemonTypeBadge
                  key={index}
                  pokemonType={pokemonType.type.name}
                ></PokemonTypeBadge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDropListItem;
