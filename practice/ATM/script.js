var ATM = {
    is_auth: false,
    current_user:false,
    current_type:false,
    cash: 2000,
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"},
        {number: "0025", pin: "123", debet: 675, type: "user"}
    ],
    logs: [],
    // authorization
    auth: function(number, pin) {
        if(this.is_auth === false){
            this.users.map(function(user){
                if (user.number === number && user.pin === pin){
                    ATM.is_auth = true;
                    ATM.current_user = user;
                    ATM.current_type = user.type;
                    console.log("Auth success, greetings!");
                    makeReport({user: ATM.current_type, operation: 'auth', status: 'success'});
                }
            })
        } else {
            makeReport({operation: 'auth', status: 'failed'});
            console.log("You should logout before auth again.");
        }
    },
    // check current debet
    check: function() {
        if (this.is_auth === true){
            makeReport({user: this.current_type,operation: 'check', status: 'complete'});
            console.log(this.current_user.debet);
        }else{
            makeReport({operation: 'check', status: 'failed'});
            console.log("You have to auth first !");
        }
    },
    // get cash - available for user only
    getCash: function(amount) {
        if(this.is_auth === true){
            if (this.current_type === "user") {
                if (typeof amount === "number" && amount >= 0 && amount <= this.current_user.debet) {
                    this.current_user.debet -= amount;
                    this.cash -= amount;
                    makeReport({user: this.current_type, operation: 'getCash', status: 'success'});
                    console.log("Money withdraw success !")
                } else {
                    makeReport({user: this.current_type, operation: 'getCash', status: 'failed'});
                    console.log("Please, make sure that you enter correct amount.");
                }
            } else {
                makeReport({user: this.current_type, operation: 'getCash', status: 'failed'});
                console.log("You can't get my money tricky admin :)");
            }
        }else{
            makeReport({operation: 'getCash', status: 'failed'});
            console.log("Yous should auth first.");
        }
    },
    // load cash - available for user only
    loadCash: function(amount) {
        if (this.is_auth === true) {
            if (this.current_type === "user") {
                if (typeof amount === "number" && amount >= 0) {
                    this.current_user.debet += amount;
                    this.cash += amount;
                    makeReport({user: this.current_type, operation: 'loadCash', status: 'success'});
                    console.log("Operation success !")
                } else {
                    makeReport({user: this.current_type, operation: 'loadCash', status: 'failed'});
                    console.log("Please, make sure that you enter correct amount.");
                }
            } else {
                makeReport({user: this.current_type, operation: 'loadCash', status: 'failed'});
                console.log("Very kind of you, but you should be user for this :)");
            }
        } else {
            makeReport({operation: 'loadCash', status: 'failed'});
          console.log("You should auth first.");
        }
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
        if (this.is_auth === true){
            if (this.current_type === "admin") {
                if (typeof addition === "number" && addition >= 0) {
                    this.cash += addition;
                    makeReport({user: this.current_type, operation: 'load_cash', status: 'success'});
                    console.log("Operation success !")
                } else {
                    makeReport({user: this.current_type, operation: 'load_cash', status: 'failed'});
                    console.log("Please, make sure that you enter correct amount.");
                }
            } else {
                makeReport({user: this.current_type, operation: 'load_cash', status: 'failed'});
                console.log("Very kind of you, but you should be admin for this :)");
            }
        } else {
            makeReport({operation: 'load_cash', status: 'failed'});
            console.log("You should auth first.");
        }
    },
    getReport: function() {
        if( this.is_auth === true ) {
            if( this.current_type === "admin") {
                this.logs.map(function(log){
                   console.log(log);
                });
            } else {
                console.log("You should be admin for this operation.");
            }
        } else {
            console.log("You should auth first.");
        }
    },
    logout: function() {
        if (this.is_auth === true){
            makeReport({user: this.current_type, operation: 'logout', status: 'success'});
            this.is_auth = false;
            this.current_user = false;
            this.current_type = false;
            console.log("Goodbye!")
        } else {
            console.log("Please auth first.");
        }
    }
};

function makeReport(report){
    ATM.logs.push(report);
}