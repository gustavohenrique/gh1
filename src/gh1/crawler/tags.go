package crawler

import (
    "bytes"
    "encoding/json"
    "io/ioutil"
    "net/http"
)

func GetTags(text string) (data []string, err error) {
    url := "http://api.cortical.io/rest/text/keywords?retina_name=en_associative"
    var jsonStr = []byte(text)
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
    req.Header.Set("api-key", "35d96430-968e-11e5-9e69-03c0722e0d16")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return make([]string, 0), err
    }
    defer resp.Body.Close()

    body, _ := ioutil.ReadAll(resp.Body)
    err = json.Unmarshal(body, &data)
    return data, err
}
