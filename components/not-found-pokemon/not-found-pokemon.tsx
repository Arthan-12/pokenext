import Image from 'next/image';

const NotFoundPokemon: React.FC = ({}) => {
  return (
    <>
      <div
        style={{
          borderRadius: '8px',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          padding: '8px',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: '0.9',
        }}
      >
        <Image
          width={124}
          height={144}
          src={'/img/not-found-psyduck.jpg'}
          alt="not-found-placeholder"
        />
        <span>Ops! Pokémon não encontrado :(</span>
      </div>
    </>
  );
};

export default NotFoundPokemon;
