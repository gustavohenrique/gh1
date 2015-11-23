package shortener

import (
    "github.com/stretchr/testify/assert"
    "testing"
)

func TestGenerateCodeShouldReturnStringWithFiveLenght(t *testing.T) {
    code := GenerateCode()
    assert.NotNil(t, code)
}
