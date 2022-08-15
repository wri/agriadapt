import React, { useState } from 'react';
import PropTypes from 'prop-types';
import truncate from 'lodash/truncate';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';

function ReadMore(props) {
  const [visible, setVisible] = useState(false);
  const { text, limitChar, markdown, readMoreClicked } = props;

  if (text.length <= limitChar) {
    return (
      <div className="c-read-more">
        {markdown && <ReactMarkdown linkTarget="_blank" source={text} />}
        {!markdown && <p>{text}</p>}
      </div>
    );
  }

  const shortenedText = visible
    ? text
    : truncate(text, { length: limitChar, separator: '', omission: '...' });
  const classValue = classnames({
    'c-read-more': true,
    '-truncated': !visible,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation(['explore', 'common']);

  return (
    <div className={classValue}>
      {markdown && <ReactMarkdown linkTarget="_blank" source={shortenedText} />}
      {!markdown && <p>{shortenedText}</p>}
      <div className="overlay" />
      <button
        className="c-button -clean"
        onClick={() => {
          if (readMoreClicked && !visible) {
            readMoreClicked();
          }
          setVisible(!visible);
        }}
      >
        {visible ? t('explore:explore_detail.Read less') : t('explore:explore_detail.Read more')}
      </button>
    </div>
  );
}

ReadMore.propTypes = {
  text: PropTypes.string,
  limitChar: PropTypes.number,
  markdown: PropTypes.bool,
  readMoreClicked: PropTypes.func,
};

ReadMore.defaultProps = {
  text: '',
  limitChar: 1300,
  markdown: false,
  readMoreClicked: null,
};

export default ReadMore;
