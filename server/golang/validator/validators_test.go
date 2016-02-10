package validator

import (
    . "github.com/smartystreets/goconvey/convey"
    "testing"
)

func TestValidatorUrl(t *testing.T) {

    validator := Validator{}

    Convey("When an URL contains http", t, func() {
        isValid := validator.IsUrl("http://xyz.com")

        Convey("Should be valid", func() {
            So(isValid, ShouldEqual, true)
        })
    })

    Convey("When an URL doesn't contains http", t, func() {
        isValid := validator.IsUrl("xyz")

        Convey("Should be invalid", func() {
            So(isValid, ShouldEqual, false)
        })
    })

    Convey("When an URL contains blank space", t, func() {
        isValid := validator.IsUrl("http://xyz .com")

        Convey("Should be invalid", func() {
            So(isValid, ShouldEqual, false)
        })
    })

    Convey("When an URL contains @", t, func() {
        isValid := validator.IsUrl("https://medium.com/@alessioalionco/startups-brasileiras-go-global-3471cf5cd396#.89s53fb7m")

        Convey("Should be valid", func() {
            So(isValid, ShouldEqual, true)
        })
    })

    Convey("When an URL contains invalid character", t, func() {
        isValid := validator.IsUrl("http://^")

        Convey("Should be invalid", func() {
            So(isValid, ShouldEqual, false)
        })
    })

    // tearDown
    //Reset(func() {
    // })

}
