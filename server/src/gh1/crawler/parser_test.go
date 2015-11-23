package crawler

import (
    "github.com/stretchr/testify/assert"
    "testing"
)

func TestGetTitleFromValidUrl(t *testing.T) {
    parser := Parser{}
    title, _ := parser.GetTitle("http://blog.gustavohenrique.net")
    assert.Equal(t, "GustavoHenrique.net", title)
}

func TestGetTitleFromInvalidUrlShouldReturnError(t *testing.T) {
    parser := Parser{}
    title, err := parser.GetTitle("xxx")
    assert.NotNil(t, err)
    assert.Equal(t, "", title)
}

func TestGetTitleFromNoPrefixUrl(t *testing.T) {
    parser := Parser{}
    title, _ := parser.GetTitle("blog.gustavohenrique.net")
    assert.Equal(t, "", title)
}
