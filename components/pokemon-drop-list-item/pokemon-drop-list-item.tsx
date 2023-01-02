import { Pokemon } from '../../models/pokemon-model';
import Image from 'next/image';
import styles from './pokemon-drop-list-item.module.css';

interface Props {
  pokemon: Pokemon;
}

const PokemonDropListItem: React.FC<Props> = ({ pokemon = null }) => {
  return (
    <>
      <div className={styles.container}>
        <img
          width={90}
          height={90}
          src={pokemon?.sprites?.front_default}
          alt="pokemon-sprite"
        />
        <div className={styles.content}>
          <label>{pokemon?.name}</label>
        </div>
      </div>
    </>
  );
};

export default PokemonDropListItem;
