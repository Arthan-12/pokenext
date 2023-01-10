import Image from 'next/image';
import styles from './pokemon-loader.module.css';

const PokeballLoader: React.FC = ({}) => {
  return (
    <>
      <Image
        width={144}
        height={144}
        src={'/svg/pokeball.svg'}
        alt="pokeball"
        className={styles.container}
      />
      <label>Searching for Pokémon...</label>
    </>
  );
};

export default PokeballLoader;
