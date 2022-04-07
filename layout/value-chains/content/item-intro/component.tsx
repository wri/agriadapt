import classnames from "classnames";
import { intros } from "../constants";

const ItemIntro = ({ activeItem }) => {
  return (
    <div className="c-value-chain-item-intro">
      <h3>{intros[activeItem].header}</h3>
      <p>{intros[activeItem].description}</p>
      <button className={classnames({
        'c-button': true,
        '-primary': true,
      })}>
        {/* TODO: Translate */}
        {'Link Users to the Analysis Here'}
      </button>
    </div>
  );
};

export default ItemIntro;