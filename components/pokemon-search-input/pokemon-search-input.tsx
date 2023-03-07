import { useState } from 'react';

import styles from './pokemon-search-input.module.css';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
  input?: string;
  required?: boolean;
  getTypedValue: (value?: any) => void;
  clearByKey?: (key: 'backspace' | 'delete') => void;
  clearSelectedPokemon: (clear?: boolean) => void;
}

const PokemonSearchInput: React.FC<Props> = ({
  input = null,
  required = false,
  getTypedValue,
  clearByKey,
  clearSelectedPokemon,
}) => {
  const [inputValue, setValue] = useState('');
  const [disableClear, setDisableClear] = useState(true);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // console.log(data);
  };

  const clear = () => {
    if (!disableClear) {
      resetField('searchInput');
      setDisableClear(true);
      clearSelectedPokemon(true);
    }
  };

  const handleKeyUp = (event: any) => {
    let typedValue = event.target.value;
    if (event.key === 'Backspace' || event.key === 'Delete') {
      typedValue = typedValue.substring(typedValue.lenght - 1);
    }
    if (typedValue.length > 0) {
      setDisableClear(false);
    } else {
      setDisableClear(true);
    }
    setValue(typedValue);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <Form.Group className="mb-3" style={{ width: '100%' }}>
            <Form.Label className={styles.inputLabel}>
              Search for a Pokémon!
            </Form.Label>
            <Form.Control
              onKeyUp={handleKeyUp}
              height={95}
              isInvalid={errors.searchInput ? true : false}
              type="text"
              placeholder="Type a pokemon name or id"
              {...register('searchInput', { required: required })}
            />
            {/* <Form.Control.Feedback type="invalid">
              field is required
            </Form.Control.Feedback> */}
          </Form.Group>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-top`}>Clear Search</Tooltip>}
          >
            <FontAwesomeIcon
              titleId="close-icon1"
              fontSize="38"
              color="#dc3545"
              cursor="pointer"
              className={
                !disableClear
                  ? styles.closeIcon
                  : `${styles.closeIcon} ${styles.disabled}`
              }
              onClick={clear}
              icon={faRectangleXmark}
            />
          </OverlayTrigger>
        </div>
      </Form>
    </div>
  );
};

export default PokemonSearchInput;
