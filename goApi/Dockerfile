FROM golang:1.18

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
# RUN go run cmd/main.go

CMD ["go", "run", "cmd/main.go"]