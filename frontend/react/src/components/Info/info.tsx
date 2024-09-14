import styles from './info.module.css';

const Info = () => {
  return (
    <div className={styles.info}>
      <h3>Navigation Shortcuts</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <span className={styles.keyEvent}>Tab</span>
            </td>
            <td className={styles.text}>Shift field on new level(max level is 4)</td>
          </tr>
          <tr>
            <td>
              <span className={styles.keyEvent}>Tab</span> +{' '}
              <span className={styles.keyEvent}>Shift</span>
            </td>
            <td className={styles.text}>Unshift field on new level</td>
          </tr>
          <tr>
            <td>
              <span className={styles.keyEvent}>Command</span> +{' '}
              <span className={styles.keyEvent}>Enter</span>
            </td>
            <td className={styles.text}>Check/Uncheck current field</td>
          </tr>
          <tr>
            <td>
              <span className={styles.keyEvent}>Enter</span>
            </td>
            <td className={styles.text}>Update field and create new field</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Info;
