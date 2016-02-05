const baseUrl = 'https://gh1.herokuapp.com/shortener'

export function getSites (options, callback) {
    const { pagination } = options
    let url = baseUrl + '?1=1'

    if (pagination.page > 0) {
        url += '&page=' + pagination.page
    }

    if (pagination.perPage > 0) {
        url += '&per_page=' + pagination.perPage
    }
    
    $.get(url, callback);
}

export function addSite (url, callback) {
    return $.ajax(baseUrl, {
        data: JSON.stringify({ longUrl: url }),
        type: 'POST',
        contentType: 'application/json'
    }).then(callback)
} 

export function addTag (params, callback) {
    const { site, tag } = params
    site.tags = [...site.tags, tag]
    updateSite(site).then(callback)
}

export function removeTag (params, callback) {
    const { site, tag, index } = params
    if (site.tags[index] === tag) {
        site.tags.splice(index, 1)
        updateSite(site).then(callback)
    }
}

function updateSite (site) {
    return $.ajax(baseUrl, {
        data: JSON.stringify(site),
        type: 'PUT',
        contentType: 'application/json'
    })
}