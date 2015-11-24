package shortener

import (
    "github.com/stretchr/testify/assert"
    "os"
    "testing"
)

func TestMain(m *testing.M) {
    PrepareDatabase()
    // flag.Parse()
    os.Exit(m.Run())
}

func TestFindByUrlShouldReturnCodeAndId(t *testing.T) {
    result, err := database.FindByUrl("http://gustavohenrique.com")
    assert.Nil(t, err)
    assert.Equal(t, "4hd74", result["Code"].(string))
    assert.Equal(t, int64(1), result["Id"].(int64))
}

func TestFindByUrlShouldReturnErrorWhenUrlNotExists(t *testing.T) {
    _, err := database.FindByUrl("no-exists")
    assert.NotNil(t, err)
}

func TestAddUrlShouldInsertWhenUrlNotExists(t *testing.T) {
    SetUp()
    url, title, code := "http://gustavohenrique.net", "GustavoHenrique.net", "5sh4"
    err := database.AddUrl(url, title, code)
    assert.Nil(t, err)
}

func TestFindByCodeShouldReturnLongUrlAndId(t *testing.T) {
    result, err := database.FindByCode("4hd74")
    assert.Nil(t, err)
    assert.Equal(t, "http://gustavohenrique.com", result["LongUrl"].(string))
    assert.Equal(t, int64(1), result["Id"].(int64))
}

func TestIncreaseHitsById(t *testing.T) {
    SetUp()
    id := int64(1)
    err := database.IncreaseHitsById(id)
    assert.Nil(t, err)

    var hits int
    GetDb().QueryRow("select hits from websites where id = $1", id).Scan(&hits)
    assert.Equal(t, 1, hits)
}
