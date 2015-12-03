package shortener

import (
    "github.com/stretchr/testify/assert"
    "testing"
)

func TestFindByUrlShouldReturnWebsite(t *testing.T) {
    SetUp()
    shortener := Shortener{database}
    website, err := shortener.FindByUrl("http://gustavohenrique.com")
    assert.Nil(t, err)
    assert.Equal(t, "4hd74", website.Code)
    assert.Equal(t, int64(1), website.Id)
    assert.Equal(t, 2, len(website.Tags))
    assert.Equal(t, "golang", website.Tags[0])
    assert.Equal(t, "postgres", website.Tags[1])
}

func TestFindByUrlWhenNotExistsShouldReturnError(t *testing.T) {
    shortener := Shortener{database}
    _, err := shortener.FindByUrl("http://not-exists-this-domain.com")
    assert.NotNil(t, err)
}

func TestFindAllShouldReturnTheFirstTenWebsites(t *testing.T) {
    SetUp()
    shortener := Shortener{database}
    websites, err := shortener.FindAll(1, 10)
    assert.Nil(t, err)
    assert.Equal(t, 1, len(websites))
}

func TestAddUrlShouldReturnCode(t *testing.T) {
    shortener := Shortener{database}
    website := Website{}
    website.LongUrl = "http://google.com"
    website.Title = "Google"
    website.Code = "a8xo9"
    website.Tags = []string{"google"}
    err := shortener.AddUrl(website)
    assert.Nil(t, err)
}
