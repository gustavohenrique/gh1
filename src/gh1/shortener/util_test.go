package shortener

import (
    "github.com/stretchr/testify/assert"
    "testing"
)

func TestGenerateCodeShouldReturnStringWithFiveLenght(t *testing.T) {
    code := GenerateCode()
    assert.NotNil(t, code)
}

func TestSliceToPGArrayShouldReturnStringInPostgresFormat(t *testing.T) {
    s := []string{"tag1", "tag2"}
    result := SliceToPGArray(s)
    assert.Equal(t, "{tag1,tag2}", result)
}

func TestSliceToPGArrayStringShouldReturnEmptyString(t *testing.T) {
    result := SliceToPGArray(nil)
    assert.Equal(t, "", result)
}
