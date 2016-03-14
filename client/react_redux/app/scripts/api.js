import axios from 'axios';
import { getEndpoints } from './util';

export class SiteApi {

    create (site) {
        return axios.post(getEndpoints().SITES, { longUrl: site.longUrl, userId: site.userId });
    }

    find (options) {
        const { pagination } = options;

        var query = {};
        if (pagination.page > 0) {
            query.page = pagination.page;
        }

        if (pagination.perPage > 0) {
            query.perPage = pagination.perPage;
        }

        return axios.get(getEndpoints().SITES, { params: query });
    }

    addTag (params) {
        const { site, tag, user } = params;
        site.tags = [...site.tags, tag];
        return this._update(site, user);
    }

    removeTag (params) {
        const { site, tag, index, user } = params;
        if (site.tags[index] === tag) {
            site.tags.splice(index, 1);
            return this._update(site, user);
        }
    }

    updateSite (params) {
        const { site, user } = params;
        return this._update(site, user);
    }

    _update (site, user) {
        const url = getEndpoints().SITES + '/' + site.id;
        return axios.put(url, site, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        });
    }
}

export class UserApi {

    authenticate (email, password) {
        const url = getEndpoints().USERS + '/authenticate';
        return axios.post(url, { email: email, password: password });
    }
}
