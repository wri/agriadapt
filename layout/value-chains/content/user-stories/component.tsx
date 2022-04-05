import classnames from 'classnames';
import { user_stories } from '../constants';

const UserStories = () => {
  const { header, stories } = user_stories;
  return (
    <div className="c-user-stories">
      {!!stories.length && (
        // TODO: Translate
        <h2>{header}</h2>
      )}
      <div className="c-user-stories-body">
        {stories.map((s, i) => (
          <div key={i} className="c-user-story">
            <div className="user-picture">{/* img */}</div>
            <div className="c-user-info">
              <h3>{`${s.person}, ${s.location}`}</h3>
              <p>{`"${s.quote}"`}</p>
              <button
                className={classnames({
                  'c-button': true,
                  '-primary': true,
                })}
              >
                {/* TODO: Translate */}
                {'Find Out More in Our Map'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStories;
