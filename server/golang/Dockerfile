FROM alpine

RUN apk add --update curl bash gcc go musl-dev git openssh-client ca-certificates \
 && rm -rf /var/cache/apk/*

ENV GOPATH /.go
ENV PATH $PATH:$GOPATH/bin

RUN go get github.com/tools/godep

WORKDIR /usr/lib/go/src/gh1

ADD docker.sh /bin/run

CMD /bin/run
