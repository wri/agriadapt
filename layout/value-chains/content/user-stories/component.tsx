import classnames from "classnames";

const UserStories = ({user_stories = []}) => {
    return (
      <div className="c-user-stories">
        {!!user_stories.length && (
            // TODO: Translate
          <h2>{'Applicable Header e.g. "Hear From..."'}</h2>
        )}
        {user_stories.map((s, i) => (
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
    );
}

export default UserStories;