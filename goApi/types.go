package goapi

type Book struct {
	Id          int    `json:"id" `
	Name        string `json:"name"`
	Publisher   string `json:"publisher"`
	Description string `json:"description"`
	Year        int    `json:"year"`
	Quantity    int    `json:"quantity"`
}

type Author struct {
	Id          int    `json:"id"`
	Name        string `json:"name" `
	Surname     string `json:"surname"`
	Description string `json:"description"`
	DateOfBirth string `json:"date_of_birth" `
	DateOfDeath string `json:"date_of_death"`
}

type Genre struct {
	Id   int    `json:"id"`
	Name string `json:"name" `
}

type Subscriber struct {
	Id          int    `json:"id"`
	Name        string `json:"name" `
	Surname     string `json:"surname"`
	MiddleName  string `json:"middle_name"`
	DateOfBirth string `json:"date_of_birth" `
	TelNumber   string `json:"tel_number" `
}

type IsActive int

const (
	Y IsActive = iota
	N
)

type Subscribtion struct {
	Id           int      `json:"id"`
	SubscriberId int      `json:"subscriber_id" `
	BookId       int      `json:"book_id"`
	Start        string   `json:"start"`
	Finish       string   `json:"finish" `
	IsActive     IsActive `json:"is_active" `
}
