import React, { PropTypes } from 'react';
import SiteCard from './SiteCard.jsx';

export default class SiteList extends React.Component {
    render () {
        const { user, sites } = this.props;
        
        return (
            <div className="ui centered align cards full">
                {sites.map(function (item, index) {
                    return <SiteCard key={index} user={user} site={item} siteIndex={index} />;
                })}
            </div>
        );
    }
}

SiteList.propTypes = {
    user: PropTypes.object.isRequired,
    sites: PropTypes.array.isRequired
};