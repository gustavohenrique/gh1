package crawler

import "github.com/PuerkitoBio/goquery"

type Parser struct{}

func (p *Parser) GetTitle(url string) (title string, err error) {
    doc, err := goquery.NewDocument(url)
    if err != nil {
        return "", err
    }
    doc.Find("head").Each(func(i int, s *goquery.Selection) {
        title = s.Find("title").Text()
    })
    return title, err
}
