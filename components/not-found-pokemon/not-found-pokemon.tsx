import Image from 'next/image';

const NotFoundPokemon: React.FC = ({}) => {
  return (
    <>
      <Image
        width={124}
        height={144}
        src={'/img/not-found-psyduck.jpg'}
        alt="not-found-placeholder"
      />
      <span>Ops! Pokémon não encontrado :(</span>
    </>
  );
};

export default NotFoundPokemon;
