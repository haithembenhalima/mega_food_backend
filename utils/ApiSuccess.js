class ApiSuccess {
    constructor(status, message, data, page= null) {
        this.status = status;
        if(page){this.page = page;}
        this.message = message;
        this.data = data;
    }


}

module.exports = ApiSuccess;