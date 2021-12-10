interface Reader {
    read(url)
}

interface Writer {
    write(data)
}

class FileClient implements Reader, Writer {
    read(url) {
        // logic is there
    }
    write(date) {
        // logic
    }
}