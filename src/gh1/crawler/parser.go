package crawler

import "gh1/Godeps/_workspace/src/github.com/PuerkitoBio/goquery"

type Parser struct{}

func (p *Parser) GetInfo(url string) (result map[string]string, err error) {
    doc, err := goquery.NewDocument(url)
    if err != nil {
        return result, err
    }

    result = make(map[string]string)
    doc.Find("head").Each(func(i int, s *goquery.Selection) {
        result["title"] = s.Find("title").Text()
    })
    // doc.Find("body").Each(func(i int, s *goquery.Selection) {
    //     result["body"] = s.Text()
    // })

    return result, err
}
