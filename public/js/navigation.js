
function openNav() {
    var topnav = document.getElementById("topnav");
    var curWidth = topnav.clientWidth;
    if(curWidth == 200){
        topnav.style.width = "0px";
        document.getElementById("main").style.marginLeft = "0px";
    }else{
        topnav.style.width = "200px"; 
        document.getElementById("main").style.marginLeft = "200px";
    }
  }

  function productUpdate() {
    if ($("#empid").val() != null && $("#fname").val() != '') {
        // Add product to Table
        productAddToTable();

        // Clear form fields
        formClear();

        // Focus to product name field
        $("#empid").focus();
    }
}

  function productAddToTable() {
    // First check if a <tbody> tag exists, add one if not
    if ($("#table-form tbody").length == 0) {
        $("#table-form").append("<tbody></tbody>");
    }
    
    // Append product to the table
    $("#table-form tbody").append("<tr>" +
        "<td>" + $("#empid").val() + "</td>" +
        "<td>" + $("#fname").val() + "</td>" +
        "<td>" + $("#username").val() + "</td>" +
        "<td>" + $("#place").val() + "</td>" +
        "</tr>");    
}

function formClear() {
    //$("#empid").val("");
    //$("#fname").val("");
    //$("#username").val("");
    //$("#place").val("");
}

const getUsers = (request, response) => {
  pool.query('SELECT * FROM emp ORDER BY emp_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}