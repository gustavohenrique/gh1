package crawler

import (
    "github.com/stretchr/testify/assert"
    "testing"
)

func TestGetInfoFromValidUrl(t *testing.T) {
    parser := Parser{}
    result, _ := parser.GetInfo("http://blog.gustavohenrique.net")
    assert.Equal(t, "GustavoHenrique.net", result["title"])
}

func TestGetInfoFromInvalidUrlShouldReturnError(t *testing.T) {
    parser := Parser{}
    result, err := parser.GetInfo("xxx")
    assert.NotNil(t, err)
    assert.Equal(t, "", result["title"])
}

func TestGetInfoFromNoPrefixUrl(t *testing.T) {
    parser := Parser{}
    result, _ := parser.GetInfo("blog.gustavohenrique.net")
    assert.Equal(t, "", result["title"])
}
