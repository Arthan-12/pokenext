import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import InfoButton from '../info-button/info-button';
import styles from './info-dialog.module.css';

interface Props {
  info: 'pokedex' | 'myTeam';
}

const InfoDialog: React.FC<Props> = ({ info }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const checkedPokedexContent = [
    'Navbar routing with NextJS Link tag;',
    'Responsive Components (Media Queries + relative lengths);',
    'Responsive Background;',
    'Search Input with validators;',
    'HTTP requests to external API via Axios',
    'HTTP error interceptor services',
    'Placeholders for each search status',
    'Tooltip Helpers',
    'Fixed Info Button + Dialog',
    'Clickable card with conditional action',
    'Session storage usage to keep the selected items in a session list',
  ];

  const checkedMyTeamContent = [
    'Conditional message based on Pokedex Page actions',
    'List component to get from session storage the items that were previously set',
    'List item options for add it to drag and drop list or remove it from session storage list',
    'List item validation for selected item',
    'Drag and Drop list using React Beautiful DnD',
    'List item option for remove it from dnd list',
    'Clear all option for both lists',
  ];

  return (
    <>
      <InfoButton onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Table of Contents: {info.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.listContainer}>
            {info === 'pokedex' ? (
              <>
                {checkedPokedexContent.map((item, index) => (
                  <ul key={index}>
                    <input readOnly={true} type={'checkbox'} checked /> {item}
                  </ul>
                ))}
              </>
            ) : (
              <></>
            )}
            {info === 'myTeam' ? (
              <>
                {checkedMyTeamContent.map((item, index) => (
                  <ul key={index}>
                    <input readOnly={true} type={'checkbox'} checked /> {item}
                  </ul>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InfoDialog;
