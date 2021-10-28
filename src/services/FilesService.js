class FileService {
  BASE_URL = "http://localhost:3000/files/";

  downloadFile(fileName) {
    const url = this.BASE_URL + fileName;
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        let URL = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = URL;
        a.download = this.formatName(fileName);
        a.click();
      });
    });
  }

  formatName(name) {
    return name ? name.split("$").slice(1).join("") : "";
  }
}

export default new FileService();
