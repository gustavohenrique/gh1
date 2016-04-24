import React, { PropTypes } from 'react';

export default class Message extends React.Component {

    render () {
        const { header, message, type } = this.props;
        const Header = header ? (<div className="header">{header}</div>) : null;
        const Message = message ? (<span>{message}</span>) : null;

        return (
            <div className={'ui message ' + type}>
                {Header}
                {Message}
            </div>
        );
    }
}

Message.propTypes = {
    header: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string
};
