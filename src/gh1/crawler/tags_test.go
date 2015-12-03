package crawler

import (
    "github.com/stretchr/testify/assert"
    "testing"
)

func TestGetTagsFromSimpleText(t *testing.T) {
    var text string = `Reader is the interface that wraps the basic Read method.
Read reads up to len(p) bytes into p. It returns the number of bytes read (0 <= n <= len(p)) and any error encountered. Even if Read returns n < len(p), it may use all of p as scratch space during the call. If some data is available but not len(p) bytes, Read conventionally returns what is available instead of waiting for more.
When Read encounters an error or end-of-file condition after successfully reading n > 0 bytes, it returns the number of bytes read. It may return the (non-nil) error from the same call or return the error (and n == 0) from a subsequent call. An instance of this general case is that a Reader returning a non-zero number of bytes at the end of the input stream may return either err == EOF or err == nil. The next Read should return 0, EOF.
Callers should always process the n > 0 bytes returned before considering the error err. Doing so correctly handles I/O errors that happen after reading some bytes and also both of the allowed EOF behaviors.
Implementations of Read are discouraged from returning a zero byte count with a nil error, except when len(p) == 0. Callers should treat a return of 0 and nil as indicating that nothing happened; in particular it does not indicate EOF.
Implementations must not retain p.`
    tags, err := GetTags(text)
    assert.Equal(t, "bytes", tags[0])
    assert.Equal(t, "error", tags[1])
    assert.Equal(t, "implementations", tags[2])
    assert.Nil(t, err)
}
