package logger

import (
    "github.com/stretchr/testify/assert"
    "testing"
)

func TestLogError(t *testing.T) {
    _, err := Log.Error("bad request", "ID is not informed")
    assert.Nil(t, err)
}
