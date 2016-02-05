import { connect } from 'react-redux'

import { removeTag } from '../actions'

class TagLabel extends React.Component {

    render () {
        const { tag } = this.props
        return (
            <a title="Double click to remove" onDoubleClick={this.props.removeTag} className="tag label label-info">{tag}</a>
        )
    }
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        removeTag: function () {
            const params = {
                site: ownProps.site,
                siteIndex: ownProps.siteIndex,
                tag: ownProps.tag,
                index: ownProps.index
            }
            dispatch(removeTag(params))
        }
    }
}

export default connect(null, mapDispatchToProps)(TagLabel)