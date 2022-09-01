FROM golang:1.18 as go_api

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .

CMD ["go", "run", "cmd/main.go"]