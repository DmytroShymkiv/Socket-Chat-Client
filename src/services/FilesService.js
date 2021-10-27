class FileService {
  BASE_URL = "http://localhost:3000/files/";

  downloadFile(fileName) {
    const url = this.BASE_URL + fileName;
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        let URL = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = URL;
        a.download = fileName.split("$").slice(1).join("");
        a.click();
      });
    });
  }
}

export default new FileService();
