import 'isomorphic-fetch';
import { BASE_API_URL } from '../constants';

export function getSites (options, callback) {
    const { pagination } = options;
    let url = BASE_API_URL + '?1=1';

    if (pagination.page > 0) {
        url += '&page=' + pagination.page;
    }

    if (pagination.perPage > 0) {
        url += '&per_page=' + pagination.perPage;
    }
    
    return fetch(url, { method: 'get' }).then(toJson).then(callback);
}

export function addSite (url, callback) {
    return fetch(BASE_API_URL, {
        method: 'post',
        body: JSON.stringify({ longUrl: url })
    }).then(toJson).then(callback);
} 

export function addTag (params, callback) {
    const { site, tag } = params;
    site.tags = [...site.tags, tag];
    updateSite(site).then(callback);
}

export function removeTag (params, callback) {
    const { site, tag, index } = params;
    if (site.tags[index] === tag) {
        site.tags.splice(index, 1);
        updateSite(site).then(callback);
    }
}

function updateSite (site) {
    return fetch(BASE_API_URL, {
        method: 'put',
        body: JSON.stringify(site)
    }).then(toJson);
}

function toJson (response) {
    return response.json();
}