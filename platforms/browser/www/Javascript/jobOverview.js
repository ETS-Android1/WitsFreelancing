function hideContent() {
    $(document).ready(function (){
        $(".newBrowseJobs").hide(); // find a way to make this seem invisible. OR
        $(".myJob").hide();
        $(".offeredJobs1").hide();
        //show browse jobs?
        //handle all transitions
        //show jobs here
    });
}

function jobSection() { //look at the transitions
    $("#wrapper_main").load("jobsOverview.html");
}

function myJobs() { //look at the transitions
    $(document).ready(function (){
        $(".newBrowseJobs").hide();
        $(".offeredJobs1").hide();
        $(".myJob").show();
        getMyJobs();
    });

    function getMyJobs(){
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 6,
                JOB_EMPLOYER_ID: localStorage.getItem("Stud_No")
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Job.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                let jobTable = document.getElementById("jobTableMyJobs").getElementsByTagName("tbody")[0];

                let output = JSON.parse(results);
                //console.log(results);


                for(let i=0; i < output.length; i++){
                    console.log("inside loop");
                    let jobItem = output[i];
                    console.log(jobItem);
                    let row = jobTable.insertRow();
                    let title = row.insertCell(0);
                    let category = row.insertCell(1);
                    let price_range = row.insertCell(2);
                    let status = row.insertCell(3);
                    let view_bidders = row.insertCell(4);
                    let make_payment = row.insertCell(5);
                    let complaint = row.insertCell(6);



                    title.innerHTML = jobItem["JOB_TITLE"]; //localStorage.getItem("Stud_No")   //localStorage.setItem("Stud_No", userNameInput.val());
                    category.innerHTML = jobItem["JOB_CATEGORY"];
                    price_range.innerHTML = jobItem["JOB_AMOUNT_RANGE_LOW"] + " - " + jobItem["JOB_AMOUNT_RANGE_HIGH"];



                    let div = document.getElementById("modalBodyMyJob");
                    let test = document.createTextNode(jobItem["JOB_CATEGORY"]);
                    div.appendChild(test);
                    //add view bidders and make payment binding
                    view_bidders.innerHTML = "<td id=\"viewBidders\" data-title=\"VIEW_BIDDERS\"><a href=\"assignBidderPage.html\"> View Bidders </a></td>";
                    make_payment.innerHTML = "<td id=\"makePayments\" data-title=\"make payments\"><a href=\"\"> Make payment </a></td>";
                    status.innerHTML = "<button type=\"button\" class=\"btn btn-success\">Completed</button>";
                    complaint.innerHTML = "<td id=\"messageBox\" data-title=\"dispute\"><a data-toggle=\"modal\" data-target=\"#myModal\"> Not satisfied? </a></td>";
                    //view_more.innerHTML = "<a id= \"bidId\" href=\"javascript:void(0);\"><i class=\"material-icons md-dark pmd-sm\" >View more</i></a>";
                    complaint.addEventListener(click, function () {
                        //send complaint to database

                    });
                    view_bidders.addEventListener("click", function () {
                        localStorage.setItem("jobTitle", jobItem["JOB_TITLE"]);
                        localStorage.setItem("category", jobItem["JOB_CATEGORY"]);
                        localStorage.setItem("dueDate", jobItem["JOB_DUE_DATE_TIME"]);
                        localStorage.setItem("NumBids", jobItem["NUM_OF_BIDS"]);
                        localStorage.setItem("description", jobItem["JOB_DESCRIPTION"]);
                        localStorage.setItem("job_id", jobItem["JOB_ID"]);
                        //getBid();

                        $(document).ready(function (){

                            $("#wrapper_main").load("viewSpecificJobPage.html");
                        });

                        /**/

                    })
                    /*view_more.addEventListener("click", function () { //data-toggle="modal" data-target="#myModal" --this stuff shades the entire page
                        let modalTitle = document.getElementById("modalTitle");
                        modalTitle.innerHTML = jobItem["JOB_TITLE"];
                        let modalPara = document.getElementById("modalBodyText");
                        modalPara.innerHTML = jobItem["JOB_DESCRIPTION"] + "<br>Job Category: " + jobItem["JOB_CATEGORY"] + "<br> Job payment range: " + jobItem["JOB_AMOUNT_RANGE_LOW"] + " - " + jobItem["JOB_AMOUNT_RANGE_HIGH"];

                        $("#bid_btn1").click(function () {
                            postBid(jobItem["JOB_ID"]);
                        });
                    })*/

                }



                //alert(results);
                //alert(results.toString().length);
                //alert(results.toString()[0]);
            },
            function (response) { // we get a respo
                //fail
                let results = response.data;
                alert("You have not posted any jobs");
                //alert(results);

            },
            function (response) {
                //permission denied
                let results = response.data;
                alert("Permission denied");
                //alert(results);
            });
    }
}

function offers() { //look at the transitions
    $(document).ready(function () {
        $(".newBrowseJobs").hide();
        $(".myJob").hide();
        $(".offeredJobs1").show();
        getMyOffers();
    });

    function getMyOffers(){
        const options = {
            method: "post",
            timeout: 10000,
            data: {
                ACTION: 7,
                JOB_EMPLOYER_ID: localStorage.getItem("Stud_No")
            }
        };
        const url = "http://1627982.ms.wits.ac.za/~student/Job.php";

        cordova.plugin.http.sendRequest(url, options,
            function (response) {
                //success
                let results = response.data; //data from server, it's a string, must be converted to an appropriate format
                //e.g. json
                let jobTable = document.getElementById("jobTableMyOffers").getElementsByTagName("tbody")[0];

                let output = JSON.parse(results);
                //console.log(results);


                for(let i=0; i < output.length; i++){
                    console.log("inside loop");
                    let jobItem = output[i];
                    console.log(jobItem);
                    let row = jobTable.insertRow();
                    let title = row.insertCell(0);
                    let category = row.insertCell(1);
                    let price_range = row.insertCell(2);
                    let accept_job_btn = row.insertCell(3);


                    title.innerHTML = jobItem["JOB_TITLE"]; //localStorage.getItem("Stud_No")   //localStorage.setItem("Stud_No", userNameInput.val());
                    category.innerHTML = jobItem["JOB_CATEGORY"];
                    price_range.innerHTML = jobItem["JOB_AMOUNT_RANGE_LOW"] + " - " + jobItem["JOB_AMOUNT_RANGE_HIGH"];


                    let div = document.getElementById("modalBody");
                    let test = document.createTextNode(jobItem["JOB_CATEGORY"]);
                    div.appendChild(test);
                    //Change this
                    accept_job_btn.innerHTML = "<button type=\"button\" class=\"btn btn-primary\"> Accept Job Offer</button>";
                    accept_job_btn.addEventListener("click", function () {
                        //call script too update that shandis that i accepted
                        //getBid();
                        $(document).ready(function (){
                            $("#wrapper_main").load("viewSpecificJobPage.html");
                        });

                        /**/

                    })
                    /*view_more.addEventListener("click", function () { //data-toggle="modal" data-target="#myModal" --this stuff shades the entire page
                        let modalTitle = document.getElementById("modalTitle");
                        modalTitle.innerHTML = jobItem["JOB_TITLE"];
                        let modalPara = document.getElementById("modalBodyText");
                        modalPara.innerHTML = jobItem["JOB_DESCRIPTION"] + "<br>Job Category: " + jobItem["JOB_CATEGORY"] + "<br> Job payment range: " + jobItem["JOB_AMOUNT_RANGE_LOW"] + " - " + jobItem["JOB_AMOUNT_RANGE_HIGH"];

                        $("#bid_btn1").click(function () {
                            postBid(jobItem["JOB_ID"]);
                        });
                    })*/

                }



                //alert(results);
                //alert(results.toString().length);
                //alert(results.toString()[0]);
            },
            function (response) { // we get a respo
                //fail
                let results = response.data;
                alert("You do not have any offers");
                //alert(results);

            },
            function (response) {
                //permission denied
                let results = response.data;
                alert("Permission was denied");
                //alert(results);
            });
    }

}