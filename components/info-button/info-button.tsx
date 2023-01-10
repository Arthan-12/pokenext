import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './info-button.module.css';

interface Props {
  onClick: () => void;
}

const InfoButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.infoButton} onClick={onClick}>
      Info
      <FontAwesomeIcon
        style={{ marginLeft: '4px' }}
        fontSize="18"
        icon={faCircleInfo}
      />
    </div>
  );
};

export default InfoButton;
