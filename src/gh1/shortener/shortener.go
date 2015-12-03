package shortener

import "time"

type Shortener struct {
    database Database
}

func (this Shortener) FindByUrl(url string) (website Website, err error) {
    result, err := this.database.FindByUrl(url)
    website = Website{}
    if err == nil && len(result) > 0 {
        website = mapToWebsite(result)
    }
    return website, err
}

func (this Shortener) FindByCode(code string) (website Website, err error) {
    result, err := this.database.FindByCode(code)
    website = Website{}
    if err == nil {
        website = mapToWebsite(result)
    }
    return website, err
}

func (this Shortener) IncreaseHitsById(id int64) error {
    return this.database.IncreaseHitsById(id)
}

func (this Shortener) AddUrl(website Website) error {
    tags := SliceToPGArray(website.Tags)
    return this.database.AddUrl(website.LongUrl, website.Title, website.Code, tags)
}

func (this Shortener) UpdateUrl(website Website) error {
    tags := SliceToPGArray(website.Tags)
    return this.database.UpdateUrl(website.Title, website.Code, tags)
}

func (this Shortener) FindAll(page int, limit int) (websites []Website, err error) {
    offset := (page - 1) * limit
    if offset < 0 {
        offset = 0
    }
    results, err := this.database.FindAll(offset, limit)
    if err == nil {
        for _, element := range results {
            websites = append(websites, mapToWebsite(element))
        }
    }
    return websites, err
}

func mapToWebsite(result map[string]interface{}) Website {
    website := Website{}
    website.Id = result["Id"].(int64)
    website.LongUrl = result["LongUrl"].(string)
    website.Code = result["Code"].(string)
    website.Title = result["Title"].(string)
    website.CreatedAt = result["CreatedAt"].(time.Time)
    website.LastAccess = result["LastAccess"].(time.Time)
    website.Hits = result["Hits"].(int)
    website.IsVisible = result["IsVisible"].(bool)
    website.Tags = PGArrayToSlice(result["Tags"].(string))
    return website
}
