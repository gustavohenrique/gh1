import axios from 'axios';
import { getEndpoints } from './util';

export class SiteApi {

    constructor (endpoints) {
        const window = window || null;
        this.endpoints = endpoints || getEndpoints(window);
    }

    create (site) {
        return axios.post(this.endpoints.SITES, { longUrl: site.longUrl, userId: site.userId });
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

        return axios.get(this.endpoints.SITES, { params: query });
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

    _update (site, user) {
        const url = this.endpoints.SITES + '/' + site.id;
        return axios.put(url, site, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        });
    }
}

export class UserApi {

    constructor (endpoints) {
        const window = window || null;
        this.endpoints = endpoints || getEndpoints(window);
    }

    authenticate (email, password) {
        const url = this.endpoints.USERS + '/authenticate';
        return axios.post(url, { email: email, password: password });
    }
}
