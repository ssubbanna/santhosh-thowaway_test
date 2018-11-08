FROM golang:alpine

# make an application directory to hold the runtime
RUN mkdir /app /app/bin

ADD common /app/common
ADD backend /app/backend
ADD _build/go/src/ /app/gopkg/src

ENV GOPATH=/app/gopkg:/app/common
ENV GOBIN=/app/bin

RUN cd /app/backend;go install
COPY _bin/staticui.zip /app/bin
COPY _bin/version /app/bin

EXPOSE 10010
CMD /app/bin/backend
