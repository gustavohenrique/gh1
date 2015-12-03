package shortener

import (
    "encoding/json"
    "gh1/Godeps/_workspace/src/github.com/gorilla/mux"
    "gh1/crawler"
    "gh1/validator"
    "net/http"
)

type Handler struct {
    Database Database
}

var shortener *Shortener

func (this Handler) getService() *Shortener {
    if shortener == nil {
        shortener = &Shortener{this.Database}
    }
    return shortener
}

func (this Handler) Home(w http.ResponseWriter, r *http.Request) {
    http.Redirect(w, r, GetEnv("FRONTEND_URL", "http://gustavohenrique.github.io/gh1"), 301)
}

func (this Handler) Find(w http.ResponseWriter, r *http.Request) {
    page := StrToInt(r.URL.Query().Get("page"), 1)
    limit := StrToInt(r.URL.Query().Get("per_page"), 10)

    service := this.getService()
    websites, err := service.FindAll(page, limit)
    if err != nil {
        msg, errorCode := GetHttpError(err)
        http.Error(w, msg, errorCode)
        return
    }
    pagination := Pagination{}
    pagination.Current = page
    pagination.Next = page + 1
    pagination.Previous = 1
    if page > 1 {
        pagination.Previous = page - 1
    }
    pagination.Content = websites
    json.NewEncoder(w).Encode(pagination)

}

func (this Handler) Add(w http.ResponseWriter, r *http.Request) {
    // w.Header().Set("Content-Type", "application/json; charset=UTF-8")
    // w.Header().Set("Access-Control-Allow-Origin", "*")

    website := Website{}
    decoder := json.NewDecoder(r.Body)
    err := decoder.Decode(&website)
    if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }
    validator := validator.Validator{}
    isValid := validator.IsUrl(website.LongUrl)
    if isValid == false {
        http.Error(w, "Invalid URL", 400)
        return
    }

    service := this.getService()
    site, err := service.FindByUrl(website.LongUrl)
    if err == nil {
        json.NewEncoder(w).Encode(site)
        return
    }

    parser := crawler.Parser{}
    p, err := parser.GetInfo(website.LongUrl)
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }

    tags, _ := crawler.GetTags(p["title"])
    website.Tags = tags[0:3]
    website.Title = p["title"]
    website.Code = GenerateCode()
    err = service.AddUrl(website)
    if err != nil {
        http.Error(w, err.Error(), 500)
        json.NewEncoder(w).Encode(err)
        return
    }
    w.WriteHeader(201)
    json.NewEncoder(w).Encode(website)
}

func (this Handler) Update(w http.ResponseWriter, r *http.Request) {
    website := Website{}
    decoder := json.NewDecoder(r.Body)
    err := decoder.Decode(&website)
    if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }

    service := this.getService()
    err = service.UpdateUrl(website)
    if err != nil {
        http.Error(w, err.Error(), 500)
        json.NewEncoder(w).Encode(err)
        return
    }
    w.WriteHeader(200)
    json.NewEncoder(w).Encode(website)
}

func (this Handler) Redirect(w http.ResponseWriter, r *http.Request) {
    service := this.getService()
    vars := mux.Vars(r)
    website, err := service.FindByCode(vars["code"])
    if err != nil {
        http.Redirect(w, r, "http://gustavohenrique.github.io/gh1/404/404.html", 301)
    } else {
        service.IncreaseHitsById(website.Id)
        http.Redirect(w, r, website.LongUrl, 301)
    }
}
